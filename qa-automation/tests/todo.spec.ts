import { expect, test } from '../fixtures'

test('shows an empty state with no todos', async ({ todoPage }) => {
  await expect(todoPage.emptyState).toBeVisible()
})

test('adds, completes, and deletes a todo', async ({ todoPage }) => {
  const text = 'Buy milk'

  await test.step('add a todo', async () => {
    await todoPage.addTodo(text)
    await expect(todoPage.item(text)).toBeVisible()
    await expect(todoPage.itemsLeftText(1)).toBeVisible()
  })

  await test.step(`mark "${text}" complete`, async () => {
    await todoPage.toggle(text)
    await expect(todoPage.item(text).locator('span')).toHaveCSS(
      'text-decoration-line',
      'line-through',
    )
    await expect(todoPage.itemsLeftText(0)).toBeVisible()
  })

  await test.step(`delete "${text}"`, async () => {
    await todoPage.delete(text)
    await expect(todoPage.emptyState).toBeVisible()
  })
})

test('keeps todos independent of each other', async ({ todoPage }) => {
  const text1 = 'Buy milk'
  const text2 = 'Walk the dog'

  await test.step('add two todos', async () => {
    await todoPage.addTodo(text1)
    await todoPage.addTodo(text2)
    await expect(todoPage.itemsLeftText(2)).toBeVisible()
  })

  await test.step('complete one, leave the other untouched', async () => {
    await todoPage.toggle(text1)
    await expect(todoPage.itemsLeftText(1)).toBeVisible()
    await expect(todoPage.item(text2)).toBeVisible()
  })

  await test.step('delete the completed one', async () => {
    await todoPage.delete(text1)
    await expect(todoPage.page.getByRole('listitem')).toHaveCount(1)
    await expect(todoPage.item(text2)).toBeVisible()
  })
})
