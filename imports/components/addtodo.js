import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux'
import { addTask } from '../actionCreators';

class AddTaskForm extends React.Component {
  handleSubmit(e) {
    this.props.addTask(this.refs.textInput.value);

    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    return (
      <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          ref="textInput"
          placeholder="Type to add new tasks"
        />
      </form>
    );
  }
}

const enhancer = compose(
  connect(null, dispatch=> ({
    addTask: (text) => dispatch(addTask(text)),
  }))
);

export default enhancer(AddTaskForm);
