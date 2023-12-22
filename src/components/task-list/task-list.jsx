import PropTypes from 'prop-types'

import TaskListItem from '../task-list-item/task-list-item'
import './task-list.css'

function TaskList({ tasks, onDeleted, onToggleDone, onEdit, formatTime }) {
  const elements = tasks.map((item) => {
    const { id, timer, isTimerStarted, ...itemProps } = item
    return (
      <TaskListItem
        {...itemProps}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onEdit={(newLabel) => onEdit(id, newLabel)}
        formatTime={() => formatTime(timer)}
        isTimerStarted={isTimerStarted}
        timer={timer}
      />
    )
  })
  return <ul className="list-group todo-list">{elements}</ul>
}

TaskList.propTypes = {
  tasks: PropTypes.array,
}
export default TaskList
