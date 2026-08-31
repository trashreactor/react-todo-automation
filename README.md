# React To-Do List

A minimal to-do list app used as an automation/testing exercise: a small React UI,
a matching test suite, and a CI workflow that runs it.

- **App**: add a to-do, mark it complete, delete it. Vite + React + TypeScript.
- **Tests**: Vitest + React Testing Library, run in jsdom.
- **CI**: GitHub Actions runs lint, tests, and a production build on every push/PR to `main`.

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
