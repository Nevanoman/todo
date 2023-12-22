import { Component } from 'react'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }

  static defaultProps = {
    onChange: () => {},
    onSubmit: () => {},
    addItem: () => {},
  }

  onChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onChangeMin = (e) => {
    const min = e.target.value
    this.setState({
      min,
    })
  }

  onChangeSec = (e) => {
    const sec = e.target.value
    this.setState({
      sec,
    })
  }

  formatToMs = (min, sec) => {
    const sms = sec * 1000
    const mms = min * 60000
    return sms + mms
  }

  onSubmit = (e) => {
    const { addItem, addTimer } = this.props
    const { label, min, sec } = this.state
    e.preventDefault()
    addItem(label, this.formatToMs(min, sec))
    addTimer(min, sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { label, min, sec } = this.state
    return (
      <header className="header">
        <h1>My Todo List</h1>
        <form className="new-todo-form header" onSubmit={this.onSubmit}>
          <input
            name="name"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onChange}
            value={label}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onChangeMin}
            value={min}
            type="number"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onChangeSec}
            value={sec}
            type="number"
          />
          <button type="submit" className="battonSabmit">
            Submit
          </button>
        </form>
      </header>
    )
  }
}
