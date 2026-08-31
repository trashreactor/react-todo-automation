import { expect, test } from '../fixtures'

test('shows an empty state with no todos', async ({ todoPage }) => {
  await expect(todoPage.emptyState).toBeVisible()
})

test('adds, completes, and deletes a todo', async ({ todoPage }) => {
  await test.step('add a todo', async () => {
    await todoPage.addTodo('Buy milk')
    await expect(todoPage.item('Buy milk')).toBeVisible()
    await expect(todoPage.itemsLeftText(1)).toBeVisible()
  })

  await test.step('mark it complete', async () => {
    await todoPage.toggle('Buy milk')
    await expect(todoPage.item('Buy milk').locator('span')).toHaveCSS(
      'text-decoration-line',
      'line-through',
    )
    await expect(todoPage.itemsLeftText(0)).toBeVisible()
  })

  await test.step('delete it', async () => {
    await todoPage.delete('Buy milk')
    await expect(todoPage.emptyState).toBeVisible()
  })
})

test('keeps todos independent of each other', async ({ todoPage }) => {
  await test.step('add two todos', async () => {
    await todoPage.addTodo('Buy milk')
    await todoPage.addTodo('Walk the dog')
    await expect(todoPage.itemsLeftText(2)).toBeVisible()
  })

  await test.step('complete one, leave the other untouched', async () => {
    await todoPage.toggle('Buy milk')
    await expect(todoPage.itemsLeftText(1)).toBeVisible()
    await expect(todoPage.item('Walk the dog')).toBeVisible()
  })

  await test.step('delete the completed one', async () => {
    await todoPage.delete('Buy milk')
    await expect(todoPage.page.getByRole('listitem')).toHaveCount(1)
    await expect(todoPage.item('Walk the dog')).toBeVisible()
  })
})
