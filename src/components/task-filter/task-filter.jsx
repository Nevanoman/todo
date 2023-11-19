import './task-filter.css'
import { Component } from 'react'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeButton: 'all',
    }
  }

  handleButtonClick = (filterType) => {
    const { todoFilterState } = this.props
    todoFilterState(filterType)

    this.setState({
      activeButton: filterType,
    })
  }

  render() {
    const { done, clearCompleted } = this.props
    const { activeButton } = this.state

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
                onClick={() => this.handleButtonClick(button.type)}
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
}

export default Filter
