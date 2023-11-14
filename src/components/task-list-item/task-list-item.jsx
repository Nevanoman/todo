import './task-list-item.css'
import { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default class TaskListItem extends Component {
  state = {
    done: false,
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

  render() {
    const { label, onDeleted, onToggleImportant, onToggleDone, done } = this.props

    let className = ''
    if (done) {
      className += 'completed'
    }

    return (
      <li className={className}>
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
          <button type="button" className="icon icon-edit" onClick={onToggleImportant} aria-label="edit" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="delete" />
        </div>
      </li>
    )
  }
}
