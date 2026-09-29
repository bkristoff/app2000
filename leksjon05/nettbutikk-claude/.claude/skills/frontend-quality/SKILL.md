---
name: frontend-quality
description: Apply the Hobbyhjørnet frontend scope, interaction, accessibility, and visual standards when designing or changing storefront UI.
---

# Frontend quality

Use this guidance when implementing or reviewing the storefront. The approved source of truth is `spec.md`; this skill makes recurring frontend constraints easy to apply during a task.

## Before changing UI

- Read the relevant requirement and acceptance criterion in `spec.md`.
- Keep the work within the frontend-only prototype. Ask for a new intent if the requested change implies accounts, API behavior, payment, persistence, or administration.
- Identify the observable behavior and the smallest check that can prove it.

## Interaction requirements

- Use semantic buttons, inputs, and headings; interactive controls need accessible names and visible keyboard focus.
- Preserve the active search and category when opening or closing product details.
- Derive cart totals from integer NOK prices and quantities. Clamp quantities to 1..available stock.
- Give empty, unavailable, and confirmation states clear Norwegian copy.
- Clearly label checkout as a demo; never collect personal or payment data.

## Visual requirements

- Keep the catalog immediately actionable and responsive from 375px upward.
- Use the established paper, ink, tomato, and leaf visual language. Prefer clear hierarchy and product photography over decorative UI.
- Images are optional content, not a dependency for reading product details or using controls. Provide useful alt text.
- Avoid horizontal page overflow and ensure text and controls fit their containers.

## Verification

- Run `npm run build` after code changes.
- Follow the relevant scenarios in `evals.md`; include stock boundaries, empty states, and mobile layout when touched.
- Report checks that could not be performed rather than implying they passed.
