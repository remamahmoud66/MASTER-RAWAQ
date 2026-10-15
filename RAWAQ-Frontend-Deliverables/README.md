# RAWAQ — HTML, CSS, JavaScript, ER Diagram and Database Schema

**Brand:** RAWAQ  
**Tagline:** A Little Moment of Calm.  
**Stage:** Academy front-end submission. API and backend integration are intentionally postponed.

This project is a static, beginner-friendly front-end prototype based on the supplied RAWAQ brief and the numbered Figma wireframe reference. It uses HTML, CSS and vanilla JavaScript only. It does not require PHP, Laravel, React, a server, a database connection or an API to preview the interface.

## Deliverables

- `index.html` — all numbered page/screen layouts.
- `assets/css/style.css` — responsive layout and brand styling.
- `assets/js/app.js` — navigation, basket builder, quantities, budget feedback, message preview, demo checkout and dashboard interactions.
- `docs/erd.svg` — vector ER diagram for the future database.
- `docs/erd.png` — PNG preview of the ER diagram.
- `docs/erd.mmd` — Mermaid source version of the ER diagram.
- `docs/database_schema.sql` — planned MySQL 8 schema; not executed by the website.
- `SCREEN_MAP.md` — mapping from the original Figma screen numbers to the front-end.
- `CODE_STYLE_NOTES.md` — how the JavaScript stays close to the techniques in the academy examples.

## How to run it

1. Extract the ZIP file to a folder.
2. Open `index.html` in Chrome, Edge or Firefox.
3. Use the header links, the basket icon, and the page buttons to navigate.
4. Build a basket through **Budget → Basket Style → Products (with add-ons in the sidebar) → Message**.
5. Review the order and submit the demo request. The confirmation text is exactly: **“The request has been successfully received.”**
6. Open **Your profile** or **Admin preview** to see a local demonstration of submitted requests.

The prototype uses `localStorage` in this browser only for demonstration orders. It does not send data to a server. Browser data may be removed by clearing the site's storage.

## Screen numbering

The Figma screen numbers 1–11 are preserved. Screen 7 is the Message step (step 4). Add-ons are selected directly in the Products screen sidebar. The original Figma screen numbers 1–11 remain unchanged.

## Features included

- RAWAQ home page, featured baskets and ready-made basket list.
- Profile details form preview. It does not save passwords or create accounts.
- Four budget options: 10 JD, 15 JD, 20 JD and 30+ JD.
- Separate basket concept and physical container choices.
- Product catalogue filtering and quantity controls.
- Remaining budget feedback while choosing products.
- Optional flowers and shoulder blanket.
- Personal/Birthday/Classic message card selection and live message preview.
- Sample message suggestion button. This uses local example text; it is not an AI API.
- Order review, recipient/gift details, delivery information and exact confirmation message.
- Profile/recent orders and admin dashboard previews based on local demonstration data.

## What is deliberately not implemented yet

- No external API calls.
- No MySQL connection or server-side order persistence.
- No real user registration, sign-in, account security or authenticated order history.
- No real AI-generated message, payment processing, delivery booking, email/SMS notifications or protected admin CRUD.

These belong in the later backend/API stage. The database design is supplied separately so it can be reviewed now, without pretending that the current website is connected to it.

## Database design overview (v4)

`docs/database_schema.sql` targets MySQL 8.0+ (tested on MariaDB 10.11) and contains 13 tables plus starter data copied from the catalogue in `app.js`:

| Area | Tables | Screen |
|---|---|---|
| Accounts | `users` (gender is required: male / female) | 2 |
| Products | `product_categories`, `products`, `add_ons` | 6 |
| Basket design collection | `basket_categories`, `basket_designs` | 5 |
| Message cards (optional) | `card_categories`, `card_designs` | 7 |
| Ready-made baskets | `ready_made_baskets`, `ready_made_basket_items` | 3 |
| Orders | `orders`, `order_items`, `order_add_ons` | 4 → 8 |

Key rules enforced by the database:
- **Optional card:** `card_design_id` and `card_message` are both NULL (no card) or both filled (`chk_orders_card`).
- **Delivery fee:** stored per order (default 2.00 JD) and `total_amount = products_total + add_ons_total + delivery_fee` (`chk_orders_total`).
- **Gift:** `is_gift` comes from the checkbox at the start of the delivery box.
- **Custom vs ready-made:** an order needs either a basket design or a ready-made basket (`chk_orders_type`).
- **Price snapshots:** `order_items.unit_price` and `order_add_ons.unit_price` keep the price at order time.
- **No hard deletes for used catalogue rows:** hide them with `is_active = 0`; order foreign keys use `ON DELETE RESTRICT`.
- Passwords are stored only as `password_hash`.

