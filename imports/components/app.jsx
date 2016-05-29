import React, { Component } from 'react';
import { compose } from 'recompose';
import meteorSubscribe from '../lib/subscribe';
import { connect } from 'react-redux'
import TaskList from './list';
import { addTodo, toggleVisibilityFilter } from '../actionCreators';
import Tasks from '../api/tasks/collection';
import cursorListener from '../lib/cursorListener';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderTasks() {
    return this.getTasks().map((task, i) => (
      <Task key={i} task={task} />
    ));
  }

  handleSubmit(e) {
    const todo = this.refs.textInput.value;
    this.props.addTodo(todo);

    e.stopPropagation();
    e.preventDefault();
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

          <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
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
    dispatch=> ({
      addTodo: (text) => dispatch(addTodo(text)),
      toggleVisibilityFilter: () => dispatch(toggleVisibilityFilter())
    })
  ),
  meteorSubscribe('todos')
);

export default enhancer(App);
