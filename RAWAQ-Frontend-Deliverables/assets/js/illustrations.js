/*
  RAWAQ illustrations
  -------------------
  Small hand-made SVG drawings that replace the emoji icons.
  Every item is drawn inside a 120 x 120 box, so we can place
  items inside baskets with translate() and scale().

  How to use:
    artSVG('croissant')        -> one item (an <svg> string)
    basketSVG({...})           -> a basket or box with items inside
    hydrateArt()               -> fills every element that has data-art="..."
*/

'use strict';

// One warm palette for every drawing (matches the CSS colours).
const ART_COLORS = {
  crust: '#E0A458', crustDark: '#B9773A', crustLight: '#F3CF97',
  orange: '#F29A4A', orangeDark: '#D9772B',
  leaf: '#94A884', leafDark: '#6E8761',
  cream: '#FFF6E6', paper: '#FFFDF8',
  coffee: '#7A4B35', coffeeDark: '#5A3424', milk: '#E9D2B8',
  rose: '#EBAAB0', roseDark: '#C9767F',
  honey: '#F2C14E', burgundy: '#722F3E',
  glass: '#F4ECE2', glassLine: '#DCCBB8',
  wicker: '#D3A06E', wickerDark: '#A5713F',
  apple: '#E3C766', red: '#D9595B', kraft: '#C9A27A', kraftDark: '#A9825A',
  sage: '#A7B49F', sageDark: '#7F8F76', navy: '#46506F', navyDark: '#2F3753'
};
const C = ART_COLORS;

/* ---------- small helpers ---------- */
function flowerHead(cx, cy, color, r) {
  let petals = '';
  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    petals += `<circle cx="${cx + Math.cos(a) * r}" cy="${cy + Math.sin(a) * r}" r="${r * 0.85}" fill="${color}"/>`;
  }
  return petals + `<circle cx="${cx}" cy="${cy}" r="${r * 0.6}" fill="${C.honey}"/>`;
}

function bottle(liquid, fruit) {
  return `
    <rect x="50" y="18" width="20" height="20" rx="4" fill="${C.glass}"/>
    <rect x="47" y="11" width="26" height="10" rx="3" fill="${C.leafDark}"/>
    <rect x="38" y="34" width="44" height="74" rx="14" fill="${liquid}"/>
    <rect x="44" y="40" width="6" height="40" rx="3" fill="#fff" opacity=".35"/>
    <rect x="38" y="58" width="44" height="28" fill="${C.cream}"/>
    <circle cx="60" cy="72" r="9" fill="${fruit}"/>
    <ellipse cx="65" cy="62" rx="5" ry="2.6" fill="${C.leaf}" transform="rotate(-25 65 62)"/>`;
}

