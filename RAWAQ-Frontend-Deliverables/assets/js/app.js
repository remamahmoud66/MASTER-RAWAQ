/*
  RAWAQ front-end prototype
  -------------------------
  This file uses the academy techniques: arrays of objects, functions,
  conditions, loops, querySelector, createElement, textContent, events,
  and localStorage for a small local demonstration. No API is called.
*/

'use strict';

const products = [
  { id: 1, name: 'Butter Croissant', category: 'Breakfast', price: 1.00, icon: '🥐', art: 'croissant', description: 'Flaky and buttery' },
  { id: 2, name: 'Zaatar Pastry', category: 'Breakfast', price: 1.50, icon: '🥨', art: 'zaatar', description: 'A Jordanian favourite' },
  { id: 3, name: 'Mini Muffins', category: 'Breakfast', price: 2.00, icon: '🧁', art: 'muffin', description: 'A soft little treat' },
  { id: 4, name: 'Orange Juice', category: 'Juice', price: 2.00, icon: '🍊', art: 'orange_juice', description: 'Bright and refreshing' },
  { id: 5, name: 'Apple Juice', category: 'Juice', price: 1.75, icon: '🍎', art: 'apple_juice', description: 'A fruity pick-me-up' },
  { id: 6, name: 'Iced Latte', category: 'Coffee', price: 3.00, icon: '🧋', art: 'iced_latte', description: 'Chilled coffee favourite' },
  { id: 7, name: 'Canned Coffee', category: 'Coffee', price: 2.25, icon: '☕', art: 'canned_coffee', description: 'Ready to enjoy' },
  { id: 8, name: 'Ground Coffee', category: 'Coffee', price: 5.00, icon: '🫘', art: 'ground_coffee', description: 'For a slow morning' },
  { id: 9, name: 'Cake Slices', category: 'Sweets', price: 3.50, icon: '🍰', art: 'cake', description: 'A sweet finishing touch' },
  { id: 10, name: 'Date Cookies', category: 'Sweets', price: 2.50, icon: '🍪', art: 'cookies', description: 'Small, homemade-style bites' }
];

const addOns = [
  { id: 1, name: 'Flowers', price: 3.00, icon: '💐', art: 'flowers', description: 'A small, cheerful bunch' },
  { id: 2, name: 'Shoulder blanket', price: 5.00, icon: '🧣', art: 'blanket', description: 'A soft extra for cosy days' }
];

const readyMadeBaskets = [
  { id: 1, name: 'Breakfast Basket', type: 'Breakfast', icon: '🥐', price: 10.00, description: 'Pastries, a fresh juice and a sweet bite.', items: [{ productId: 1, qty: 2 }, { productId: 2, qty: 1 }, { productId: 4, qty: 1 }, { productId: 3, qty: 1 }] },
  { id: 2, name: 'Coffee Moment', type: 'Coffee', icon: '☕', price: 12.00, description: 'Coffee favourites with a little something sweet.', items: [{ productId: 6, qty: 1 }, { productId: 7, qty: 1 }, { productId: 9, qty: 1 }] },
  { id: 3, name: 'Breakfast & Coffee', type: 'Combination', icon: '🍞', price: 20.00, description: 'A balanced mix of breakfast and coffee treats.', items: [{ productId: 1, qty: 2 }, { productId: 4, qty: 1 }, { productId: 6, qty: 1 }, { productId: 9, qty: 1 }] },
  { id: 4, name: 'Sick Day Basket', type: 'Breakfast', icon: '🍊', price: 15.00, description: 'A thoughtful option with juices and gentle treats.', items: [{ productId: 4, qty: 1 }, { productId: 5, qty: 1 }, { productId: 3, qty: 1 }] }
];

const cardStyles = {
  Personal: { label: 'A little note for you', className: 'personal' },
  Birthday: { label: 'A little birthday love', className: 'birthday' },
  Classic: { label: 'With warmth and care', className: 'classic' },
  Cute: { label: 'A tiny note, a big smile', className: 'cute' }
};

// Static delivery fee added to every order total (in JD).
const DELIVERY_FEE = 2;

// Basket designs shown on screen 5, grouped by category.
// Each item: [name, short description, big icon, small icons]
const designNames = {
  'Breakfast Baskets': [['Classic Woven Basket', 'Natural woven texture', '🧺', '🥐 🍊'], ['Morning Meadow Basket', 'Soft sage accents', '🌿', '☕ 🌼'], ['Rose Ribbon Basket', 'Warm blush ribbon', '🎀', '🍓 🥐']],
  'Coffee Baskets': [['Coffeehouse Classic', 'Rich coffee tones', '☕', '🫘 🍪'], ['Midnight Roast', 'Deep espresso palette', '🌙', '☕ ✦'], ['Cafe Gift Basket', 'Cafe-inspired details', '🤎', '☕ 🥐']],
  'Gift Boxes': [['Square Keepsake Box', 'Structured, timeless shape', '🎁', '🌸 ♡'], ['Round Hatbox', 'Soft round silhouette', '🎀', '🌷 ✨'], ['Drawer Gift Box', 'Modern sliding box', '▣', '🍫 🌿']]
};

// Message card designs shown on screen 7, grouped by card type.
// Each item: [name, icon, CSS class]
const cardCategoryDesigns = {
  'Personalized Cards': [['Soft Botanical', '✿', 'personalized'], ['From the Heart', '♡', 'personalized-alt'], ['Little Note', '✦', 'personalized-third']],
  'Birthday Cards': [['Birthday Blooms', '🎂', 'birthday-art'], ['Confetti Wishes', '🎉', 'birthday-alt'], ['Make a Wish', '✨', 'birthday-third']],
  'Classic Cards': [['Timeless Script', '❦', 'classic-art'], ['Ivory & Gold', '✧', 'classic-alt'], ['Simple Elegance', '—', 'classic-third']],
  'Cute Cards': [['Tiny Doodles', '♡', 'cute-art'], ['Happy Little Bear', '🐻', 'cute-alt'], ['Smiley Note', '☻', 'cute-third']]
};

const state = {
  budget: '15',
  basketStyle: 'Breakfast',
  container: 'Classic Woven Basket',
  quantities: {},
  selectedAddOns: {},
  message: '',
  wantsCard: false,          // the user decides on screen 7 whether to add a card
  cardStyle: 'Personal',
  cardDesign: 'Soft Botanical',
  isGift: false,             // set by the "Is this a gift?" checkbox on screen 8
  selectedPreset: null,
  productCategory: 'All',
  basketFilter: 'All',
  profile: null,
  adminSection: 'Overview',
  lastOrder: null,
  loggedIn: false,
  designCategory: 'Breakfast Baskets',
  selectedDesign: 'Classic Woven Basket',
  cardCategory: 'Personalized Cards'
};

const screenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let toastTimeout = null;
let inMemoryOrders = []; // Fallback if the browser blocks localStorage for a local file.

function formatMoney(amount) {
  return Number(amount || 0).toFixed(2) + ' JD';
}

function getProduct(productId) {
  return products.find(function (product) { return product.id === Number(productId); });
}

function getPreset(presetId) {
  return readyMadeBaskets.find(function (basket) { return basket.id === Number(presetId); });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  toastTimeout = setTimeout(function () {
    toast.classList.remove('visible');
  }, 2600);
}

function showScreen(screenNumber) {
  screenIds.forEach(function (id) {
    const screen = document.getElementById('screen-' + id);
    if (screen) {
      screen.classList.toggle('active', id === Number(screenNumber));
    }
  });

  document.querySelectorAll('.nav-link').forEach(function (link) {
    const target = Number(link.dataset.openScreen);
    const shouldBeActive = (target === 1 && Number(screenNumber) === 1) ||
      (target === 10 && Number(screenNumber) === 10) ||
      (target === 3 && Number(screenNumber) === 3);
    link.classList.toggle('active', shouldBeActive);
  });

  // On the login / register screen only the logo and Home stay in the header (CSS does the hiding).
  document.body.classList.toggle('auth-mode', Number(screenNumber) === 2);

  const nav = document.querySelector('.main-nav');
  const menuButton = document.getElementById('menu-button');
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');

  if (Number(screenNumber) === 6) {
    renderProducts(state.productCategory);
    renderBasketSummary();
  }
  if (Number(screenNumber) === 7) {
    updateMessagePreview();
  }
  if (Number(screenNumber) === 8) {
    renderCheckoutReview();
  }
  if (Number(screenNumber) === 9) {
    launchConfetti();
  }
  if (Number(screenNumber) === 10) {
    renderProfile();
  }
  if (Number(screenNumber) === 11) {
    renderAdmin();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function budgetLimit() {
  if (state.budget === '30_plus') {
    return Infinity;
  }
  return Number(state.budget);
}

function budgetText() {
  if (state.selectedPreset) {
    return 'Ready-made';
  }
  if (state.budget === '30_plus') {
    return '30+ JD';
  }
  return formatMoney(Number(state.budget));
}

function getCustomProductTotal() {
  return products.reduce(function (total, product) {
    const quantity = Number(state.quantities[product.id] || 0);
    return total + product.price * quantity;
  }, 0);
}

function getProductTotal() {
  if (state.selectedPreset) {
    return state.selectedPreset.price;
  }
  return getCustomProductTotal();
}

function getAddOnTotal() {
  return addOns.reduce(function (total, addOn) {
    return total + (state.selectedAddOns[addOn.id] ? addOn.price : 0);
  }, 0);
}

function getOrderTotal() {
  return getProductTotal() + getAddOnTotal() + DELIVERY_FEE;
}

// What counts against the budget: products + add-ons + delivery fee
function getBudgetSpend() {
  return getCustomProductTotal() + getAddOnTotal() + DELIVERY_FEE;
} 

function getSelectedProducts() {
  if (state.selectedPreset) {
    return state.selectedPreset.items.map(function (item) {
      const product = getProduct(item.productId);
      return { product: product, qty: item.qty, preset: true };
    }).filter(function (item) { return item.product; });
  }

  return products.filter(function (product) {
    return Number(state.quantities[product.id] || 0) > 0;
  }).map(function (product) {
    return { product: product, qty: Number(state.quantities[product.id]), preset: false };
  });
}

function getSelectedAddOns() {
  return addOns.filter(function (addOn) {
    return Boolean(state.selectedAddOns[addOn.id]);
  });
}

function updateBudgetDisplay() {
  const subtotal = getCustomProductTotal();
  const limit = budgetLimit();
  const remaining = limit - getBudgetSpend();
  const budgetLabel = document.getElementById('budget-label');
  const budgetRemaining = document.getElementById('budget-remaining');
  const summaryBudget = document.getElementById('summary-budget');
  const summaryRemaining = document.getElementById('summary-remaining');
  const productTotal = document.getElementById('product-total');

  if (budgetLabel) {
    budgetLabel.textContent = budgetText();
  }
  if (budgetRemaining) {
    budgetRemaining.textContent = Number.isFinite(remaining) ?
      (remaining < 0 ? 'Over by ' + formatMoney(Math.abs(remaining)) : formatMoney(remaining)) : 'Flexible';
  }
  if (summaryBudget) {
    summaryBudget.textContent = budgetText();
  }
  if (summaryRemaining) {
    summaryRemaining.textContent = Number.isFinite(remaining) ?
      (remaining < 0 ? 'Over by ' + formatMoney(Math.abs(remaining)) : formatMoney(remaining)) : 'Flexible';
  }
    const summaryAddons = document.getElementById('summary-addons');
  if (summaryAddons) {
    summaryAddons.textContent = formatMoney(getAddOnTotal());
  }
  if (productTotal) {
    productTotal.textContent = formatMoney(subtotal);
  }
}

function renderHomeBaskets() {
  const target = document.getElementById('home-basket-grid');
  target.textContent = '';
  readyMadeBaskets.slice(0, 3).forEach(function (basket) {
    target.appendChild(createBasketCard(basket, true));
  });
}

function createBasketCard(basket, compact) {
  const article = document.createElement('article');
  article.className = 'basket-card';

  const visual = document.createElement('div');
  visual.className = 'basket-visual ' + basket.type.toLowerCase();
  // Draw the basket filled with the products it really contains.
  const itemArts = basket.items.map(function (item) { return getProduct(item.productId).art; })
    .filter(function (art, index, list) { return art && list.indexOf(art) === index; });
  visual.innerHTML = basketSVG({ items: itemArts });

  const body = document.createElement('div');
  body.className = 'basket-card-body';
  const top = document.createElement('div');
  top.className = 'basket-card-top';
  const title = document.createElement('h3');
  title.textContent = basket.name;
  const price = document.createElement('span');
  price.className = 'price';
  price.textContent = formatMoney(basket.price);
  top.appendChild(title);
  top.appendChild(price);

  const description = document.createElement('p');
  description.textContent = basket.description;
  const action = document.createElement('button');
  action.type = 'button';
  action.className = 'text-link';
  action.textContent = compact ? 'Choose basket →' : 'Choose this basket →';
  action.addEventListener('click', function () {
    chooseReadyMadeBasket(basket.id);
  });

  body.appendChild(top);
  body.appendChild(description);
  body.appendChild(action);
  article.appendChild(visual);
  article.appendChild(body);
  return article;
}

function renderReadyMadeBaskets(filter) {
  const target = document.getElementById('ready-basket-grid');
  target.textContent = '';
  const visibleBaskets = readyMadeBaskets.filter(function (basket) {
    return filter === 'All' || basket.type === filter;
  });
  visibleBaskets.forEach(function (basket) {
    target.appendChild(createBasketCard(basket, false));
  });
  if (visibleBaskets.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-note';
    empty.textContent = 'No baskets found in this category.';
    target.appendChild(empty);
  }
}

function resetBuilder() {
  state.budget = '15';
  state.basketStyle = 'Breakfast';
  state.container = 'Classic Woven Basket';
  state.quantities = {};
  state.selectedAddOns = {};
  state.message = '';
  state.wantsCard = false;
  state.cardStyle = 'Personal';
  state.cardDesign = 'Soft Botanical';
  state.isGift = false;
  state.selectedPreset = null;
  state.productCategory = 'All';
  state.selectedDesign = 'Classic Woven Basket';

  const budgetInput = document.querySelector('input[name="budget"][value="15"]');
  if (budgetInput) budgetInput.checked = true;
  const messageInput = document.getElementById('gift-message');
  const giftCheckbox = document.getElementById('is-gift');
  const wantsCardCheckbox = document.getElementById('wants-card');
  if (messageInput) messageInput.value = '';
  if (giftCheckbox) giftCheckbox.checked = false;
  if (wantsCardCheckbox) wantsCardCheckbox.checked = false;

  document.querySelectorAll('.budget-option input').forEach(function (input) {
    input.checked = input.value === '15';
  });

  renderDesignOptions('Breakfast Baskets');
  renderCardDesigns('Personalized Cards');
  renderProducts('All');
  renderBasketSummary();
  updateBudgetDisplay();
  updateMessagePreview();
}

/* Screen 5: draw the designs of one category (bigger boxes, styled in CSS). */
function renderDesignOptions(category) {
  state.designCategory = category;
  state.basketStyle = category === 'Breakfast Baskets' ? 'Breakfast' : category === 'Coffee Baskets' ? 'Coffee' : 'Gift Boxes';
  const gallery = document.getElementById('basket-design-options');
  if (!gallery) return;
  gallery.textContent = '';

  document.querySelectorAll('[data-design-category]').forEach(function (tab) {
    tab.classList.toggle('active', tab.dataset.designCategory === category);
  });

  // If the remembered design is not in this category, select the first one.
  const designs = designNames[category];
  const hasRemembered = designs.some(function (d) { return d[0] === state.selectedDesign; });
  if (!hasRemembered) state.selectedDesign = designs[0][0];
  state.container = state.selectedDesign;

  designs.forEach(function (item) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'design-option' + (item[0] === state.selectedDesign ? ' selected' : '');
    button.dataset.container = item[0];

    const art = document.createElement('span');
    art.className = 'design-art ' + (category === 'Gift Boxes' ? 'design-art-box' : category === 'Coffee Baskets' ? 'design-art-coffee' : 'design-art-breakfast');
    art.innerHTML = designArt(item[0]);

    const name = document.createElement('strong');
    name.textContent = item[0];
    const desc = document.createElement('small');
    desc.textContent = item[1];

    button.appendChild(art);
    button.appendChild(name);
    button.appendChild(desc);
    button.addEventListener('click', function () {
      state.selectedDesign = item[0];
      state.container = item[0];
      gallery.querySelectorAll('.design-option').forEach(function (el) { el.classList.toggle('selected', el === button); });
    });
    gallery.appendChild(button);
  });
}

/* Screen 7: draw the card designs of one card type. */
function renderCardDesigns(category) {
  state.cardCategory = category;
  document.querySelectorAll('[data-card-category]').forEach(function (tab) {
    tab.classList.toggle('active', tab.dataset.cardCategory === category);
  });
  const gallery = document.getElementById('card-design-gallery');
  if (!gallery) return;
  gallery.textContent = '';

  const cardType = category.indexOf('Birthday') === 0 ? 'Birthday' : category.indexOf('Classic') === 0 ? 'Classic' : category.indexOf('Cute') === 0 ? 'Cute' : 'Personal';
  const designs = cardCategoryDesigns[category];
  const hasRemembered = designs.some(function (d) { return d[0] === state.cardDesign; });
  if (!hasRemembered) state.cardDesign = designs[0][0];
  state.cardStyle = cardType;

  designs.forEach(function (item) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'card-design' + (item[0] === state.cardDesign ? ' selected' : '');
    button.dataset.card = cardType;
    const art = document.createElement('span');
    art.className = 'card-design-art ' + item[2];
    const cardIconArt = { '🎂': 'birthday_cake', '🎉': 'party', '✨': 'sparkle', '🐻': 'bear' };
    if (cardIconArt[item[1]]) art.innerHTML = artSVG(cardIconArt[item[1]]);
    else art.textContent = item[1];
    const title = document.createElement('strong');
    title.textContent = item[0];
    const caption = document.createElement('small');
    caption.textContent = category;
    button.appendChild(art);
    button.appendChild(title);
    button.appendChild(caption);
    button.addEventListener('click', function () {
      gallery.querySelectorAll('.card-design').forEach(function (el) { el.classList.toggle('selected', el === button); });
      state.cardStyle = cardType;
      state.cardDesign = item[0];
      updateMessagePreview();
    });
    gallery.appendChild(button);
  });
}

