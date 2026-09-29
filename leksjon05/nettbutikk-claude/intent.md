# Intent: Hobbyhjørnet frontend

Status: accepted for frontend MVP  
Origin: existing hobby shop PRD and teaching-project brief

## Problem

Learners need a concrete, small web product to practice an AI-native development workflow. The source PRD describes a hobby shop, but mixes frontend behavior with a future API, database, authentication, security, and administration. That scope is too broad for the first teaching iteration, and the repository has no runnable application.

## Desired outcome

Create a polished Norwegian-language hobby shop frontend that a learner can run locally and use to browse products, search and filter the catalog, inspect a product, manage a cart, and complete a simulated checkout. The repository should show how a human-reviewed intent becomes a spec, an implementation plan, shared agent context, reusable guidance, and repeatable evaluation evidence.

## Users

- Learners exploring a realistic frontend project and AI-native SDLC artifacts.
- Guest shoppers trying the catalog and purchase flow.

## Constraints

- Build only the frontend in this iteration; use local mock data and no backend.
- Do not collect or persist personal or payment data. Checkout is a demonstration only.
- Preserve the source PRD's product discovery, stock visibility, cart, totals, and order confirmation needs where they fit the frontend prototype.
- Use React and Vite, with a small dependency surface.
- Keep the experience responsive, accessible, and in Norwegian.
- Treat external product photography as presentation assets; core behavior must not depend on it loading.

## Out of scope

API/database implementation, authentication, real payment, persistent orders, customer order history, and admin CRUD. These remain possible future intents, not implied promises of this prototype.

## Success signals

- A learner can start the app with the documented commands and reach a usable catalog.
- Search, category filtering, product details, cart quantity/removal, totals, and simulated confirmation work without a server.
- The production build succeeds, and the key interaction and responsive checks in `evals.md` pass.
- A reviewer can trace the visible behavior back through `spec.md` and `plan.md` to this intent.

## Open questions carried forward

- Which product categories and initial catalog size should a later iteration use?
- Should checkout persist orders when a backend is introduced?
- What should be the source of truth for approved design tokens and product photography?