/* ---------- the items (120 x 120 each) ---------- */
const ART_ITEMS = {
  croissant: `
    <path d="M14 74 Q24 40 60 37 Q96 40 106 74 Q96 83 82 76 Q74 90 60 90 Q46 90 38 76 Q24 83 14 74Z" fill="${C.crust}"/>
    <path d="M40 47 Q48 64 43 82 M60 39 Q63 62 60 89 M80 47 Q72 64 77 82" stroke="${C.crustDark}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M47 45 Q60 40 72 45" stroke="${C.crustLight}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,

  zaatar: `
    <circle cx="60" cy="62" r="40" fill="${C.crustLight}"/>
    <circle cx="60" cy="62" r="40" fill="none" stroke="${C.crust}" stroke-width="5"/>
    <circle cx="60" cy="62" r="31" fill="#9DA65A"/>
    <g fill="#6F7A3C"><circle cx="48" cy="52" r="3"/><circle cx="70" cy="48" r="2.5"/><circle cx="74" cy="70" r="3"/><circle cx="52" cy="74" r="2.5"/><circle cx="62" cy="62" r="2.5"/></g>
    <g fill="${C.cream}"><ellipse cx="58" cy="50" rx="2" ry="1.2"/><ellipse cx="44" cy="64" rx="2" ry="1.2"/><ellipse cx="66" cy="78" rx="2" ry="1.2"/><ellipse cx="78" cy="58" rx="2" ry="1.2"/></g>`,

  muffin: `
    <path d="M30 64 L90 64 L81 104 L39 104Z" fill="${C.rose}"/>
    <path d="M44 64 L48 104 M60 64 L60 104 M76 64 L72 104" stroke="${C.roseDark}" stroke-width="3"/>
    <path d="M24 68 Q22 28 60 26 Q98 28 96 68 Q78 74 60 68 Q42 74 24 68Z" fill="${C.crust}"/>
    <g fill="${C.coffeeDark}"><circle cx="46" cy="46" r="4"/><circle cx="66" cy="38" r="4"/><circle cx="78" cy="54" r="4"/><circle cx="56" cy="58" r="3.5"/></g>`,

  orange_juice: bottle(C.orange, C.orangeDark),
  apple_juice: bottle(C.apple, C.red),

  iced_latte: `
    <path d="M70 52 L88 10" stroke="${C.burgundy}" stroke-width="6" stroke-linecap="round"/>
    <path d="M34 28 L86 28 L79 108 L41 108Z" fill="${C.glass}" stroke="${C.glassLine}" stroke-width="3"/>
    <path d="M37 50 L83 50 L79 108 L41 108Z" fill="${C.milk}"/>
    <path d="M39 80 L81 80 L79 108 L41 108Z" fill="${C.coffee}"/>
    <rect x="44" y="56" width="14" height="14" rx="3" fill="#fff" opacity=".75" transform="rotate(-12 51 63)"/>
    <rect x="62" y="62" width="13" height="13" rx="3" fill="#fff" opacity=".7" transform="rotate(10 68 68)"/>`,

  canned_coffee: `
    <rect x="36" y="20" width="48" height="88" rx="8" fill="${C.coffee}"/>
    <ellipse cx="60" cy="22" rx="24" ry="5" fill="${C.glassLine}"/>
    <rect x="36" y="48" width="48" height="32" fill="${C.cream}"/>
    <ellipse cx="60" cy="64" rx="9" ry="12" fill="${C.coffee}" transform="rotate(20 60 64)"/>
    <path d="M57 53 Q64 64 58 75" stroke="${C.cream}" stroke-width="2.5" fill="none"/>
    <rect x="42" y="26" width="5" height="76" rx="2.5" fill="#fff" opacity=".18"/>`,

  ground_coffee: `
    <path d="M34 32 L86 32 L94 108 L26 108Z" fill="${C.kraft}"/>
    <rect x="32" y="22" width="56" height="14" rx="3" fill="${C.kraftDark}"/>
    <path d="M40 22 L40 36 M50 22 L50 36 M60 22 L60 36 M70 22 L70 36 M80 22 L80 36" stroke="${C.kraft}" stroke-width="2"/>
    <circle cx="60" cy="72" r="19" fill="${C.cream}"/>
    <ellipse cx="60" cy="72" rx="8" ry="12" fill="${C.coffee}" transform="rotate(25 60 72)"/>
    <path d="M57 61 Q64 72 58 83" stroke="${C.cream}" stroke-width="2.5" fill="none"/>`,

  cake: `
    <path d="M18 60 L72 40 L102 54 L48 74Z" fill="${C.cream}"/>
    <path d="M48 74 L102 54 L102 88 L48 108Z" fill="${C.crustLight}"/>
    <path d="M18 60 L48 74 L48 108 L18 94Z" fill="${C.crust}"/>
    <path d="M48 89 L102 70 L102 77 L48 96Z" fill="${C.rose}"/>
    <path d="M18 75 L48 89 L48 96 L18 82Z" fill="${C.roseDark}"/>
    <path d="M48 74 Q52 82 56 74 Q60 82 64 70" stroke="${C.cream}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="64" cy="48" r="8" fill="${C.red}"/>
    <path d="M64 40 Q68 30 76 28" stroke="${C.leafDark}" stroke-width="2.5" fill="none"/>`,

  cookies: `
    <circle cx="48" cy="70" r="30" fill="${C.crust}"/>
    <circle cx="74" cy="54" r="30" fill="${C.crustLight}" stroke="${C.crust}" stroke-width="3"/>
    <g fill="${C.coffeeDark}"><circle cx="64" cy="44" r="4"/><circle cx="82" cy="50" r="3.5"/><circle cx="72" cy="66" r="4"/><circle cx="88" cy="64" r="3"/><circle cx="36" cy="80" r="3.5"/><circle cx="46" cy="92" r="3"/></g>`,

  coffee_cup: `
    <path d="M46 14 Q40 22 46 30 Q52 38 46 46 M62 10 Q56 20 62 28 Q68 36 62 44" stroke="${C.glassLine}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="58" cy="102" rx="44" ry="9" fill="${C.glassLine}"/>
    <path d="M24 52 L92 52 L86 92 Q84 100 76 100 L40 100 Q32 100 30 92Z" fill="${C.paper}" stroke="${C.glassLine}" stroke-width="3"/>
    <path d="M90 60 Q108 60 104 76 Q100 88 86 86" stroke="${C.glassLine}" stroke-width="6" fill="none"/>
    <ellipse cx="58" cy="54" rx="32" ry="6" fill="${C.coffee}"/>
    <path d="M40 72 Q58 80 76 72" stroke="${C.rose}" stroke-width="5" fill="none" stroke-linecap="round"/>`,

  flowers: `
    <path d="M60 108 L40 50 M60 108 L60 38 M60 108 L82 52" stroke="${C.leafDark}" stroke-width="3.5"/>
    <ellipse cx="46" cy="80" rx="10" ry="5" fill="${C.leaf}" transform="rotate(40 46 80)"/>
    <ellipse cx="74" cy="78" rx="10" ry="5" fill="${C.leaf}" transform="rotate(-40 74 78)"/>
    ${flowerHead(40, 46, C.rose, 9)}
    ${flowerHead(60, 32, C.paper, 9)}
    ${flowerHead(82, 48, C.orange, 9)}
    <path d="M38 84 L82 84 L72 112 L48 112Z" fill="${C.burgundy}"/>
    <path d="M52 90 L68 90" stroke="${C.cream}" stroke-width="3" stroke-linecap="round"/>`,

  blanket: `
    <rect x="22" y="40" width="76" height="26" rx="10" fill="${C.sage}"/>
    <path d="M36 40 L36 66 M60 40 L60 66 M84 40 L84 66" stroke="${C.sageDark}" stroke-width="3"/>
    <rect x="16" y="62" width="88" height="30" rx="11" fill="${C.rose}"/>
    <path d="M16 72 L104 72 M16 82 L104 82" stroke="${C.roseDark}" stroke-width="3"/>
    <path d="M22 92 L22 102 M30 92 L30 102 M38 92 L38 102 M82 92 L82 102 M90 92 L90 102 M98 92 L98 102" stroke="${C.roseDark}" stroke-width="3" stroke-linecap="round"/>`,

  // symbols used by card designs and small icons
  sparkle: `
    <path d="M60 14 Q66 54 106 60 Q66 66 60 106 Q54 66 14 60 Q54 54 60 14Z" fill="${C.honey}"/>
    <path d="M92 18 Q94 28 104 30 Q94 32 92 42 Q90 32 80 30 Q90 28 92 18Z" fill="${C.orange}"/>`,

  party: `
    <path d="M24 104 L52 34 L90 72Z" fill="${C.honey}"/>
    <path d="M34 80 L60 92 M42 60 L74 78" stroke="${C.orange}" stroke-width="5"/>
    <g><rect x="74" y="20" width="8" height="14" rx="2" fill="${C.rose}" transform="rotate(25 78 27)"/>
    <rect x="94" y="44" width="8" height="14" rx="2" fill="${C.leaf}" transform="rotate(-30 98 51)"/>
    <circle cx="64" cy="20" r="5" fill="${C.burgundy}"/><circle cx="100" cy="28" r="4" fill="${C.orange}"/>
    <circle cx="96" cy="82" r="5" fill="${C.rose}"/></g>`,

  bear: `
    <circle cx="30" cy="34" r="16" fill="${C.crust}"/><circle cx="90" cy="34" r="16" fill="${C.crust}"/>
    <circle cx="30" cy="34" r="8" fill="${C.rose}"/><circle cx="90" cy="34" r="8" fill="${C.rose}"/>
    <circle cx="60" cy="66" r="40" fill="${C.crust}"/>
    <ellipse cx="60" cy="80" rx="18" ry="14" fill="${C.crustLight}"/>
    <ellipse cx="60" cy="73" rx="6" ry="4.5" fill="${C.coffeeDark}"/>
    <circle cx="44" cy="58" r="4.5" fill="${C.coffeeDark}"/><circle cx="76" cy="58" r="4.5" fill="${C.coffeeDark}"/>
    <circle cx="36" cy="74" r="6" fill="${C.rose}" opacity=".7"/><circle cx="84" cy="74" r="6" fill="${C.rose}" opacity=".7"/>`,

  birthday_cake: `
    <rect x="22" y="58" width="76" height="46" rx="8" fill="${C.crustLight}"/>
    <path d="M22 66 Q31 78 40 66 Q49 78 58 66 Q67 78 76 66 Q85 78 98 66 L98 58 L22 58Z" fill="${C.rose}"/>
    <rect x="16" y="102" width="88" height="7" rx="3.5" fill="${C.glassLine}"/>
    <rect x="42" y="36" width="6" height="22" rx="2" fill="${C.leaf}"/><rect x="58" y="32" width="6" height="26" rx="2" fill="${C.orange}"/><rect x="74" y="36" width="6" height="22" rx="2" fill="${C.leaf}"/>
    <path d="M45 26 Q49 32 45 34 Q41 32 45 26Z M61 22 Q65 28 61 30 Q57 28 61 22Z M77 26 Q81 32 77 34 Q73 32 77 26Z" fill="${C.honey}"/>`,

  gift: `
    <rect x="22" y="50" width="76" height="56" rx="6" fill="${C.rose}"/>
    <rect x="16" y="38" width="88" height="18" rx="5" fill="${C.roseDark}"/>
    <rect x="54" y="38" width="12" height="68" fill="${C.burgundy}"/>
    <path d="M60 38 Q40 16 34 30 Q32 40 60 38 Q88 40 86 30 Q80 16 60 38Z" fill="${C.burgundy}"/>`,

  wheat: `
    <path d="M60 110 L60 30" stroke="${C.crustDark}" stroke-width="3"/>
    <g fill="${C.crust}">${[30, 44, 58, 72].map(function (y) { return `<ellipse cx="50" cy="${y}" rx="9" ry="5" transform="rotate(-35 50 ${y})"/><ellipse cx="70" cy="${y}" rx="9" ry="5" transform="rotate(35 70 ${y})"/>`; }).join('')}</g>`
};

/* ---------- wrap an item into a full <svg> ---------- */
function artSVG(key, label) {
  const inner = ART_ITEMS[key];
  if (!inner) return '';
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg class="art-svg" viewBox="0 0 120 120" ${a11y} focusable="false">${inner}</svg>`;
}

