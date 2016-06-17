import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux'
import { toggleVisibilityFilter, removeAllTasks } from '../actionCreators';
import Tasks from '../api/tasks/collection';
import meteorSubscribe from '../lib/subscribe'
import cursorListener from '../lib/cursorListener';

import TaskListContainer from './list';
import TaskList from '../components/list';
import AddTaskForm from '../components/addtodo';

class App extends Component {
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
          <AddTaskForm />
        </header>
        <TaskListContainer />
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
