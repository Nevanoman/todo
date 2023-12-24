import { useEffect, useState } from 'react'
import intervalToDuration from 'date-fns/intervalToDuration'

import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Filter from '../task-filter/task-filter'
import './app.css'

function App() {
  const [todoData, setTodoData] = useState([])
  const [todoFilter, setTodoFilter] = useState('all')

  useEffect(() => {}, [todoData])

  const deleteItem = (id) => {
    setTodoData((prevData) => prevData.filter((el) => el.id !== id))
  }

  const addItem = (text, timer) => {
    if (!text.trim()) return
    const newItem = {
      label: text,
      id: Math.random().toString(36).slice(2),
      timer,
      isTimerStarted: true,
      done: false,
    }

    setTodoData((prevData) => [...prevData, newItem])
  }

  const decrementTimer = (id) => {
    setTodoData((prevData) => {
      const idx = prevData.findIndex((el) => el.id === id)
      const oldItem = prevData[idx]
      const newItem = {
        ...oldItem,
        timer: oldItem.timer - 1000,
      }

      const newArray = [...prevData]
      newArray.splice(idx, 1, newItem)

      return newArray
    })
  }

  const onToggleDone = (id) => {
    setTodoData((prevData) => {
      const idx = prevData.findIndex((el) => el.id === id)
      const oldItem = prevData[idx]
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
      }

      const newArray = [...prevData]
      newArray.splice(idx, 1, newItem)

      return newArray
    })
  }

  const todoFilterState = (text) => {
    if (text !== todoFilter) {
      setTodoFilter(text)
    }
  }

  const clearCompleted = () => {
    setTodoData((prevData) => prevData.filter((todo) => !todo.done))
  }

  const handleEdit = (id, newLabel) => {
    setTodoData((prevData) => {
      const idx = prevData.findIndex((el) => el.id === id)
      const oldItem = prevData[idx]
      const newItem = {
        ...oldItem,
        label: newLabel,
      }

      const newArray = prevData.slice()
      newArray.splice(idx, 1, newItem)

      return newArray
    })
  }

  const formatTime = (time) => {
    const duration = intervalToDuration({ start: 0, end: time })
    const formatedTime = `${duration.minutes}:${duration.seconds}`
    return formatedTime
  }

  const doneCount = todoData.filter((el) => !el.done).length

  return (
    <div className="todoapp">
      <NewTaskForm addItem={addItem} />
      <section className="main">
        <TaskList
          tasks={todoData}
          onDeleted={deleteItem}
          addItem={addItem}
          onToggleDone={onToggleDone}
          onEdit={handleEdit}
          formatTime={formatTime}
          decrementTimer={decrementTimer}
          currentFilter={todoFilter}
        />
        <Filter done={doneCount} todoFilterState={todoFilterState} clearCompleted={clearCompleted} />
      </section>
    </div>
  )
}

export default App
