import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('shows an empty state when there are no todos', () => {
    render(<App />)

    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument()
  })

  it('supports adding, completing, and deleting a todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('New todo'), 'Buy milk')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('1 item left')).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox'))
    expect(screen.getByText('0 items left')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument()
  })
})