function startBuilder() {
  if (!state.loggedIn) { showScreen(2); showToast('Please log in before creating a basket.'); return; }
  resetBuilder();
  showScreen(4);
}

function chooseReadyMadeBasket(basketId) {
  const basket = getPreset(basketId);
  if (!basket) return;
  resetBuilder();
  state.selectedPreset = basket;
  state.basketStyle = basket.type === 'Combination' ? 'Breakfast & Coffee' : basket.type;
  state.container = 'Classic Woven Basket';
  state.budget = '30_plus';
  state.quantities = {};
  basket.items.forEach(function (item) {
    state.quantities[item.productId] = item.qty;
  });
  state.selectedAddOns = {};
  renderCheckoutReview();
  showToast(basket.name + ' selected. Review the contents and delivery details.');
  showScreen(8);
}

function renderProducts(category) {
  state.productCategory = category || 'All';
  const target = document.getElementById('product-grid');
  if (!target) return;
  target.textContent = '';

  document.querySelectorAll('[data-category]').forEach(function (button) {
    button.classList.toggle('active', button.dataset.category === state.productCategory);
  });

  const title = document.getElementById('product-category-title');
  title.textContent = state.productCategory === 'All' ? 'All products' : state.productCategory;

  if (state.productCategory === 'Add-ons') {
    const title = document.getElementById('product-category-title');
    if (title) title.textContent = 'Add-ons';
    const count = document.getElementById('product-count');
    if (count) count.textContent = addOns.length + ' items';
    addOns.forEach(function (addOn) {
      const card = document.createElement('article');
      card.className = 'product-card';
      const art = document.createElement('div');
      art.className = 'product-art';
      art.innerHTML = artSVG(addOn.art);
      const body = document.createElement('div');
      body.className = 'product-card-body';
      const top = document.createElement('div');
      top.className = 'product-card-top';
      const titleEl = document.createElement('h3');
      titleEl.textContent = addOn.name;
      const price = document.createElement('span');
      price.className = 'price';
      price.textContent = formatMoney(addOn.price);
      top.appendChild(titleEl);
      top.appendChild(price);
      const description = document.createElement('span');
      description.className = 'product-category-tag';
      description.textContent = addOn.description;
      const actionRow = document.createElement('div');
      actionRow.className = 'product-add-row';
      const selected = Boolean(state.selectedAddOns[addOn.id]);
      const action = document.createElement('button');
      action.type = 'button';
      action.className = selected ? 'button button-primary' : 'button button-outline';
      action.textContent = selected ? '✓ Added' : '+ Add';
      action.setAttribute('aria-pressed', String(selected));
      action.addEventListener('click', function () {
        if (state.selectedAddOns[addOn.id]) delete state.selectedAddOns[addOn.id];
        else state.selectedAddOns[addOn.id] = true;
        renderProducts('Add-ons');
        renderBasketSummary();
        updateHeaderCount();
      });
      actionRow.appendChild(action);
      body.appendChild(top);
      body.appendChild(description);
      body.appendChild(actionRow);
      card.appendChild(art);
      card.appendChild(body);
      target.appendChild(card);
    });
    return;
  }

  const visibleProducts = products.filter(function (product) {
    return state.productCategory === 'All' || product.category === state.productCategory;
  });
  document.getElementById('product-count').textContent = visibleProducts.length + (visibleProducts.length === 1 ? ' item' : ' items');

  visibleProducts.forEach(function (product) {
    const card = document.createElement('article');
    card.className = 'product-card';
    const art = document.createElement('div');
    art.className = 'product-art';
    art.innerHTML = artSVG(product.art);

    const body = document.createElement('div');
    body.className = 'product-card-body';
    const top = document.createElement('div');
    top.className = 'product-card-top';
    const title = document.createElement('h3');
    title.textContent = product.name;
    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = formatMoney(product.price);
    top.appendChild(title);
    top.appendChild(price);

    const categoryText = document.createElement('span');
    categoryText.className = 'product-category-tag';
    categoryText.textContent = product.description;

    const actionRow = document.createElement('div');
    actionRow.className = 'product-add-row';
    const quantity = Number(state.quantities[product.id] || 0);
    if (quantity === 0) {
      const addButton = document.createElement('button');
      addButton.type = 'button';
      addButton.className = 'button button-outline';
      addButton.textContent = '+ Add';
      addButton.addEventListener('click', function () {
        state.quantities[product.id] = 1;
        renderProducts(state.productCategory);
        renderBasketSummary();
      });
      actionRow.appendChild(addButton);
    } else {
      const control = document.createElement('div');
      control.className = 'quantity-control';
      const minus = document.createElement('button');
      minus.type = 'button';
      minus.textContent = '−';
      minus.setAttribute('aria-label', 'Remove one ' + product.name);
      minus.addEventListener('click', function () {
        const newQuantity = Number(state.quantities[product.id] || 0) - 1;
        if (newQuantity <= 0) delete state.quantities[product.id];
        else state.quantities[product.id] = newQuantity;
        renderProducts(state.productCategory);
        renderBasketSummary();
      });
      const count = document.createElement('span');
      count.textContent = String(quantity);
      const plus = document.createElement('button');
      plus.type = 'button';
      plus.textContent = '+';
      plus.setAttribute('aria-label', 'Add one ' + product.name);
      plus.addEventListener('click', function () {
        state.quantities[product.id] = quantity + 1;
        renderProducts(state.productCategory);
        renderBasketSummary();
      });
      control.appendChild(minus);
      control.appendChild(count);
      control.appendChild(plus);
      actionRow.appendChild(control);
    }

    body.appendChild(top);
    body.appendChild(categoryText);
    body.appendChild(actionRow);
    card.appendChild(art);
    card.appendChild(body);
    target.appendChild(card);
  });
}

