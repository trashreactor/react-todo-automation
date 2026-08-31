# React To-Do List

A minimal to-do list app used as an automation/testing exercise: a small React UI,
a matching test suite, and CI workflows that run it.

- **App**: add a to-do, mark it complete, delete it. Vite + React + TypeScript.
- **Unit/component tests**: Vitest + React Testing Library, run in jsdom.
- **E2e tests**: Playwright, under [`qa-automation/`](./qa-automation), run against a real
  browser and the built app.
- **CI**: three GitHub Actions workflows — **Dev Tests Gate** (lint, unit tests, build)
  runs on every commit pushed to any branch; **QA E2E Tests Gate** (the Playwright suite)
  runs when a PR is merged into `main`; **Nightly E2E Tests** runs the same Playwright
  suite on a weekly schedule (Sundays) and can also be triggered manually. The nightly
  run's HTML report is published to GitHub Pages at
  https://trashreactor.github.io/react-todo-automation/.

## Running the app locally

```bash
npm install
npm run dev
```

Open the printed local URL (typically http://localhost:5173).

## Running the tests

```bash
npm test        # runs the full suite once (used in CI)
npm run test:watch  # re-runs on file changes, for local development
```

## What the tests cover

- **`TodoForm`** — submitting adds the trimmed input via `onAdd` and clears the field;
  submitting blank/whitespace input is a no-op.
- **`TodoItem`** — the checkbox and Delete button call `onToggle`/`onDelete` with the
  todo's id.
- **`App`** (integration) — the empty-state message shows with no todos, and adding,
  completing, and deleting a todo updates the list and the remaining-items count as
  expected.

## Other scripts

```bash
npm run build  # type-check (tsc -b) and produce a production build
npm run lint   # oxlint
```

## E2e tests (Playwright)

See [`qa-automation/README.md`](./qa-automation/README.md) for how to run the Playwright
suite locally and what it covers.
