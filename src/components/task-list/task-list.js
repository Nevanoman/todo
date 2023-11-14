import PropTypes from 'prop-types'

import TaskListItem from '../task-list-item/task-list-item'
import './task-list.css'

function TaskList({ tasks, onDeleted, onToggleDone, onEdit }) {
  const elements = tasks.map((item) => {
    const { id, ...itemProps } = item
    return (
      <TaskListItem
        {...itemProps}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onEdit={(newLabel) => onEdit(id, newLabel)}
      />
    )
  })
  return <ul className="list-group todo-list">{elements}</ul>
}

TaskList.propTypes = {
  tasks: PropTypes.array,
}
export default TaskList