function renderBasketSummary() {
  const list = document.getElementById('summary-product-list');
  if (!list) return;
  list.textContent = '';
  const selectedItems = getSelectedProducts();
  if (selectedItems.length === 0 && getSelectedAddOns().length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-note';
    empty.textContent = 'Your selected products will appear here.';
    list.appendChild(empty);
  } else {
    selectedItems.forEach(function (item) {
      const row = document.createElement('div');
      row.className = 'summary-row';
      const name = document.createElement('div');
      const strong = document.createElement('strong');
      strong.textContent = item.product.name;
      const small = document.createElement('small');
      small.textContent = 'Quantity: ' + item.qty;
      name.appendChild(strong);
      name.appendChild(small);
      const price = document.createElement('span');
      price.className = 'summary-price';
      price.textContent = item.preset ? 'Included' : formatMoney(item.product.price * item.qty);
      row.appendChild(name);
      row.appendChild(price);
      list.appendChild(row);
    });
  }
  getSelectedAddOns().forEach(function (addOn) {
    const row = document.createElement('div');
    row.className = 'summary-row';
    const name = document.createElement('div');
    const strong = document.createElement('strong');
    strong.textContent = addOn.name;
    const small = document.createElement('small');
    small.textContent = 'Add-on';
    name.appendChild(strong);
    name.appendChild(small);
    const price = document.createElement('span');
    price.className = 'summary-price';
    price.textContent = formatMoney(addOn.price);
    row.appendChild(name);
    row.appendChild(price);
    list.appendChild(row);
  });
  updateBudgetDisplay();
  updateHeaderCount();
}

function renderAddOns() {
  const target = document.getElementById('addon-grid');
  if (!target) return;
  target.textContent = '';
  addOns.forEach(function (addOn) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'addon-card' + (state.selectedAddOns[addOn.id] ? ' selected' : '');
    const art = document.createElement('span');
    art.className = 'addon-art';
    art.textContent = addOn.icon;
    const details = document.createElement('span');
    details.className = 'addon-details';
    const title = document.createElement('strong');
    title.textContent = addOn.name;
    const description = document.createElement('small');
    description.textContent = addOn.description;
    const price = document.createElement('b');
    price.textContent = formatMoney(addOn.price);
    const toggle = document.createElement('span');
    toggle.className = 'addon-toggle';
    toggle.textContent = state.selectedAddOns[addOn.id] ? '✓' : '+';
    details.appendChild(title);
    details.appendChild(description);
    details.appendChild(price);
    button.appendChild(art);
    button.appendChild(details);
    button.appendChild(toggle);
    button.addEventListener('click', function () {
      state.selectedAddOns[addOn.id] = !state.selectedAddOns[addOn.id];
      if (!state.selectedAddOns[addOn.id]) delete state.selectedAddOns[addOn.id];
      renderAddOns();
      updateHeaderCount();
    });
    target.appendChild(button);
  });
}

