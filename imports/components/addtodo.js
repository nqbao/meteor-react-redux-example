import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux'
import { addTodo } from '../actionCreators';

class AddTodoForm extends React.Component {

  handleSubmit(e) {
    this.props.addTodo(this.refs.textInput.value);

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
    addTodo: (text) => dispatch(addTodo(text)),
  }))
);

export default enhancer(AddTodoForm);
