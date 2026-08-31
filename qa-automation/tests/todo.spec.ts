import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('shows an empty state with no todos', async ({ page }) => {
  await expect(page.getByText('No todos yet — add one above.')).toBeVisible()
})

test('adds, completes, and deletes a todo', async ({ page }) => {
  await page.getByLabel('New todo').fill('Buy milk')
  await page.getByRole('button', { name: 'Add' }).click()

  const item = page.getByRole('listitem').filter({ hasText: 'Buy milk' })
  await expect(item).toBeVisible()
  await expect(page.getByText('1 item left')).toBeVisible()

  await item.getByRole('checkbox').check()
  await expect(item.locator('span')).toHaveCSS('text-decoration-line', 'line-through')
  await expect(page.getByText('0 items left')).toBeVisible()

  await item.getByRole('button', { name: 'Delete' }).click()
  await expect(page.getByText('No todos yet — add one above.')).toBeVisible()
})

test('keeps todos independent of each other', async ({ page }) => {
  for (const text of ['Buy milk', 'Walk the dog']) {
    await page.getByLabel('New todo').fill(text)
    await page.getByRole('button', { name: 'Add' }).click()
  }

  await expect(page.getByText('2 items left')).toBeVisible()

  await page.getByRole('listitem').filter({ hasText: 'Buy milk' }).getByRole('checkbox').check()
  await expect(page.getByText('1 item left')).toBeVisible()
  await expect(page.getByRole('listitem').filter({ hasText: 'Walk the dog' })).toBeVisible()

  await page
    .getByRole('listitem')
    .filter({ hasText: 'Buy milk' })
    .getByRole('button', { name: 'Delete' })
    .click()
  await expect(page.getByRole('listitem')).toHaveCount(1)
  await expect(page.getByText('Walk the dog')).toBeVisible()
})