function showBuilderMessageStep(step) {
  const addonsPanel = document.getElementById('addons-panel');
  const messagePanel = document.getElementById('message-panel');
  const step4 = document.getElementById('screen7-step4');
  const step5 = document.getElementById('screen7-step5');
  const title = document.getElementById('extras-title');
  const isMessage = Number(step) === 5;
  if (addonsPanel) addonsPanel.classList.toggle('hidden', isMessage);
  if (messagePanel) messagePanel.classList.toggle('hidden', !isMessage);
  if (step4) step4.classList.toggle('active', !isMessage);
  if (step5) step5.classList.toggle('active', isMessage);
  if (title) title.textContent = 'Add a message from the heart.';
  if (isMessage) updateMessagePreview();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateMessagePreview() {
  const input = document.getElementById('gift-message');
  if (input) state.message = input.value;
  const style = cardStyles[state.cardStyle] || cardStyles.Personal;
  const preview = document.getElementById('message-preview');
  const label = document.getElementById('preview-card-label');
  const message = document.getElementById('preview-message');
  const counter = document.getElementById('message-char-count');
  // Show the card types + message box only if the user ticked "add a message card".
  const cardOptions = document.getElementById('card-options');
  if (cardOptions) cardOptions.classList.toggle('hidden', !state.wantsCard);
  if (preview) {
    preview.classList.remove('personal', 'birthday', 'classic');
    preview.classList.add(style.className);
  }
  if (label) label.textContent = style.label;
  if (message) message.textContent = state.message.trim() || 'Your message will appear here...';
  if (counter) counter.textContent = state.message.length + ' / 220';
  updateHeaderCount();
}

function updateHeaderCount() {
  const quantityTotal = getSelectedProducts().reduce(function (total, item) { return total + item.qty; }, 0);
  const addOnCount = getSelectedAddOns().length;
  const count = document.getElementById('header-basket-count');
  if (!count) return;
  const newValue = String(quantityTotal + addOnCount);
  // Small "bump" animation on the basket icon only when the number goes up.
  if (Number(newValue) > Number(count.textContent)) {
    const button = count.parentElement;
    button.classList.remove('bump');
    void button.offsetWidth;            // restart the CSS animation
    button.classList.add('bump');
  }
  count.textContent = newValue;
}

/* Confetti on the confirmation screen (skipped if the user prefers less motion). */
function launchConfetti() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#722F3E', '#E8A87C', '#F2C14E', '#A7B49F', '#EBAAB0'];
  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  layer.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 70; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece' + (i % 3 === 0 ? ' round' : '');
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = (Math.random() * 0.6) + 's';
    piece.style.animationDuration = (2.2 + Math.random() * 1.6) + 's';
    piece.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
    layer.appendChild(piece);
  }
  document.body.appendChild(layer);
  setTimeout(function () { layer.remove(); }, 4500);
}

function renderCheckoutReview() {
  const itemTarget = document.getElementById('checkout-items');
  if (!itemTarget) return;
  itemTarget.textContent = '';
  const selectedItems = getSelectedProducts();
  if (selectedItems.length === 0 && !state.selectedPreset) {
    const empty = document.createElement('p');
    empty.className = 'empty-note';
    empty.textContent = 'No products have been selected yet. Go back to the product step to add items.';
    itemTarget.appendChild(empty);
  } else {
    selectedItems.forEach(function (item) {
      const row = document.createElement('div');
      row.className = 'checkout-item';
      const title = document.createElement('strong');
      title.textContent = item.product.name;
      const quantity = document.createElement('span');
      quantity.textContent = '× ' + item.qty;
      const amount = document.createElement('b');
      amount.textContent = item.preset ? 'Included' : formatMoney(item.product.price * item.qty);
      row.appendChild(title);
      row.appendChild(quantity);
      row.appendChild(amount);
      itemTarget.appendChild(row);
    });
    if (state.selectedPreset) {
      const note = document.createElement('p');
      note.className = 'small-muted';
      note.textContent = 'Ready-made basket: ' + state.selectedPreset.name;
      itemTarget.appendChild(note);
    }
  }

  document.getElementById('checkout-budget').textContent = budgetText();
  document.getElementById('checkout-style').textContent = state.selectedPreset ? state.selectedPreset.type : state.basketStyle;
  document.getElementById('checkout-container').textContent = state.container;
  document.getElementById('checkout-card-name').textContent = state.wantsCard ? state.cardDesign + ' · ' + state.cardStyle + ' card' : 'No message card';
  document.getElementById('review-product-total').textContent = formatMoney(getProductTotal());
  document.getElementById('review-addon-total').textContent = formatMoney(getAddOnTotal());
  document.getElementById('review-delivery-fee').textContent = formatMoney(DELIVERY_FEE);
  document.getElementById('review-total').textContent = formatMoney(getOrderTotal());
    // Remaining budget: same rule as the products page (budget − products only)
  const remainingEl = document.getElementById('review-remaining');
  if (state.selectedPreset) {
    remainingEl.textContent = 'Ready-made';
  } else if (budgetLimit() === Infinity) {
    remainingEl.textContent = 'Flexible';
  } else {
    const remaining = budgetLimit() - getBudgetSpend();
    remainingEl.textContent = remaining < 0
      ? 'Over by ' + formatMoney(Math.abs(remaining))
      : formatMoney(remaining);
  }

  // Keep the "Is this a gift?" checkbox in sync with the state.
  document.getElementById('is-gift').checked = state.isGift;
  renderGiftDetails();

  // Order summary: show the mini card only when a card was chosen.
  const miniCard = document.getElementById('review-mini-card');
  const noCardNote = document.getElementById('review-no-card');
  miniCard.classList.toggle('hidden', !state.wantsCard);
  noCardNote.classList.toggle('hidden', state.wantsCard);
  miniCard.style.background = state.cardStyle === 'Birthday' ? '#f4e1e4' : (state.cardStyle === 'Classic' ? '#f2f0e6' : '#f8eff0');
  document.getElementById('review-mini-message').textContent = state.message.trim() || 'Your personal message goes here.';
  updateHeaderCount();
}

