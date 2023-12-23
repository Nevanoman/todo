import './task-filter.css'

function Filter({ todoFilterState, done, clearCompleted, activeButton }) {
  const handleFilterButtonClick = (filterType) => {
    todoFilterState(filterType)
  }

  const filterButtons = [
    { label: 'All', type: 'all' },
    { label: 'Active', type: 'active' },
    { label: 'Completed', type: 'completed' },
  ]

  return (
    <footer className="footer">
      <span className="todo-count">{done} items left</span>
      <ul className="filters">
        {filterButtons.map((button) => (
          <li key={button.type}>
            <button
              type="button"
              className={activeButton === button.type ? 'selected' : ''}
              onClick={() => handleFilterButtonClick(button.type)}
            >
              {button.label}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Filter
