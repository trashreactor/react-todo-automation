# qa-automation

Playwright end-to-end suite for the to-do app in the parent directory. It drives a real
Chromium browser against the built app, as opposed to the unit/component tests at the
repo root which run in jsdom.

## Running locally

```bash
npm install
npx playwright install chromium  # one-time browser download
npm test
```

`npm test` builds the app and serves it via `vite preview` automatically (see the
`webServer` block in `playwright.config.ts`), so there's no need to start the dev server
yourself first.

Other scripts:

```bash
npm run test:headed  # run with a visible browser window
npm run report       # open the last HTML report
```

## What it covers

- The empty-state message shows when there are no todos.
- Adding a todo, marking it complete (including the strikethrough style), and deleting
  it, checking the "N item(s) left" count throughout.
- Multiple todos stay independent — completing or deleting one doesn't affect the
  others, and the list count reflects what's left.