/* Section 02 on screen 8. Separate function so the gift checkbox can refresh it. */
function renderGiftDetails() {
  const giftDetails = document.getElementById('checkout-gift-details');
  giftDetails.textContent = '';
  const giftStatus = document.createElement('p');
  giftStatus.textContent = state.isGift ? 'This basket is a gift.' : 'This basket is for the customer.';
  giftDetails.appendChild(giftStatus);
  if (state.wantsCard) {
    const messageBlock = document.createElement('blockquote');
    messageBlock.textContent = state.message.trim() || 'No message written on the card.';
    giftDetails.appendChild(messageBlock);
  } else {
    const noCard = document.createElement('p');
    noCard.textContent = 'No message card was added.';
    giftDetails.appendChild(noCard);
  }
  const addOnList = getSelectedAddOns();
  if (addOnList.length > 0) {
    const extras = document.createElement('p');
    extras.textContent = 'Add-ons: ' + addOnList.map(function (item) { return item.name; }).join(', ');
    giftDetails.appendChild(extras);
  }
}

function getStoredOrders() {
  try {
    const orders = JSON.parse(localStorage.getItem('rawaqDemoOrders')) || [];
    if (Array.isArray(orders) && orders.length >= inMemoryOrders.length) {
      inMemoryOrders = orders;
      return orders;
    }
  } catch (error) {
    // Some browsers limit storage for local files; the current page can still work.
  }
  return inMemoryOrders;
}

function saveDemoOrder(order) {
  const orders = getStoredOrders();
  orders.unshift(order);
  inMemoryOrders = orders;
  try {
    localStorage.setItem('rawaqDemoOrders', JSON.stringify(orders));
  } catch (error) {
    // Keep the request in memory so the confirmation and demo dashboard still work.
  }
}

function createOrderRecord() {
  const productsInOrder = getSelectedProducts().map(function (item) {
    return { name: item.product.name, productId: item.product.id, quantity: item.qty, unitPrice: item.product.price };
  });
  const addOnsInOrder = getSelectedAddOns().map(function (item) {
    return { name: item.name, addOnId: item.id, unitPrice: item.price };
  });
  const order = {
    id: 'RQ-' + Date.now().toString().slice(-6),
    date: new Date().toLocaleDateString('en-GB'),
    timestamp: Date.now(),
    basketName: state.selectedPreset ? state.selectedPreset.name : state.basketStyle,
    budget: budgetText(),
    container: state.container,
    hasCard: state.wantsCard,
    cardStyle: state.wantsCard ? state.cardStyle : null,
    cardDesign: state.wantsCard ? state.cardDesign : null,
    isGift: state.isGift,
    message: state.wantsCard ? state.message.trim() : '',
    deliveryName: document.getElementById('delivery-name').value.trim(),
    deliveryPhone: document.getElementById('delivery-phone').value.trim(),
    deliveryLocation: document.getElementById('delivery-location').value.trim(),
    deliveryDate: document.getElementById('delivery-date').value,
    products: productsInOrder,
    addOns: addOnsInOrder,
    productsTotal: getProductTotal(),
    addOnsTotal: getAddOnTotal(),
    deliveryFee: DELIVERY_FEE,
    total: getOrderTotal(),
    status: 'Received (demo)'
  };
  return order;
}

function renderConfirmation(order) {
  const reference = document.getElementById('confirmation-reference');
  if (order) {
    reference.textContent = 'Demo request reference: ' + order.id + ' · Total: ' + formatMoney(order.total);
  } else {
    reference.textContent = '';
  }
}

function renderProfile() {
  if (state.profile) {
    document.getElementById('profile-display-name').textContent = state.profile.fullName || 'Welcome to RAWAQ';
    document.getElementById('profile-display-email').textContent = state.profile.email || 'Email not provided';
    document.getElementById('profile-display-phone').textContent = state.profile.phone || 'Not added';
    document.getElementById('profile-display-gender').textContent = state.profile.gender || 'Not added';
  }
  const target = document.getElementById('recent-orders-list');
  target.textContent = '';
  const orders = getStoredOrders();
  if (orders.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    const icon = document.createElement('span');
    icon.innerHTML = BASKET_LINE_ICON;
    const title = document.createElement('h3');
    title.textContent = 'No requests yet';
    const desc = document.createElement('p');
    desc.textContent = 'Your submitted demo requests will appear here in this browser.';
    const button = document.createElement('button');
    button.className = 'button button-primary';
    button.type = 'button';
    button.textContent = 'Build your first basket';
    button.addEventListener('click', startBuilder);
    empty.appendChild(icon);
    empty.appendChild(title);
    empty.appendChild(desc);
    empty.appendChild(button);
    target.appendChild(empty);
  } else {
    orders.slice(0, 8).forEach(function (order) {
      const row = document.createElement('div');
      row.className = 'order-history-row';
      const left = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = order.basketName + ' · ' + order.id;
      const meta = document.createElement('small');
      meta.textContent = order.date + ' · ' + order.status;
      left.appendChild(title);
      left.appendChild(meta);
      const total = document.createElement('b');
      total.textContent = formatMoney(order.total);
      row.appendChild(left);
      row.appendChild(total);
      target.appendChild(row);
    });
  }
}

