import React, { Component, PropTypes } from 'react';

// Task component - represents a single item
export const Task = (props) => {
  const taskClassName = props.task.checked ? 'checked' : '';

  return (
    <li className={taskClassName}>
      <button className='delete' onClick={props.onDeleted}>
        &times;
      </button>

      <input
        type="checkbox"
        checked={props.task.checked || false}
        onChange={props.onToggled}
      />

      <span className="text">
        <strong>{props.task.username}</strong>: {props.task.text}
      </span>
    </li>
  );
};

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  onToggled: PropTypes.func,
  onDeleted: PropTypes.func
};

export default Task;
