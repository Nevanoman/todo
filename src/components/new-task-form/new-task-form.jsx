import { useState } from 'react'
import './new-task-form.css'

function NewTaskForm({ addItem }) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  NewTaskForm.defaultProps = {
    onChange: () => {},
    onSubmit: () => {},
    addItem: () => {},
  }

  const onChange = (e) => {
    setLabel(e.target.value)
  }

  const onChangeMin = (e) => {
    setMin(e.target.value)
  }

  const onChangeSec = (e) => {
    setSec(e.target.value)
  }

  const formatToMs = () => {
    const sms = sec * 1000
    const mms = min * 60 * 1000
    return sms + mms
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addItem(label, formatToMs())
    setLabel('')
    setMin('')
    setSec('')
  }

  return (
    <header className="header">
      <h1>My Todo List</h1>
      <form className="new-todo-form header" onSubmit={onSubmit}>
        <input
          name="name"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onChange}
          value={label}
        />
        <input className="new-todo-form__timer" placeholder="Min" onChange={onChangeMin} value={min} type="number" />
        <input className="new-todo-form__timer" placeholder="Sec" onChange={onChangeSec} value={sec} type="number" />
        <button type="submit" className="battonSabmit">
          Submit
        </button>
      </form>
    </header>
  )
}

export default NewTaskForm
