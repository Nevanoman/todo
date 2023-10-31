import React, { Component } from "react";
import TaskFilter from "../TasksFilter";
import "./footer.css";

class Footer extends Component {
  render() {
    return (
      <footer class="footer">
        <span class="todo-count">1 items left</span>
				<TaskFilter />
        <button class="clear-completed">Clear completed</button>
      </footer>
    );
  }
}

export default Footer;
