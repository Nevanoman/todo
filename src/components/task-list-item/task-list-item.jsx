import './task-list-item.css'
import { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default class TaskListItem extends Component {
  state = {
    editing: false,
    editedLabel: false,
  }

  static propTypes = {
    label: PropTypes.string,
    done: PropTypes.bool,
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
    })
  }

  render() {
    const { label, onDeleted, onToggleDone, done } = this.props
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
          <div className="edit">
            <input
              type="text"
              className="edit"
              value={editedLabel}
              onChange={this.handleEditChange}
              onBlur={this.handleEditSubmit}
              onKeyDown={(e) => e.key === 'Enter' && this.handleEditSubmit()}
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
