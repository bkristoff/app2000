# Hobbyhjørnet

A small Norwegian hobby shop frontend and teaching repo for an AI-native software development lifecycle. The current product is a frontend-only prototype with a local product catalog, search, category filters, product details, a cart, and simulated checkout. There is no API, account system, payment provider, or admin console.

## Run the frontend

Requirements: Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use `npm run build` to verify a production build.

## Follow the artifact chain

Start with [intent.md](intent.md): it records what is wanted, why, and the constraints. [spec.md](spec.md) turns that intent into observable requirements and UX decisions. [plan.md](plan.md) names the implementation order, changed files, risks, and proof. The accepted plan is implemented in code; [evals.md](evals.md) defines repeatable checks, and [review.md](review.md) records the outcome of this example run.

`CLAUDE.md` is short, repo-wide working context. The reusable frontend-specific guidance lives in [.claude/skills/frontend-quality/SKILL.md](.claude/skills/frontend-quality/SKILL.md). These are examples to adapt, not magic configuration: review each artifact, resolve open questions, and commit accepted decisions so the next stage can act on them.

## Classroom workflow

1. Read `intent.md` and identify which decisions are still open.
2. Review `spec.md` against the intent. Ask an AI to flag gaps and contradictions, then have a person decide.
3. Inspect `plan.md` before implementation. The plan should be specific enough for someone else to execute and verify.
4. Implement in small slices and run the relevant checks from `evals.md` as the code changes.
5. Review the final behavior and the diff against the approved spec and plan. Record the review outcome in `review.md`; create a new intent when evidence changes the desired outcome.

The flow is deliberately manual for teaching. A later exercise can connect accepted artifacts to pull requests, CI, automated review, or approval hooks.

## Source

The original `prd.md` described a broader store including a Node/Express API, MySQL, accounts, orders, and product administration. That is not part of this frontend-only iteration. Its customer needs and catalog/cart requirements have been retained in the intent and spec; backend work remains out of scope.

The artifact approach is informed by [The AI-native SDLC playbook](https://academy.claude.com/courses/ai-native-sdlc-playbook).
