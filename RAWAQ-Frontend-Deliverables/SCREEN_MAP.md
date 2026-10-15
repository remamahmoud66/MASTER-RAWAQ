# RAWAQ — Figma screen map

The attached Figma reference is a wireframe collage numbered from 1 to 11. These screen numbers are kept as supplied; they are not renumbered to match the number of steps in the basket-builder flow.

| Figma screen | Front-end implementation | Notes |
|---|---|---|
| 1 | Home page | RAWAQ brand, tagline, hero, Build your Basket, featured baskets. |
| 2 | Your profile — details form | Full name, email, password, phone and gender fields. Front-end preview only; no account is created. |
| 3 | Ready-made baskets | Featured/best-seller style cards and filters for breakfast, coffee, combinations and other themes. Sick Day Basket is only one optional theme. |
| 4 | Builder: Budget (step 1) | 10 JD, 15 JD, 20 JD and 30+ JD. |
| 5 | Builder: Basket Style (step 2) | Breakfast, coffee, or breakfast & coffee; container choice is separate. |
| 6 | Builder: Products (step 3) | Category list, product cards, quantity controls, selected basket and budget feedback. |
| 7 | Builder: Add-ons (step 4) and Message (step 5) | This Figma frame hosts two sequential substeps so the required four-step flow remains exact. Add-ons must be completed/skipped before the message step. |
| 8 | Order review / checkout | Basket contents, gift details, selected card, delivery details, date and total. |
| 9 | Order confirmation | Displays the exact required message: “The request has been successfully received.” |
| 10 | Profile and recent orders | Profile summary and requests stored for the local demonstration only. |
| 11 | Admin control panel | User/request counts, recent requests and catalogue category previews. Real editing and admin authentication are postponed to the backend/API stage. |

## Exact custom basket order

1. Budget
2. Basket Style
3. Products
4. Add-ons
5. Message

The physical container (traditional basket or gift box) is a separate selection within Basket Style, not a replacement for the basket concept.
