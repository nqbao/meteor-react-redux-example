import React, { Component, PropTypes } from 'react';

// Task component - represents a single item
class Task extends Component {
  render() {
    const taskClassName = this.props.task.checked ? 'checked' : '';

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.props.onDeleted}>
          &times;
        </button>
 
        <input
          type="checkbox"
          checked={this.props.task.checked || false}
          onChange={this.props.onToggled}
        />
 
        <span className="text">{this.props.task.text}</span>
      </li>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  onToggled: PropTypes.func,
  onDeleted: PropTypes.func
};

export default Task;
