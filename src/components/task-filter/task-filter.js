import './task-filter.css'
import { Component } from 'react'

class Filter extends Component {
  state = {
    activeButton: 'all',
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

    return (
      <footer className="footer">
        <span className="todo-count">{done} items left</span>
        <ul className="filters">
          <li>
            <button
              type="button"
              className={activeButton === 'all' ? 'selected' : ''}
              onClick={() => this.handleButtonClick('all')}
            >
              All
            </button>
          </li>
          <li>
            <button
              type="button"
              className={activeButton === 'active' ? 'selected' : ''}
              onClick={() => this.handleButtonClick('active')}
            >
              Active
            </button>
          </li>
          <li>
            <button
              type="button"
              className={activeButton === 'completed' ? 'selected' : ''}
              onClick={() => this.handleButtonClick('completed')}
            >
              Completed
            </button>
          </li>
        </ul>
        <button type="button" className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}

export default Filter