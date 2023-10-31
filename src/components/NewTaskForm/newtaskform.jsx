import React, { Component } from "react";
import "./newtaskform.css";

class NewTaskForm extends Component {
  render() {
    return (
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus />
      </header>
    );
  }
}

export default NewTaskForm;
