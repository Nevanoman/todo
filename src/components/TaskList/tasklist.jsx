import React, { Component } from "react";
import Task from "../Task/task";
import "./tasklist.css";

class TaskList extends Component {
  render() {
    return (
      <ul class="todo-list">
        <Task />
      </ul>
    );
  }
}

export default TaskList;