The ERD is supplied as `docs/erd.png`, `docs/erd.svg`, the Graphviz source `docs/erd.dot` and the Mermaid source `docs/erd.mmd`.

## Beginner-friendly project structure

- Read `assets/js/app.js` from the data arrays at the top.
- Find `showScreen()` to see how page navigation works.
- Find `renderProducts()` and `renderBasketSummary()` to follow the product list and subtotal.
- Find `showBuilderMessageStep()` and `updateMessagePreview()` for steps 4 and 5.
- Find `renderCheckoutReview()` and the checkout `submit` event for the demonstration order flow.
- Review `docs/database_schema.sql` only as a planned schema; it is separate from the live front-end.

## Important note

This is a learning prototype, not a production store. Do not use it to collect real customer information. Before deployment, the API/backend stage must add server-side validation, secure authentication and admin permissions, database transactions, data-protection safeguards and error handling.


## Latest requested refinements

- Featured baskets are centered on the home page; About was removed from the main navigation and a Logout control was added.
- Build-your-basket entry now opens a demo login gate first. The demo accepts a valid email and password locally; no credentials are stored or sent to a server.
- The builder progress is four steps: Budget, Basket style, Products (with add-ons in its sidebar), and Message.
- Budget presets remain available and a custom JD amount field was added.
- Basket category browsing offers Breakfast Baskets, Coffee Baskets, and Gift Boxes with distinct design choices.
- Card browsing includes Personalized, Birthday, Classic, and Cute categories with multiple designs. “Create a Card with AI” opens a future prompt UI; it does not generate an image until API integration is implemented.

The website remains a front-end classroom prototype. Login, order storage and AI generation are demonstrations, not production services.


## Latest requested updates
- Removed the home-page “Make it personal” button and the message-page live preview panel.
- Moved Add-ons into the main Products page CATEGORIES list. Selecting it displays add-on cards in the same product grid as other categories.
- Made all four basket-builder timeline steps clickable (Budget, Basket style, Products, Message), preserving the existing visual style.

## Authentication update
- Build Your Basket opens an authentication screen with both Log In and Create an Account options.
- Sign-up includes name, email, password confirmation, and starts a demo session after validation. Login remains available for existing users.
- Authentication is front-end demo behavior only; persistent account storage/backend authentication is not connected.

## Update — v4
- **Log in / Register:** Show/Hide password button on every password field; login button now reads "Log in"; register form has a required Gender select (Male / Female) that appears on the profile page.
- **Header on auth page:** only the logo and Home are shown while on the log in / register screen.
- **Home:** hero button now reads "Start now".
- **Basket style (step 2):** "What is the feeling?" section removed; the design collection is now the main part of the page with larger design boxes.
- **Message (step 4):** a "Yes, add a message card" checkbox. Unticked → only a Continue button. Ticked → choose card type/design and write the card message (required when a card is chosen).
- **Progress bar:** now 5 steps — Budget, Basket style, Products, Message, Order & delivery (screen 8).
- **Order & delivery (step 5):** "Is this a gift?" checkbox at the start of the delivery box; Order summary has a static 2.00 JD delivery fee included in the total.

## Update — v5 "Warm Morning" visual refresh
- **Palette:** cream page `#FBF5EC`, warm paper cards `#FFFDF8`, burgundy `#722F3E` kept as the brand colour, with apricot `#E8A87C`, honey `#F2C14E` and sage `#A7B49F` accents. Small handwritten notes use cinnamon `#A4573A` (apricot is too light for text on cream).
- **Type:** DM Sans for body, Playfair Display for headings, Caveat (handwritten) only for the small notes above headings. Small text sizes were raised for readability.
- **Illustrations:** `assets/js/illustrations.js` draws every product, add-on, basket design and the home hero in SVG (no emoji). Ready-made basket cards show the real products inside each basket.
- **Labels:** technical labels such as "SCREEN 05 · STEP 2 OF 5" were replaced by short handwritten notes ("step two").
- **Motion:** basket items settle into the hero basket on load, the basket icon bumps when something is added, and confetti falls on the confirmation screen. All motion is switched off for users who prefer reduced motion.
- **Fix:** removed a duplicated block (~620 lines) in `app.js` that a v4 edit had accidentally copied; behaviour is unchanged.
