import { Component } from 'react'

import NewTaskForm from './components/new-task-form/new-task-form'
import TaskList from './components/task-list/task-list'
import Filter from './components/task-filter/task-filter'
import './App.css'

export default class App extends Component {
  state = {
    todoData: [],
    todoFilter: 'all',
  }

  static defaultProps = {
    deleteItem: () => {},
    addItem: () => {},
    onToggleDone: () => {},
    todoFilterState: () => {},
    filter: () => {},
    clearCompleted: () => {},
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.id !== id)
      return {
        todoData: newArray,
      }
    })
  }

  addItem = (text) => {
    const newItem = {
      label: text,
      id: Math.random().toString(36).slice(2),
    }

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]
      return {
        todoData: newArray,
      }
    })
  }

  onToggleDone = (id, newText) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
        label: newText || oldItem.label,
      }

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  todoFilterState = (text) => {
    const { todoFilter } = this.state

    if (text !== todoFilter) {
      this.setState({ todoFilter: text })
    }
  }

  filter = () => {
    const { todoFilter, todoData } = this.state
    if (todoFilter === 'completed') {
      const completed = todoData.filter((el) => el.done)
      return completed
    }
    if (todoFilter === 'active') {
      const active = todoData.filter((el) => !el.done)
      return active
    }
    if (todoFilter === 'all') {
      return todoData
    }
    return []
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((todo) => !todo.done)
      return {
        todoData: newArray,
      }
    })
  }

  render() {
    const { todoData } = this.state
    const doneCount = todoData.filter((el) => !el.done).length

    return (
      <div className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            tasks={this.filter()}
            onDeleted={this.deleteItem}
            addItem={this.addItem}
            onToggleDone={this.onToggleDone}
          />
          <Filter done={doneCount} todoFilterState={this.todoFilterState} clearCompleted={this.clearCompleted} />
        </section>
      </div>
    )
  }
}
