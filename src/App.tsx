import { useState } from 'react'
import './App.css'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import type { Todo } from './types'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  function addTodo(text: string) {
    setTodos((current) => [
      ...current,
      { id: crypto.randomUUID(), text, completed: false },
    ])
  }

  function toggleTodo(id: string) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function deleteTodo(id: string) {
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  const remaining = todos.filter((todo) => !todo.completed).length

  return (
    <main>
      <h1>To-Do List</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      {todos.length > 0 && (
        <p>
          {remaining} item{remaining === 1 ? '' : 's'} left
        </p>
      )}
    </main>
  )
}

export default App