/* ---------- containers (viewBox 0 0 200 170) ----------
   options:
     kind    : 'basket' | 'square' | 'round' | 'drawer'
     body    : main colour      dark : shade colour
     items   : up to 4 item keys shown peeking out of the top
     bow     : true to add a ribbon bow
     extra   : extra SVG drawn last (e.g. a moon)
*/
function placeItems(items) {
  const spots = [
    { x: 30, y: 30, s: 0.62 }, { x: 64, y: 14, s: 0.66 },
    { x: 100, y: 24, s: 0.62 }, { x: 128, y: 36, s: 0.56 }
  ];
  const list = (items || []).slice(0, 4);
  // centre the group when there are fewer than 4 items
  const shift = (4 - list.length) * 16;
  return list.map(function (key, i) {
    const p = spots[i];
    return `<g class="art-item" style="--i:${i}" transform="translate(${p.x + shift} ${p.y}) scale(${p.s})">${ART_ITEMS[key] || ''}</g>`;
  }).join('');
}

function bowSVG(x, y, color, dark) {
  return `<g transform="translate(${x} ${y})">
    <path d="M0 0 Q-26 -18 -28 -2 Q-26 12 0 0Z M0 0 Q26 -18 28 -2 Q26 12 0 0Z" fill="${color}"/>
    <path d="M-3 2 L-12 22 M3 2 L12 22" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="0" cy="0" r="6" fill="${dark}"/></g>`;
}

