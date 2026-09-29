# Review: Hobbyhjørnet frontend MVP

Date: 2026-09-29  
Outcome: accepted for the frontend teaching prototype  
Scope: [intent.md](intent.md) → [spec.md](spec.md) → [plan.md](plan.md)

## 1. Intent reviewed

The current frontend outcome is concrete: six mock products across Kreativt, Modellbygging, and Spill, with discovery, product details, cart, and demo checkout. The initial categories and catalog size are therefore decided for this prototype.

Still open for a future backend/product intent: persistent orders, production design-token and photography sources, and the final production catalog taxonomy. None blocks this frontend iteration.

## 2. Spec reviewed

Requirements trace to the intent and retain the frontend-sized catalog, stock, cart, totals, and confirmation needs from the source PRD. Authentication, API/database, payment, order history, and administration remain explicitly out of scope.

Review findings and resolutions:

- The header promised free shipping although this prototype does not calculate shipping. Replaced that copy with non-transactional inspiration text.
- The search field displayed a `⌘ K` shortcut that was not implemented and was misleading on Windows. Removed the unsupported hint.
- A local `outline: 0` suppressed visible keyboard focus on search. Removed it; the search field now receives the shared focus-visible outline.

No remaining scope contradiction was found between intent and spec.

## 3. Plan reviewed

The plan's implementation order and proof criteria match the delivered app. The final review added only copy/accessibility polish; it did not change product scope or data behavior. No plan revision or new intent is needed.

## 4. Evaluation evidence

- Production build: `npm run build` passed after the review fixes.
- Catalog: six products expose name, category, price, stock, and image alt text; all six image URLs loaded during review.
- Discovery: case-insensitive partial search, composed category filters, all-category reset, all three sort modes, empty state, and clear action passed.
- Details and cart: product details preserve search/category; out-of-stock add is disabled; adding from tile and details updates count and feedback; line/order totals are correct; removal preserves other items; quantities stop at stock 8 and do not fall below 1.
- Checkout: empty cart has no checkout action; demo confirmation includes an ID, clears the cart, and requests no personal or payment information.
- Resilience: a deliberately failed product image did not hide product content or actions.
- Accessibility: keyboard tab order reaches the search, filters, and product actions with visible focus; the search focus regression is fixed.
- Responsive: at 375px and 1280px CSS viewport widths, the page and mobile cart have no horizontal overflow.
- Browser console and page errors: none observed in the normal interaction flows.

## 5. Review outcome

Accepted for teaching use. No new intent is warranted because the desired outcome did not change. The open production questions stay carried forward rather than being guessed at here.

Residual limitations: evaluation is manual rather than wired into a browser-test runner; product photos are remote demo assets and should be replaced with reviewed local/licensed assets before production.
