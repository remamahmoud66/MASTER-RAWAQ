-- =====================================================================
-- RAWAQ database schema — v4 (matches the v4 front-end)
-- Target: MySQL 8.0+  (also runs on MariaDB 10.6+)
-- Planning deliverable for the backend/API stage. The current website is
-- static HTML/CSS/JavaScript and does not connect to this database yet.
--
-- Design rules used in this file:
--   1. Catalogue rows (products, designs, cards ...) are never deleted once
--      used in an order. They are hidden with is_active = 0 instead.
--      That is why order foreign keys use ON DELETE RESTRICT.
--      (MySQL 8 also forbids ON DELETE SET NULL on a column that is used
--      inside a CHECK constraint, and orders has CHECKs on those columns.)
--   2. Prices are copied into the order ("price snapshot"), so an old order
--      keeps its real total even if the catalogue price changes later.
--   3. Nothing is stored twice. Example: "does the order have a card?" is
--      answered by card_design_id IS NOT NULL — no extra has_card column.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS rawaq_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE rawaq_db;

-- ---------------------------------------------------------------------
-- 1. USERS — filled by the Register form (screen 2)
--    gender is required and only Male / Female (as in the form).
--    phone is optional because the register form does not ask for it.
-- ---------------------------------------------------------------------
CREATE TABLE users (
  user_id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name      VARCHAR(120) NOT NULL,
  email          VARCHAR(190) NOT NULL UNIQUE,
  password_hash  VARCHAR(255) NOT NULL,          -- bcrypt/argon2 hash, never plain text
  gender         ENUM('male', 'female') NOT NULL,
  phone          VARCHAR(30) NULL,
  role           ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 2. PRODUCTS — screen 6 (Breakfast, Juice, Coffee, Sweets)
-- ---------------------------------------------------------------------
CREATE TABLE product_categories (
  category_id    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_name  VARCHAR(60) NOT NULL UNIQUE,
  icon           VARCHAR(10) NULL
) ENGINE=InnoDB;

CREATE TABLE products (
  product_id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id    INT UNSIGNED NOT NULL,
  product_name   VARCHAR(120) NOT NULL,
  description    VARCHAR(255) NULL,
  price          DECIMAL(8,2) NOT NULL,
  icon           VARCHAR(10) NULL,
  image_path     VARCHAR(255) NULL,
  is_active      TINYINT(1) NOT NULL DEFAULT 1,
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_products_price CHECK (price >= 0),
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES product_categories(category_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_products_category (category_id)
) ENGINE=InnoDB;

-- Add-ons (Flowers, Shoulder blanket). Kept separate from products because
-- they are toggled on/off (no quantity in the UI) and are not budget items.
CREATE TABLE add_ons (
  add_on_id      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  add_on_name    VARCHAR(100) NOT NULL UNIQUE,
  description    VARCHAR(255) NULL,
  price          DECIMAL(8,2) NOT NULL,
  icon           VARCHAR(10) NULL,
  is_active      TINYINT(1) NOT NULL DEFAULT 1,
  CONSTRAINT chk_add_ons_price CHECK (price >= 0)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 3. BASKET DESIGNS — screen 5 (Design collection)
--    Category tab (Breakfast Baskets / Coffee Baskets / Gift Boxes)
--    -> each category has its own designs (Classic Woven, Midnight Roast ...)
-- ---------------------------------------------------------------------
CREATE TABLE basket_categories (
  basket_category_id  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_name       VARCHAR(80) NOT NULL UNIQUE,
  icon                VARCHAR(10) NULL
) ENGINE=InnoDB;

CREATE TABLE basket_designs (
  basket_design_id    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  basket_category_id  INT UNSIGNED NOT NULL,
  design_name         VARCHAR(100) NOT NULL UNIQUE,
  description         VARCHAR(255) NULL,
  image_path          VARCHAR(255) NULL,
  extra_price         DECIMAL(8,2) NOT NULL DEFAULT 0.00,
  is_active           TINYINT(1) NOT NULL DEFAULT 1,
  CONSTRAINT chk_basket_designs_price CHECK (extra_price >= 0),
  CONSTRAINT fk_basket_designs_category
    FOREIGN KEY (basket_category_id) REFERENCES basket_categories(basket_category_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_basket_designs_category (basket_category_id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 4. MESSAGE CARDS — screen 7 (only used if the user ticks "add a card")
--    Card type tab (Personalized / Birthday / Classic / Cute)
--    -> each type has its own designs (Soft Botanical, Confetti Wishes ...)
-- ---------------------------------------------------------------------
CREATE TABLE card_categories (
  card_category_id  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_name     VARCHAR(80) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE card_designs (
  card_design_id    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  card_category_id  INT UNSIGNED NOT NULL,
  design_name       VARCHAR(100) NOT NULL UNIQUE,
  icon              VARCHAR(10) NULL,
  image_path        VARCHAR(255) NULL,
  is_active         TINYINT(1) NOT NULL DEFAULT 1,
  CONSTRAINT fk_card_designs_category
    FOREIGN KEY (card_category_id) REFERENCES card_categories(card_category_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_card_designs_category (card_category_id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 5. READY-MADE BASKETS — screen 3
--    theme is a simple ENUM because it is only used for the filter chips.
--    Many-to-many with products through ready_made_basket_items.
-- ---------------------------------------------------------------------
CREATE TABLE ready_made_baskets (
  ready_made_basket_id  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  basket_name           VARCHAR(120) NOT NULL UNIQUE,
  theme                 ENUM('breakfast', 'coffee', 'combination') NOT NULL,
  description           VARCHAR(255) NULL,
  price                 DECIMAL(8,2) NOT NULL,
  icon                  VARCHAR(10) NULL,
  image_path            VARCHAR(255) NULL,
  is_active             TINYINT(1) NOT NULL DEFAULT 1,
  CONSTRAINT chk_ready_made_price CHECK (price >= 0)
) ENGINE=InnoDB;

CREATE TABLE ready_made_basket_items (
  ready_made_basket_id  INT UNSIGNED NOT NULL,
  product_id            INT UNSIGNED NOT NULL,
  quantity              INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (ready_made_basket_id, product_id),     -- composite key: a product appears once per basket
  CONSTRAINT chk_ready_made_item_qty CHECK (quantity > 0),
  CONSTRAINT fk_rmb_items_basket
    FOREIGN KEY (ready_made_basket_id) REFERENCES ready_made_baskets(ready_made_basket_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_rmb_items_product
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 6. ORDERS — one row per submitted request (screens 4 -> 8)
--
--    Custom order     : ready_made_basket_id IS NULL, basket_design_id required,
--                       products are in order_items.
--    Ready-made order : ready_made_basket_id is set, products_total = that
--                       basket's price at the time of ordering.
--
--    Budget (step 1)  : budget_amount = 10/15/20/custom amount;
--                       30+ is saved as 30.00 with budget_is_flexible = 1.
--    Message (step 4) : no card  -> card_design_id and card_message are NULL
--                       card     -> both are required (see chk_orders_card).
--    Delivery (step 5): is_gift checkbox + delivery details.
--                       delivery_fee is stored per order (2.00 JD today).
-- ---------------------------------------------------------------------
CREATE TABLE orders (
  order_id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_reference       VARCHAR(20) NOT NULL UNIQUE,      -- e.g. RQ-832158 shown on screen 9
  user_id               INT UNSIGNED NULL,                -- NULL = guest (ready-made without login)
  ready_made_basket_id  INT UNSIGNED NULL,
  basket_design_id      INT UNSIGNED NULL,

  budget_amount         DECIMAL(8,2) NULL,
  budget_is_flexible    TINYINT(1) NOT NULL DEFAULT 0,

  card_design_id        INT UNSIGNED NULL,
  card_message          VARCHAR(220) NULL,                -- same 220 limit as the textarea

  is_gift               TINYINT(1) NOT NULL DEFAULT 0,
  delivery_name         VARCHAR(120) NOT NULL,
  delivery_phone        VARCHAR(30)  NOT NULL,
  delivery_location     VARCHAR(500) NOT NULL,
  delivery_date         DATE NOT NULL,

  products_total        DECIMAL(8,2) NOT NULL DEFAULT 0.00,
  add_ons_total         DECIMAL(8,2) NOT NULL DEFAULT 0.00,
  delivery_fee          DECIMAL(8,2) NOT NULL DEFAULT 2.00,
  total_amount          DECIMAL(8,2) NOT NULL,

  order_status          ENUM('received', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled')
                        NOT NULL DEFAULT 'received',
  created_at            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- custom orders must have a basket design; ready-made orders don't need one
  CONSTRAINT chk_orders_type CHECK (
    ready_made_basket_id IS NOT NULL OR basket_design_id IS NOT NULL
  ),
  -- card + message come together, or neither
  CONSTRAINT chk_orders_card CHECK (
    (card_design_id IS NULL AND card_message IS NULL) OR
    (card_design_id IS NOT NULL AND card_message IS NOT NULL AND CHAR_LENGTH(TRIM(card_message)) > 0)
  ),
  CONSTRAINT chk_orders_budget CHECK (budget_amount IS NULL OR budget_amount > 0),
  CONSTRAINT chk_orders_money CHECK (
    products_total >= 0 AND add_ons_total >= 0 AND delivery_fee >= 0
  ),
  -- the total on screen 8 = products + add-ons + delivery fee
  CONSTRAINT chk_orders_total CHECK (
    total_amount = products_total + add_ons_total + delivery_fee
  ),

  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_orders_ready_made
    FOREIGN KEY (ready_made_basket_id) REFERENCES ready_made_baskets(ready_made_basket_id)
    ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT fk_orders_basket_design
    FOREIGN KEY (basket_design_id) REFERENCES basket_designs(basket_design_id)
    ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT fk_orders_card_design
    FOREIGN KEY (card_design_id) REFERENCES card_designs(card_design_id)
    ON UPDATE RESTRICT ON DELETE RESTRICT,

  INDEX idx_orders_user (user_id),
  INDEX idx_orders_status (order_status),
  INDEX idx_orders_created (created_at)
) ENGINE=InnoDB;

-- Products chosen in a custom basket (screen 6), with price snapshot.
CREATE TABLE order_items (
  order_id     INT UNSIGNED NOT NULL,
  product_id   INT UNSIGNED NOT NULL,
  quantity     INT UNSIGNED NOT NULL,
  unit_price   DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (order_id, product_id),
  CONSTRAINT chk_order_items_qty CHECK (quantity > 0),
  CONSTRAINT chk_order_items_price CHECK (unit_price >= 0),
  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Add-ons chosen for the order (toggle = one of each), with price snapshot.
CREATE TABLE order_add_ons (
  order_id     INT UNSIGNED NOT NULL,
  add_on_id    INT UNSIGNED NOT NULL,
  unit_price   DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (order_id, add_on_id),
  CONSTRAINT chk_order_add_ons_price CHECK (unit_price >= 0),
  CONSTRAINT fk_order_add_ons_order
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_order_add_ons_add_on
    FOREIGN KEY (add_on_id) REFERENCES add_ons(add_on_id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;


-- =====================================================================
-- STARTER DATA — the same catalogue used in assets/js/app.js
-- =====================================================================

INSERT INTO product_categories (category_id, category_name, icon) VALUES
  (1, 'Breakfast', '🥐'), (2, 'Juice', '🍊'), (3, 'Coffee', '☕'), (4, 'Sweets', '🍰');

INSERT INTO products (product_id, category_id, product_name, description, price, icon) VALUES
  (1,  1, 'Butter Croissant', 'Flaky and buttery',          1.00, '🥐'),
  (2,  1, 'Zaatar Pastry',    'A Jordanian favourite',      1.50, '🥨'),
  (3,  1, 'Mini Muffins',     'A soft little treat',        2.00, '🧁'),
  (4,  2, 'Orange Juice',     'Bright and refreshing',      2.00, '🍊'),
  (5,  2, 'Apple Juice',      'A fruity pick-me-up',        1.75, '🍎'),
  (6,  3, 'Iced Latte',       'Chilled coffee favourite',   3.00, '🧋'),
  (7,  3, 'Canned Coffee',    'Ready to enjoy',             2.25, '☕'),
  (8,  3, 'Ground Coffee',    'For a slow morning',         5.00, '🫘'),
  (9,  4, 'Cake Slices',      'A sweet finishing touch',    3.50, '🍰'),
  (10, 4, 'Date Cookies',     'Small, homemade-style bites', 2.50, '🍪');

INSERT INTO add_ons (add_on_id, add_on_name, description, price, icon) VALUES
  (1, 'Flowers',          'A small, cheerful bunch',    3.00, '💐'),
  (2, 'Shoulder blanket', 'A soft extra for cosy days', 5.00, '🧣');

INSERT INTO basket_categories (basket_category_id, category_name, icon) VALUES
  (1, 'Breakfast Baskets', '🥐'), (2, 'Coffee Baskets', '☕'), (3, 'Gift Boxes', '🎁');

INSERT INTO basket_designs (basket_design_id, basket_category_id, design_name, description) VALUES
  (1, 1, 'Classic Woven Basket',  'Natural woven texture'),
  (2, 1, 'Morning Meadow Basket', 'Soft sage accents'),
  (3, 1, 'Rose Ribbon Basket',    'Warm blush ribbon'),
  (4, 2, 'Coffeehouse Classic',   'Rich coffee tones'),
  (5, 2, 'Midnight Roast',        'Deep espresso palette'),
  (6, 2, 'Cafe Gift Basket',      'Cafe-inspired details'),
  (7, 3, 'Square Keepsake Box',   'Structured, timeless shape'),
  (8, 3, 'Round Hatbox',          'Soft round silhouette'),
  (9, 3, 'Drawer Gift Box',       'Modern sliding box');

INSERT INTO card_categories (card_category_id, category_name) VALUES
  (1, 'Personalized Cards'), (2, 'Birthday Cards'), (3, 'Classic Cards'), (4, 'Cute Cards');

INSERT INTO card_designs (card_design_id, card_category_id, design_name, icon) VALUES
  (1,  1, 'Soft Botanical',    '✿'), (2,  1, 'From the Heart',  '♡'), (3,  1, 'Little Note',     '✦'),
  (4,  2, 'Birthday Blooms',   '🎂'), (5,  2, 'Confetti Wishes', '🎉'), (6,  2, 'Make a Wish',     '✨'),
  (7,  3, 'Timeless Script',   '❦'), (8,  3, 'Ivory & Gold',    '✧'), (9,  3, 'Simple Elegance', '—'),
  (10, 4, 'Tiny Doodles',      '♡'), (11, 4, 'Happy Little Bear', '🐻'), (12, 4, 'Smiley Note',   '☻');

INSERT INTO ready_made_baskets (ready_made_basket_id, basket_name, theme, description, price, icon) VALUES
  (1, 'Breakfast Basket',   'breakfast',   'Pastries, a fresh juice and a sweet bite.',          10.00, '🥐'),
  (2, 'Coffee Moment',      'coffee',      'Coffee favourites with a little something sweet.',   12.00, '☕'),
  (3, 'Breakfast & Coffee', 'combination', 'A balanced mix of breakfast and coffee treats.',     20.00, '🍞'),
  (4, 'Sick Day Basket',    'breakfast',   'A thoughtful option with juices and gentle treats.', 15.00, '🍊');

INSERT INTO ready_made_basket_items (ready_made_basket_id, product_id, quantity) VALUES
  (1, 1, 2), (1, 2, 1), (1, 4, 1), (1, 3, 1),
  (2, 6, 1), (2, 7, 1), (2, 9, 1),
  (3, 1, 2), (3, 4, 1), (3, 6, 1), (3, 9, 1),
  (4, 4, 1), (4, 5, 1), (4, 3, 1);
