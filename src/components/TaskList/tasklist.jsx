import React from 'react';
import propTypes from 'prop-types';
import Task from '../Task';
import './tasklist.css';

const TaskList = ({ todos, onDelete, onChanceStatus, onChangeLabel }) => {
  const items = todos.map((item) => {
    const { id, label, done, display } = item;
    if (!display) return null;
    return (
      <Task
        label={label}
        key={id}
        done={done}
        onDelete={() => onDelete(id)}
        onChanceStatus={() => onChanceStatus(id)}
        onChangeLabel={(label) => onChangeLabel(id, label)}
      />
    );
  });
  return <ul className="todo-list">{items}</ul>;
};

TaskList.defaultProps = {
  todos: [],
  onDelete: () => {},
  onChanceStatus: () => {},
  onChangeLabel: () => {},
};

TaskList.propTypes = {
  todos: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string,
      done: propTypes.bool,
      display: propTypes.bool,
      id: propTypes.any,
    })
  ),
  onDelete: propTypes.func,
  onChanceStatus: propTypes.func,
  onChangeLabel: propTypes.func,
};

export default TaskList;
