import React, { Component } from "react";
import "./taskfilter.css";

class TaskFilter extends Component {
  render() {
    return (
      <ul class="filters">
        <li>
          <button class="selected">All</button>
        </li>
        <li>
          <button>Active</button>
        </li>
        <li>
          <button>Completed</button>
        </li>
      </ul>
    );
  }
}

export default TaskFilter;
