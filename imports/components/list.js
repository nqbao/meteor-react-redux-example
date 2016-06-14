import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleTask, removeTask, removeAllTasks } from '../actionCreators';
import { getVisibleTodos } from '../store/selectors';

import Task from './task.jsx';

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state)
  }
};

const mapDispatchToProps = (dispatch) => ({
  toggleTask: (id) => dispatch(toggleTask(id)),
  removeTask: (id) => dispatch(removeTask(id)),
  removeAllTasks: () => dispatch(removeAllTasks()),
});

const EmptyTaskPlaceHolder = () => (<ul><li><em>There is no task yet.</em></li></ul>);

const RemoveAllTasks = (props) => (
  <div {...props} className='remove-all-tasks'>
    Remove all tasks
  </div>
);

class TaskList extends Component {
  renderTasks() {
    const { todos, toggleTask, removeTask } = this.props;

    return todos.map((task, i) => (
      <Task
        key={i} task={task}
        onToggled={() => toggleTask(task._id)}
        onDeleted={() => removeTask(task._id)}
        />
    ));
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.todos.length ?
            this.renderTasks() :
            <EmptyTaskPlaceHolder />
          }
        </ul>
        {this.props.todos.length > 0 && <RemoveAllTasks onClick={this.props.removeAllTasks} />}
      </div>
    );
  }
}

const enhancer = (
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(TaskList);
