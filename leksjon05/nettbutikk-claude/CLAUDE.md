# Repository guide

## Commands

- Install: `npm install`
- Development: `npm run dev`
- Production build: `npm run build`

## Conventions

- React + Vite, JavaScript modules, plain CSS. Keep dependencies small.
- This iteration is frontend-only. Catalog data is local; checkout is simulated.
- User-facing copy is Norwegian. Prices use NOK and `Intl.NumberFormat`.
- Keep product behavior in `src/App.jsx` and catalog records in `src/data/products.js`.
- Follow the approved scope and UX decisions in `spec.md`; verify with `evals.md`.

## Guardrails

- Never imply the demo created a real order or accepted a payment.
- Do not add backend, authentication, analytics, or browser persistence without an accepted intent and updated spec.
- If an instruction is missing or repeatedly causes a mistake, propose a concise update here and get it reviewed.
