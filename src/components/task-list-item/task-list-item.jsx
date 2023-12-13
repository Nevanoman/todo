import './task-list-item.css'
import { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../task-timer/task-timer'

export default class TaskListItem extends Component {
  static propTypes = {
    label: PropTypes.string,
    done: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      editedLabel: props.label,
      initialLabel: props.label,
    }
  }

  handleChange = () => {
    const { onToggleDone } = this.props
    const { done } = this.state
    onToggleDone()
    this.setState({
      done: !done,
    })
  }

  onKeyHandler = (event) => {
    const { onToggleDone } = this.props
    if (event.key === 'Enter') {
      onToggleDone()
    }
  }

  handleEditClick = () => {
    this.setState({
      editing: true,
    })
  }

  handleEditChange = (e) => {
    this.setState({
      editedLabel: e.target.value,
    })
  }

  handleEditSubmit = () => {
    const { onEdit } = this.props
    const { editedLabel } = this.state

    onEdit(editedLabel)

    this.setState({
      editing: false,
      initialLabel: editedLabel,
    })
  }

  handleEditCancel = () => {
    const { initialLabel } = this.state

    this.setState({
      editing: false,
      editedLabel: initialLabel,
    })
  }

  render() {
    const { label, onDeleted, onToggleDone, done, timer } = this.props
    const { editing, editedLabel } = this.state
    let className = ''
    if (done) {
      className += 'completed'
    }
    if (editing) {
      className += ' editing'
    }

    return (
      <li className={className}>
        {editing ? (
          <div>
            <input
              type="text"
              className="edit"
              value={editedLabel}
              onChange={this.handleEditChange}
              onBlur={this.handleEditCancel}
              onKeyDown={(e) => {
                if (e.key === 'Enter') this.handleEditSubmit()
                if (e.key === 'Escape') this.handleEditCancel()
              }}
            />
          </div>
        ) : (
          <div className="view">
            <input className="toggle" type="checkbox" onChange={this.handleChange} defaultChecked={done} />
            <label>
              <span
                className="description"
                onClick={onToggleDone}
                onKeyDown={this.onKeyHandler}
                role="textbox"
                tabIndex={0}
              >
                {label}
              </span>
              <Timer timer={timer} />
              <span className="created">created {formatDistanceToNow(new Date(), { includeSeconds: true })}</span>
            </label>
            <button type="button" className="icon icon-edit" onClick={this.handleEditClick} aria-label="edit" />
            <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="delete" />
          </div>
        )}
      </li>
    )
  }
}
