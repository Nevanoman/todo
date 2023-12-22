import { Component } from 'react'
import intervalToDuration from 'date-fns/intervalToDuration'

import NewTaskForm from './components/new-task-form/new-task-form'
import TaskList from './components/task-list/task-list'
import Filter from './components/task-filter/task-filter'

import './App.css'

export default class App extends Component {
  state = {
    todoData: [],
    todoFilter: 'all',
    timer: 0,
  }

  static defaultProps = {
    deleteItem: () => {},
    addItem: () => {},
    onToggleDone: () => {},
    todoFilterState: () => {},
    filter: () => {},
    clearCompleted: () => {},
    formatTime: () => {},
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.id !== id)
      return {
        todoData: newArray,
      }
    })
  }

  addItem = (text, timer) => {
    if (!text.trim()) return
    const newItem = {
      label: text,
      id: Math.random().toString(36).slice(2),
      timer,
      isTimerStarted: true,
    }

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]
      return {
        todoData: newArray,
      }
    })
  }

  addTimer = (min, sec) => {
    const tim = Number(min) * 60 + Number(sec)
    this.setState({
      timer: tim,
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
      }

      const newArray = [...todoData]
      newArray.splice(idx, 1, newItem)

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

  handleEdit = (id, newLabel) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = {
        ...oldItem,
        label: newLabel,
      }

      const newArray = todoData.slice()
      newArray.splice(idx, 1, newItem)

      return {
        todoData: newArray,
      }
    })
  }

  formatTime = (time) => {
    console.log(time)
    const duration = intervalToDuration({ start: 0, end: time })
    const formatedTime = `${duration.minutes}:${duration.seconds}`
    return formatedTime
  }

  render() {
    const { todoData, timer } = this.state
    const doneCount = todoData.filter((el) => !el.done).length

    return (
      <div className="todoapp">
        <NewTaskForm addItem={this.addItem} addTimer={this.addTimer} />
        <section className="main">
          <TaskList
            tasks={this.filter()}
            onDeleted={this.deleteItem}
            addItem={this.addItem}
            onToggleDone={this.onToggleDone}
            onEdit={this.handleEdit}
            timer={timer}
            formatTime={this.formatTime}
          />
          <Filter done={doneCount} todoFilterState={this.todoFilterState} clearCompleted={this.clearCompleted} />
        </section>
      </div>
    )
  }
}
