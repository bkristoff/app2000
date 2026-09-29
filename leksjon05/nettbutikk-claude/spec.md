# Spec: Hobbyhjørnet frontend MVP

Status: approved for the teaching prototype  
Parent: [intent.md](intent.md)

## Outcome and boundary

Deliver a runnable, responsive React + Vite storefront in Norwegian. The frontend is a self-contained prototype backed by an in-memory catalog. A reload may reset the cart. No backend, account, payment, or administrative behavior is represented as real functionality.

## Requirements

### Catalog

- Show a curated set of hobby products with name, category, short description, price in NOK, stock status, and product image.
- Search by product name without case sensitivity.
- Filter by category, including an all-products option. Search and filtering compose.
- Sort by recommended/default order, ascending price, or descending price.
- Provide a useful empty result state and a way to clear the search.

### Product detail

- Opening a product exposes its full description, price, category, and stock status without losing the current catalog query.
- A product can be added to the cart from either its tile or detail view.
- Unavailable products cannot be added.

### Cart and demo checkout

- The cart is available from the global header and shows line items, quantity controls, line totals, and a NOK order total.
- A shopper can increase/decrease quantity and remove an item. Quantity cannot be less than one or exceed the product's available stock.
- Empty-cart and checkout-confirmation states are visible and understandable.
- Checkout creates a clearly labelled demo confirmation ID, clears the cart, and does not request personal or payment details.

### Quality

- Layout remains usable at narrow mobile widths and desktop widths.
- Interactive controls have accessible names, visible focus, and semantic HTML.
- Images have useful alternative text; missing image loads do not block shopping.
- Price and stock information remain legible; feedback is provided for add-to-cart actions.

## UX direction

Make the catalog the working surface, not a marketing landing page. Use a warm paper-like canvas, ink-dark typography, vivid tomato and leaf accents, expressive serif display headings, compact sans-serif controls, and real product-oriented photography. Keep the hero compact so products appear in the initial desktop view. On small screens, stack filters and products without horizontal page overflow.

## Data and state

- The catalog is a local JavaScript data module with stable IDs and stock counts.
- Search query, selected category, sort mode, active product, cart, and transient confirmation are client-side state.
- No browser storage is required. State is intentionally ephemeral in this iteration.
- Prices are integer NOK values and formatted with `Intl.NumberFormat`.

## Acceptance criteria

1. The documented install and dev commands start the Vite application.
2. Typing a partial product name filters results case-insensitively; selecting a category narrows them further.
3. Sort choices change the visible product order.
4. Product details can be opened and closed while retaining current filters.
5. Add, increment, decrement, and remove actions update quantities and totals correctly; stock limits are respected.
6. Checkout from a non-empty cart shows a demo confirmation and empties the cart; checkout is unavailable for an empty cart.
7. At 375px and 1280px viewport widths, the main content and cart remain usable without horizontal page scrolling.
8. `npm run build` succeeds, and the manual checks in [evals.md](evals.md) pass.

## Risks and concerns

- Remote image URLs can fail or change. UI meaning and controls must remain available if an image fails; replace remote assets with reviewed local assets before production.
- This prototype intentionally cannot validate inventory at checkout. Do not present its confirmation as a real order.
- There is no automated browser-test harness yet. Behavior is documented as a manual evaluation until the project adopts a test runner.

## Decisions and deferred questions

- Keep the MVP frontend-only and use in-memory mock data.
- Choose representative arts, crafts, and tabletop products for the teaching catalog; category taxonomy can change in a later intent.
- Defer production branding, licensed photography, backend integration, user accounts, and persistent orders.