import React, { Component } from "react";
import Footer from "./components/Footer";
import TaskList from "./components/TaskList/tasklist";
import NewTaskForm from "./components/NewTaskForm";
import "./app.css";

class App extends Component {
  render() {
    return (
      <section className="todoapp">
				<NewTaskForm />
				<section className="main">
				<TaskList />
        <Footer /> 
				</section>
      </section>
    );
  }
}

export default App;