function renderAdmin() {
  const orders = getStoredOrders();
  document.getElementById('admin-user-count').textContent = state.profile ? '1' : '0';
  document.getElementById('admin-order-count').textContent = String(orders.length);
  document.getElementById('admin-section-title').textContent = state.adminSection;
  document.getElementById('admin-table-title').textContent = state.adminSection === 'Overview' ? 'Recent requests' : state.adminSection + ' catalogue preview';


  document.querySelectorAll('[data-admin-section]').forEach(function (button) {
    button.classList.toggle('active', button.dataset.adminSection === state.adminSection);
  });

  const tableHead = document.querySelector('#screen-11 thead');
  const tableBody = document.getElementById('admin-orders-body');
  tableHead.textContent = '';
  tableBody.textContent = '';
  let headings = ['Request', 'Order date', 'Contents', 'Total', 'Status'];
  let rows = [];

  if (state.adminSection === 'Overview') {
    rows = orders.map(function (order) {
      return [order.id, order.date, order.basketName, formatMoney(order.total), order.status];
    });
  } else if (state.adminSection === 'Breakfast' || state.adminSection === 'Drinks' || state.adminSection === 'Sweets') {
    headings = ['Product', 'Category', 'Description', 'Price', 'Status'];
    const categoryMap = { Breakfast: ['Breakfast'], Drinks: ['Juice', 'Coffee'], Sweets: ['Sweets'] };
    rows = products.filter(function (product) {
      return categoryMap[state.adminSection].includes(product.category);
    }).map(function (product) {
      return [product.name, product.category, product.description, formatMoney(product.price), 'Sample item'];
    });
  } else if (state.adminSection === 'Add-ons') {
    headings = ['Add-on', 'Type', 'Description', 'Price', 'Status'];
    rows = addOns.map(function (item) { return [item.name, 'Optional', item.description, formatMoney(item.price), 'Sample item']; });
  } else if (state.adminSection === 'Baskets') {
    headings = ['Basket', 'Theme', 'Description', 'Price', 'Status'];
    rows = readyMadeBaskets.map(function (item) { return [item.name, item.type, item.description, formatMoney(item.price), 'Sample item']; });
  } else if (state.adminSection === 'Cards') {
    headings = ['Card style', 'Purpose', 'Preview label', 'Price', 'Status'];
    rows = Object.keys(cardStyles).map(function (key) { return [key, 'Message card', cardStyles[key].label, 'Included', 'Sample item']; });
  } else if (state.adminSection === 'Users') {
    headings = ['User', 'Email', 'Phone', 'Source', 'Status'];
    if (state.profile) {
      rows = [[state.profile.fullName, state.profile.email, state.profile.phone || 'Not added', 'Local profile preview', 'Not authenticated']];
    }
  }

  const headRow = document.createElement('tr');
  headings.forEach(function (heading) {
    const th = document.createElement('th');
    th.textContent = heading;
    headRow.appendChild(th);
  });
  tableHead.appendChild(headRow);

  if (rows.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = headings.length;
    td.className = 'table-empty';
    td.textContent = state.adminSection === 'Overview' ? 'No demo requests have been submitted yet.' : 'No records to show in this preview.';
    tr.appendChild(td);
    tableBody.appendChild(tr);
  } else {
    rows.forEach(function (rowData) {
      const tr = document.createElement('tr');
      rowData.forEach(function (value, index) {
        const td = document.createElement('td');
        if (index === rowData.length - 1 && (value === 'Received (demo)' || value === 'Sample item')) {
          const pill = document.createElement('span');
          pill.className = 'status-pill';
          pill.textContent = value;
          td.appendChild(pill);
        } else {
          td.textContent = value;
        }
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  }
}

function setupEvents() {
  document.querySelectorAll('[data-open-screen]').forEach(function (button) {
    button.addEventListener('click', function () {
      showScreen(Number(button.dataset.openScreen));
    });
  });

  document.querySelectorAll('[data-builder-start]').forEach(function (button) {
    button.addEventListener('click', startBuilder);
  });

  document.querySelectorAll('[data-next-screen]').forEach(function (button) {
    button.addEventListener('click', function () {
      const targetScreen = Number(button.dataset.nextScreen);
      if (targetScreen === 6 && !state.basketStyle) {
        showToast('Choose a basket style first.');
        return;
      }
      if (targetScreen === 7 && getSelectedProducts().length === 0) {
        showToast('Please add at least one product before continuing.'); showScreen(6); return;
      }
      if (targetScreen === 8 && getSelectedProducts().length === 0) {
        showToast('Please add at least one product before reviewing your order.');
        showScreen(6);
        return;
      }
      showScreen(targetScreen);
      if (targetScreen === 7) { updateMessagePreview(); }
    });
  });

  document.querySelectorAll('[data-back-screen]').forEach(function (button) {
    button.addEventListener('click', function () {
      showScreen(Number(button.dataset.backScreen));
    });
  });



  document.querySelectorAll('input[name="budget"]').forEach(function (input) {
    input.addEventListener('change', function () {
      state.budget = input.value;
      const custom = document.getElementById('custom-budget'); if (custom) custom.value = '';
      updateBudgetDisplay();
    });
  });
  const customBudget = document.getElementById('custom-budget');
  if (customBudget) customBudget.addEventListener('input', function () {
    const amount = Number(customBudget.value);
    if (amount > 0) { state.budget = String(amount); document.querySelectorAll('input[name="budget"]').forEach(function (input) { input.checked = false; }); updateBudgetDisplay(); }
  });

  document.querySelectorAll('[data-category]').forEach(function (button) {
    button.addEventListener('click', function () {
      renderProducts(button.dataset.category);
    });
  });

  document.querySelectorAll('[data-step-screen]').forEach(function (stepButton) {
    stepButton.addEventListener('click', function () {
      if (!state.loggedIn) {
        showScreen(2);
        showToast('Please log in before creating a basket.');
        return;
      }
      const targetScreen = Number(stepButton.dataset.stepScreen);
      if ((targetScreen === 7 || targetScreen === 8) && getSelectedProducts().length === 0) {
        showToast('Please add at least one product before continuing.');
        showScreen(6);
        return;
      }
      showScreen(targetScreen);
      if (targetScreen === 7) updateMessagePreview();
    });
  });

  document.querySelectorAll('[data-basket-filter]').forEach(function (button) {
    button.addEventListener('click', function () {
      state.basketFilter = button.dataset.basketFilter;
      document.querySelectorAll('[data-basket-filter]').forEach(function (chip) {
        chip.classList.toggle('active', chip === button);
      });
      renderReadyMadeBaskets(state.basketFilter);
    });
  });

  const toMessageButton = document.getElementById('to-message-button'); if (toMessageButton) toMessageButton.addEventListener('click', function () { showScreen(7); updateMessagePreview(); });
  const backToAddons = document.getElementById('back-to-addons'); if (backToAddons) backToAddons.addEventListener('click', function () { showScreen(6); });

  // Screen 8: "Is this a gift?" checkbox at the start of the delivery box
  document.getElementById('is-gift').addEventListener('change', function (event) {
    state.isGift = event.target.checked;
    renderGiftDetails();
  });

  // Screen 7: the user decides if they want a message card
  document.getElementById('wants-card').addEventListener('change', function (event) {
    state.wantsCard = event.target.checked;
    updateMessagePreview();
  });
  document.getElementById('gift-message').addEventListener('input', updateMessagePreview);

  // Screen 7: Continue button -> step 5 (order details & delivery)
  document.getElementById('message-continue').addEventListener('click', function () {
    if (getSelectedProducts().length === 0) {
      showToast('Please add at least one product before continuing.');
      showScreen(6);
      return;
    }
    if (state.wantsCard && !state.message.trim()) {
      showToast('Write the message for your card, or untick the card option.');
      document.getElementById('gift-message').focus();
      return;
    }
    showScreen(8);
  });

  document.getElementById('suggest-message').addEventListener('click', function () {
    const ideas = [
      'Wishing you a slower morning and a little more joy today.',
      'A small basket, with a lot of care tucked inside.',
      'Hope this brings a smile to your morning. You deserve it.',
      'Coffee, something sweet, and a reminder that you are loved.'
    ];
    const current = document.getElementById('gift-message').value;
    let idea = ideas[Math.floor(Math.random() * ideas.length)];
    if (idea === current) idea = ideas[(ideas.indexOf(idea) + 1) % ideas.length];
    document.getElementById('gift-message').value = idea;
    state.message = idea;
    updateMessagePreview();
    showToast('A sample message idea was added. Edit it to make it yours.');
  });

  document.getElementById('checkout-form').addEventListener('submit', function (event) {
    event.preventDefault();
    if (getSelectedProducts().length === 0) {
      showToast('Please add at least one product first.');
      showScreen(6);
      return;
    }
    const deliveryDate = document.getElementById('delivery-date').value;
    if (deliveryDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const chosenDate = new Date(deliveryDate + 'T00:00:00');
      if (chosenDate < today) {
        showToast('Choose today or a future delivery date.');
        return;
      }
    }
    const order = createOrderRecord();
    saveDemoOrder(order);
    state.lastOrder = order;
    renderConfirmation(order);
    showScreen(9);
  });

  document.getElementById('return-to-message').addEventListener('click', function () {
    showScreen(7);
    showBuilderMessageStep(5);
  });

  const authLoginTab = document.getElementById('show-login');
  const authSignupTab = document.getElementById('show-signup');
  const loginPanel = document.getElementById('login-panel');
  const signupPanel = document.getElementById('signup-panel');

  function setAuthMode(mode) {
    const isSignup = mode === 'signup';
    if (loginPanel) loginPanel.hidden = isSignup;
    if (signupPanel) signupPanel.hidden = !isSignup;
    if (authLoginTab) {
      authLoginTab.classList.toggle('active', !isSignup);
      authLoginTab.setAttribute('aria-selected', String(!isSignup));
    }
    if (authSignupTab) {
      authSignupTab.classList.toggle('active', isSignup);
      authSignupTab.setAttribute('aria-selected', String(isSignup));
    }
  }
  if (authLoginTab) authLoginTab.addEventListener('click', function () { setAuthMode('login'); });
  if (authSignupTab) authSignupTab.addEventListener('click', function () { setAuthMode('signup'); });
  document.querySelectorAll('[data-auth-switch]').forEach(function (button) {
    button.addEventListener('click', function () { setAuthMode(button.dataset.authSwitch); });
  });

  // Show / hide password: switch the input type between "password" and "text"
  document.querySelectorAll('[data-toggle-password]').forEach(function (button) {
    button.addEventListener('click', function () {
      const input = button.parentElement.querySelector('input');
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      button.textContent = isHidden ? 'Hide' : 'Show';
      button.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
      button.setAttribute('aria-pressed', String(isHidden));
    });
  });

  const signupForm = document.getElementById('signup-form');
  if (signupForm) signupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = signupForm.querySelector('[name="signupName"]').value.trim();
    const email = signupForm.querySelector('[name="signupEmail"]').value.trim();
    const password = signupForm.querySelector('[name="signupPassword"]').value;
    const confirmPassword = signupForm.querySelector('[name="signupConfirmPassword"]').value;
    const gender = signupForm.querySelector('[name="signupGender"]').value;
    const feedback = document.getElementById('signup-feedback');
    if (password !== confirmPassword) {
      if (feedback) feedback.textContent = 'Your passwords do not match. Please try again.';
      signupForm.querySelector('[name="signupConfirmPassword"]').focus();
      return;
    }
    if (!gender) {
      if (feedback) feedback.textContent = 'Please choose your gender.';
      return;
    }
    if (!name || !email || password.length < 4) {
      if (feedback) feedback.textContent = 'Please complete all fields using a valid email and password of at least 4 characters.';
      return;
    }
    state.loggedIn = true;
    state.profile = { fullName: name, email: email, phone: '', gender: gender };
    if (feedback) feedback.textContent = 'Demo account created for this session. You can now build your basket.';
    showToast('Welcome to RAWAQ. Let’s build your basket.');
    resetBuilder();
    showScreen(4);
  });

  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = loginForm.querySelector('[name="loginEmail"]').value.trim();
    if (!email) return;
    state.loggedIn = true;
    state.profile = state.profile || { fullName: email.split('@')[0], email: email, phone: '', gender: '' };
    const feedback = document.getElementById('login-feedback'); if (feedback) feedback.textContent = 'Demo login successful. You can now create your basket.';
    showToast('Welcome to RAWAQ. Let’s build your basket.');
    resetBuilder(); showScreen(4);
  });
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) logoutButton.addEventListener('click', function () { state.loggedIn = false; showScreen(1); showToast('You have logged out.'); });

  const profilePreviewForm = document.getElementById('profile-preview-form');
  if (profilePreviewForm) profilePreviewForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const profileForm = event.target;
    state.profile = {
      fullName: profileForm.querySelector('[name="fullName"]').value.trim(),
      email: profileForm.querySelector('[name="email"]').value.trim(),
      phone: profileForm.querySelector('[name="phone"]').value.trim(),
      gender: profileForm.querySelector('[name="gender"]').value.trim()
    };
    document.getElementById('profile-form-feedback').textContent = 'Preview updated in this page only. No password was saved, and no account was created.';
    showToast('Profile preview updated. Account integration comes later.');
  });

  // Screen 5 category tabs and screen 7 card-type tabs
  renderDesignOptions('Breakfast Baskets');
  document.querySelectorAll('[data-design-category]').forEach(function (button) {
    button.addEventListener('click', function () { renderDesignOptions(button.dataset.designCategory); });
  });
  renderCardDesigns('Personalized Cards');
  document.querySelectorAll('[data-card-category]').forEach(function (button) {
    button.addEventListener('click', function () { renderCardDesigns(button.dataset.cardCategory); });
  });
  const openAi = document.getElementById('open-ai-card');
  if (openAi) openAi.addEventListener('click', function () { document.getElementById('ai-card-panel').classList.toggle('hidden'); });
  const saveAiPrompt = document.getElementById('save-ai-card-prompt');
  if (saveAiPrompt) saveAiPrompt.addEventListener('click', function () {
    const prompt = document.getElementById('ai-card-description').value.trim();
    if (!prompt) { showToast('Describe the card you have in mind first.'); return; }
    showToast('Design brief saved in this page only. AI generation will be added later.');
  });

  document.querySelectorAll('[data-admin-section]').forEach(function (button) {
    button.addEventListener('click', function () {
      state.adminSection = button.dataset.adminSection;
      renderAdmin();
    });
  });
  document.getElementById('refresh-admin').addEventListener('click', function () {
    renderAdmin();
    showToast('Demo dashboard refreshed.');
  });

  const menuButton = document.getElementById('menu-button');
  menuButton.addEventListener('click', function () {
    const nav = document.querySelector('.main-nav');
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  document.getElementById('delivery-date').min = localToday;
}

function initialize() {
  hydrateArt();
  renderHomeBaskets();
  renderReadyMadeBaskets('All');
  renderProducts('All');
  updateBudgetDisplay();
  updateMessagePreview();
  updateHeaderCount();
  setupEvents();
}

initialize();
