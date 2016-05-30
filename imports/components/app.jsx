import React, { Component } from 'react';
import { compose } from 'recompose';
import meteorSubscribe from '../lib/subscribe';
import { connect } from 'react-redux'
import { toggleVisibilityFilter } from '../actionCreators';
import Tasks from '../api/tasks/collection';
import cursorListener from '../lib/cursorListener';

import TaskList from './list';
import AddTodoForm from './addtodo';

class App extends Component {
  renderTasks() {
    return this.getTasks().map((task, i) => (
      <Task key={i} task={task} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              defaultChecked={this.props.visibilityFilter}
              onClick={this.props.toggleVisibilityFilter}
            />
            Hide Completed Tasks
          </label>

          <AddTodoForm />
        </header>

        <TaskList />
      </div>
    );
  }
}

const enhancer = compose(
  connect(
    state => ({
      visibilityFilter: state.visibilityFilter === 'NONE'
    }),
    dispatch => ({
      toggleVisibilityFilter: () => dispatch(toggleVisibilityFilter())
    })
  ),
  meteorSubscribe('todos'),
  cursorListener(() => Tasks.find())
);

export default enhancer(App);
