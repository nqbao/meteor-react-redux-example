import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux'
import { toggleVisibilityFilter, removeAllTasks } from '../actionCreators';
import Tasks from '../api/tasks/collection';
import meteorSubscribe from '../lib/subscribe'
import cursorListener from '../lib/cursorListener';
import reactiveProps from '../lib/reactiveProps';

import TaskListContainer from './list';

import AccountsUIWrapper from '../components/accounts-ui-wrapper';
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
          <AccountsUIWrapper />
          {this.props.user && <AddTaskForm />}
        </header>
        {this.props.user && <TaskListContainer />}
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
  reactiveProps(() => ({
    user: Meteor.user()
  })),
  meteorSubscribe('todos'), // XXX: this has some problem when placing reactiveProps after subscribe
  cursorListener(() => Tasks.find())
);

export default enhancer(App);