function basketSVG(opt) {
  const o = Object.assign({ kind: 'basket', body: C.wicker, dark: C.wickerDark, items: [], bow: false, extra: '' }, opt);
  let back = '';
  let front = '';
  if (o.kind === 'basket') {
    back = `<path d="M50 96 Q100 6 150 96" stroke="${o.dark}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
    front = `
      <path d="M30 96 L170 96 L157 152 Q155 160 146 160 L54 160 Q45 160 43 152Z" fill="${o.body}"/>
      <path d="M36 114 L164 114 M40 132 L160 132 M44 150 L156 150" stroke="${o.dark}" stroke-width="3" opacity=".55"/>
      <path d="M70 96 L72 160 M100 96 L100 160 M130 96 L128 160" stroke="${o.dark}" stroke-width="3" opacity=".4"/>
      <rect x="22" y="88" width="156" height="16" rx="8" fill="${o.dark}"/>`;
    if (o.bow) front += bowSVG(100, 112, C.rose, C.roseDark);
  } else if (o.kind === 'square') {
    front = `
      <rect x="36" y="88" width="128" height="72" rx="8" fill="${o.body}"/>
      <rect x="28" y="80" width="144" height="20" rx="6" fill="${o.dark}"/>
      <rect x="92" y="80" width="16" height="80" fill="${C.burgundy}"/>
      ${bowSVG(100, 80, C.burgundy, C.coffeeDark)}`;
  } else if (o.kind === 'round') {
    front = `
      <path d="M38 96 L162 96 L162 146 Q100 172 38 146Z" fill="${o.body}"/>
      <ellipse cx="100" cy="96" rx="68" ry="16" fill="${o.dark}"/>
      <path d="M38 118 Q100 140 162 118" stroke="${C.burgundy}" stroke-width="9" fill="none"/>
      ${bowSVG(150, 120, C.burgundy, C.coffeeDark)}`;
  } else if (o.kind === 'drawer') {
    front = `
      <rect x="30" y="84" width="140" height="76" rx="8" fill="${o.dark}"/>
      <rect x="40" y="100" width="140" height="56" rx="6" fill="${o.body}"/>
      <rect x="96" y="124" width="36" height="8" rx="4" fill="${C.burgundy}"/>
      <rect x="30" y="84" width="140" height="12" rx="6" fill="${C.burgundy}" opacity=".85"/>`;
  }
  return `<svg class="art-svg art-scene" viewBox="0 0 200 170" aria-hidden="true" focusable="false">${back}${placeItems(o.items)}${front}${o.extra}</svg>`;
}

/* ---------- the 9 basket designs on screen 5 ---------- */
const DESIGN_ART = {
  'Classic Woven Basket': { items: ['croissant', 'orange_juice', 'muffin'] },
  'Morning Meadow Basket': { body: C.sage, dark: C.sageDark, items: ['flowers', 'coffee_cup', 'croissant'] },
  'Rose Ribbon Basket': { body: C.rose, dark: C.roseDark, bow: true, items: ['cake', 'flowers', 'croissant'] },
  'Coffeehouse Classic': { body: C.coffee, dark: C.coffeeDark, items: ['ground_coffee', 'coffee_cup', 'cookies'] },
  'Midnight Roast': { body: C.navy, dark: C.navyDark, items: ['canned_coffee', 'coffee_cup', 'cookies'],
    extra: `<path d="M172 24 A16 16 0 1 0 184 50 A13 13 0 1 1 172 24Z" fill="${C.honey}"/>` },
  'Cafe Gift Basket': { body: C.crust, dark: C.crustDark, items: ['iced_latte', 'croissant', 'cookies'] },
  'Square Keepsake Box': { kind: 'square', body: C.rose, dark: C.roseDark, items: ['flowers', 'cake'] },
  'Round Hatbox': { kind: 'round', body: C.sage, dark: C.sageDark, items: ['flowers', 'muffin'] },
  'Drawer Gift Box': { kind: 'drawer', body: C.cream, dark: C.kraft, items: ['cookies', 'flowers'] }
};

function designArt(name) {
  return basketSVG(DESIGN_ART[name] || {});
}

/* ---------- home hero scene ---------- */
function heroArt() {
  return `<svg class="art-svg hero-svg" viewBox="0 0 400 360" role="img" aria-label="A woven basket with a croissant, coffee, juice and flowers" focusable="false">
    <circle class="hero-sun" cx="290" cy="96" r="70" fill="${C.honey}" opacity=".85"/>
    <path d="M0 300 Q120 240 220 270 Q320 300 400 250 L400 360 L0 360Z" fill="${C.crustLight}" opacity=".55"/>
    <g transform="translate(36 70) scale(1.6)">${basketSVG({ items: ['flowers', 'croissant', 'iced_latte', 'orange_juice'] }).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>
    <g transform="translate(300 250) scale(.55)">${ART_ITEMS.coffee_cup}</g>
  </svg>`;
}

/* ---------- small line icon for the header & summary ---------- */
const BASKET_LINE_ICON = `<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 10 Q12 1 17 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M3 10 H21 L19 19 Q18.6 21 16.6 21 H7.4 Q5.4 21 5 19Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 13 V18 M12 13 V18 M15 13 V18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;

/* ---------- fill every [data-art] placeholder in the HTML ---------- */
function hydrateArt(root) {
  (root || document).querySelectorAll('[data-art]').forEach(function (el) {
    const key = el.dataset.art;
    if (key === 'hero') el.innerHTML = heroArt();
    else if (key === 'basket-line') el.innerHTML = BASKET_LINE_ICON;
    else if (key.indexOf('design:') === 0) el.innerHTML = designArt(key.slice(7));
    else if (key.indexOf('basket:') === 0) el.innerHTML = basketSVG({ items: key.slice(7).split(',') });
    else el.innerHTML = artSVG(key);
  });
}
