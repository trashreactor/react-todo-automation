import type { Locator, Page } from '@playwright/test'

export class TodoPage {
  readonly page: Page
  readonly newTodoInput: Locator
  readonly addButton: Locator
  readonly emptyState: Locator

  constructor(page: Page) {
    this.page = page
    this.newTodoInput = page.getByLabel('New todo')
    this.addButton = page.getByRole('button', { name: 'Add' })
    this.emptyState = page.getByText('No todos yet — add one above.')
  }

  async goto() {
    await this.page.goto('/')
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text)
    await this.addButton.click()
  }

  item(text: string): Locator {
    return this.page.getByRole('listitem').filter({ hasText: text })
  }

  async toggle(text: string) {
    await this.item(text).getByRole('checkbox').check()
  }

  async delete(text: string) {
    await this.item(text).getByRole('button', { name: 'Delete' }).click()
  }

  itemsLeftText(count: number): Locator {
    return this.page.getByText(`${count} item${count === 1 ? '' : 's'} left`)
  }
}
