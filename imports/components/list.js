import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleTodo, removeTodo, removeAllTasks } from '../actionCreators';
import { getVisibleTodos } from '../store/selectors';

import Task from './task.jsx';
 
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state)
  }
};

const mapDispatchToProps = (dispatch) => ({
  toggleTodo: (id) => dispatch(toggleTodo(id)),
  removeTodo: (id) => dispatch(removeTodo(id)),
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
    return this.props.todos.map((task, i) => (
      <Task 
        key={i} task={task} 
        onToggled={() => this.props.toggleTodo(task._id)}
        onDeleted={() => this.props.removeTodo(task._id)}
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
