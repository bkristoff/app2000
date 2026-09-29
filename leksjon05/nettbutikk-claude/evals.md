# Evals: Hobbyhjørnet frontend

These are repeatable acceptance checks for the current prototype. Run the build check for every code change; run the applicable browser checks for behavior or styling changes. They are manual until a browser-test harness is deliberately added.

## Build gate

- [ ] `npm run build` completes successfully.
- [ ] The browser console has no application errors during the scenarios below.

## Catalog

- [ ] Catalog shows products with a name, category, price, stock information, and meaningful image alternative text.
- [ ] Search `pensel` (or another partial product name) returns matching results regardless of letter case.
- [ ] Selecting a category narrows search results; returning to all categories restores matching products.
- [ ] Each sort mode changes product order as expected.
- [ ] A query with no matches shows an empty state and can be cleared.

## Details and cart

- [ ] Open a product, inspect its details, close it, and confirm the current search/filter is preserved.
- [ ] Add a product from the catalog and from its details. The cart count and feedback update.
- [ ] Increase quantity; verify line total and order total. Decrease quantity to one; verify it does not become zero.
- [ ] Increase quantity to available stock; further increments are blocked. Remove the item and verify totals update.
- [ ] An out-of-stock product cannot be added.
- [ ] Empty cart has clear copy and no enabled checkout action.

## Demo checkout

- [ ] Checkout with one or more items shows a confirmation ID and explicitly says this is a demo, not a real order.
- [ ] Successful demo checkout empties the cart and resets its count.
- [ ] No personal, account, or payment details are requested.

## Responsive and accessibility spot checks

- [ ] At 375px and 1280px wide, the page has no horizontal overflow and catalog/cart controls remain usable.
- [ ] Keyboard users can reach search, filters, product actions, cart controls, and close/checkout actions with visible focus.
- [ ] Images can fail to load without hiding product names, prices, stock, or actions.