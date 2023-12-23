import './task-list-item.css'
import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

function TaskListItem({ label, done, onToggleDone, onEdit, timer, formatTime }) {
  const [doneState, setDone] = useState(done)
  const [editing, setEditing] = useState(false)
  const [editedLabel, setEditingLabel] = useState(label)
  const [initialLabel, setInitialLabel] = useState(label)
  const [isTimerStarted, setIsTimerStarted] = useState(false)
  const [timerValue, setTimerValue] = useState(timer)
  const [completedClassName, setCompletedClassName] = useState('')

  useEffect(() => {
    if (doneState) {
      setCompletedClassName('completed')
    }
    if (editing) {
      setCompletedClassName('editing')
    } else {
      setCompletedClassName('')
    }
  }, [doneState, editing])

  const handleChange = () => {
    onToggleDone()
    setDone(!doneState)
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

  const startTimer = useCallback(() => {
    if (isTimerStarted) {
      const timerID = setInterval(() => {
        setTimerValue((prevTimer) => prevTimer - 1000)
      }, 1000)
      return () => clearInterval(timerID)
    }
    return null
  }, [isTimerStarted])

  const stopTimer = () => {
    setIsTimerStarted(false)
    return null
  }

  useEffect(() => {
    if (isTimerStarted) {
      const timerID = startTimer()
      return () => clearInterval(timerID)
    }
  }, [isTimerStarted, startTimer])

  return (
    <li className={completedClassName}>
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
          <input className="toggle" type="checkbox" onChange={handleChange} defaultChecked={done} />
          <label>
            <span className="description" onClick={onToggleDone} onKeyDown={onKeyHandler} role="textbox" tabIndex={0}>
              {label}
            </span>
            <span className="description">
              <button type="button" className="icon icon-play" aria-label="edit" onClick={startTimer} />
              <button type="button" className="icon icon-pause" aria-label="edit" onClick={stopTimer} />
              {formatTime(timer)}
            </span>
            <span className="created">created {formatDistanceToNow(new Date(), { includeSeconds: true })}</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="edit" onClick={() => setIsTimerStarted(true)} />
          <button
            type="button"
            className="icon icon-destroy"
            aria-label="delete"
            onClick={() => setIsTimerStarted(false)}
          />
        </div>
      )}
    </li>
  )
}

TaskListItem.propTypes = {
  label: PropTypes.string,
  done: PropTypes.bool,
  onToggleDone: PropTypes.func,
  onEdit: PropTypes.func,
  timer: PropTypes.number,
  formatTime: PropTypes.func,
}

export default TaskListItem
