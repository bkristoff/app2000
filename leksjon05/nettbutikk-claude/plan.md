# Plan: Hobbyhjørnet frontend MVP

Status: approved implementation plan  
From: [spec.md](spec.md)

## Files that change

- `package.json`, `index.html`: Vite/React entry point and run/build scripts.
- `src/main.jsx`, `src/App.jsx`, `src/styles.css`: application mount, storefront interactions, and responsive presentation.
- `src/data/products.js`: stable, local mock catalog.
- `README.md`, `intent.md`, `spec.md`, `CLAUDE.md`, `.claude/skills/frontend-quality/SKILL.md`, `evals.md`: versioned teaching artifacts and operating guidance.

## Order of work

1. Establish the minimal React/Vite app and local product data.
2. Build the catalog surface with search, category filtering, sorting, and product details.
3. Add cart state, stock-bounded quantity controls, totals, and clearly simulated checkout.
4. Apply responsive and accessible styling; keep content usable when remote imagery fails.
5. Run the production build and evaluate the acceptance criteria at mobile and desktop sizes.

## Risks

- A quick demo can blur the line between simulated checkout and real commerce. Make the demo boundary explicit in the UI and docs.
- Interactions can look correct while stock or totals are wrong. Check boundary quantities and calculate totals from source prices and quantities.
- Remote images are not controlled by the app. Do not make them necessary for product identification or interaction.

## Proof and review gates

- Build: `npm run build`.
- Behavior: all catalog, detail, cart, and checkout cases in `evals.md`.
- Responsive: inspect 375px and 1280px widths; confirm no page-level horizontal overflow.
- Human review: compare scope and behavior against `spec.md`; explicitly verify no real account/payment/order claim has slipped in.

## Plan deviations

If implementation requires a material scope or behavior change, update this plan and the relevant spec decision in the same change, then ask a human to approve the revised direction.