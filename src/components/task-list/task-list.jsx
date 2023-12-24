import PropTypes from 'prop-types'

import TaskListItem from '../task-list-item/task-list-item'
import './task-list.css'
import { useEffect } from 'react'

function TaskList({ tasks, onDeleted, onToggleDone, onEdit, formatTime, incrementTimer }) {
  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  const elements = tasks.map((item) => {
    const { id, timer, isTimerStarted, done, ...itemProps } = item
    return (
      <TaskListItem
        {...itemProps}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onEdit={(newLabel) => onEdit(id, newLabel)}
        formatTime={formatTime}
        isTimerStarted={isTimerStarted}
        timer={timer}
        done={done}
        incrementTimer={incrementTimer}
      />
    )
  })
  return <ul className="list-group todo-list">{elements}</ul>
}

TaskList.propTypes = {
  tasks: PropTypes.array,
}
export default TaskList
