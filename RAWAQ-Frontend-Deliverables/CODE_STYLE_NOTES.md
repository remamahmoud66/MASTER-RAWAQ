# RAWAQ code-style notes for Orange Coding Academy

The front-end is kept intentionally straightforward and uses topics visible in the supplied JavaScript lessons.

| Academy concept | Where it appears |
|---|---|
| `const`, `let`, strings, numbers and arrays | The `products`, `addOns`, `readyMadeBaskets` and `state` declarations near the top of `assets/js/app.js`. |
| Objects and arrays of objects | Product, add-on and basket catalogue data. |
| Functions and return values | `formatMoney()`, `getProduct()`, `getCustomProductTotal()`, `getAddOnTotal()` and other small helpers. |
| `if`, conditions and logical checks | Navigation, basket validation, gift fields and delivery-date validation. |
| Array loops: `find`, `filter`, `map`, `reduce`, `forEach` | Filtering products, finding a product by id, calculating totals and rendering records. |
| DOM element selection | `getElementById()` and `querySelectorAll()`. |
| Content updates | `textContent`, class changes and ordinary form `.value` fields. User-provided text is not inserted as HTML. |
| Event listeners | Navigation buttons, categories, quantity controls, checkboxes, form submissions and card selections. |
| `createElement()` and `appendChild()` | Product cards, basket cards, checkout lines and admin table rows. |
| `localStorage`, `JSON.stringify()` and `JSON.parse()` | The browser-only demo order list; no password or API token is stored. |

## Suggested reading order

1. Read the three catalogue arrays at the top of `app.js` and change one sample product name or price.
2. Read `showScreen()` and follow one navigation button.
3. Read `renderProducts()` and identify where a product card is created, filled, and added to the page.
4. Read `getCustomProductTotal()` and `updateBudgetDisplay()` to see where the total and remaining budget come from.
5. Read `renderAddOns()` and `updateMessagePreview()`.
6. Read the checkout form's `submit` listener and follow how a local demo request is prepared.
7. Open `docs/database_schema.sql` to compare the planned future tables with the product/order objects used in JavaScript.

The goal is not to memorize the whole file. Pick one feature, trace the data through it, and make one small change without copying code blindly.
