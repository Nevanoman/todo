import './task-list-item.css'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

function TaskListItem({
  label,
  done,
  onDeleted,
  onToggleDone,
  onEdit,
  timer,
  formatTime,
  incrementTimer,
  isTimerStarted,
}) {
  const [editing, setEditing] = useState(false)
  const [editedLabel, setEditingLabel] = useState(label)
  const [initialLabel, setInitialLabel] = useState(label)
  const [taskClassName, setTaskClassName] = useState('active')

  useEffect(() => {
    if (isTimerStarted) {
      // incrementTimer()
    }
  }, [isTimerStarted])

  const handleChange = () => {
    onToggleDone()
  }

  const onKeyHandler = (event) => {
    if (event.key === 'Enter') {
      onToggleDone()
    }
  }

  const handleEditChange = (e) => {
    setEditingLabel(e.target.value)
  }

  const handleEditSubmit = () => {
    onEdit(editedLabel)
    setEditing(false)
    setInitialLabel(editedLabel)
  }

  const handleEditCancel = () => {
    setEditing(false)
    setEditingLabel(initialLabel)
  }

  useEffect(() => {
    if (done) {
      setTaskClassName('completed')
    } else {
      setTaskClassName('active')
    }
  }, [done])

  return (
    <li className={taskClassName}>
      {editing ? (
        <div>
          <input
            type="text"
            className="edit"
            value={editedLabel}
            onChange={handleEditChange}
            onBlur={handleEditCancel}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEditSubmit()
              if (e.key === 'Escape') handleEditCancel()
            }}
          />
        </div>
      ) : (
        <div className="view">
          <input className="toggle" type="checkbox" onChange={handleChange} defaultChecked={done} checked={done} />
          <label>
            <span className="description" onClick={handleChange} onKeyDown={onKeyHandler} role="textbox" tabIndex={0}>
              {label}
            </span>
            <span className="description">
              <button type="button" className="icon icon-play" aria-label="edit" />
              <button type="button" className="icon icon-pause" aria-label="edit" />
              {formatTime(timer)}
            </span>
            <span className="created">created {formatDistanceToNow(new Date(), { includeSeconds: true })}</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="edit" onClick={() => setEditing(true)} />
          <button type="button" className="icon icon-destroy" aria-label="delete" onClick={onDeleted} />
        </div>
      )}
    </li>
  )
}

TaskListItem.propTypes = {
  label: PropTypes.string,
  done: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEdit: PropTypes.func,
  timer: PropTypes.number,
  formatTime: PropTypes.func,
}

export default TaskListItem
