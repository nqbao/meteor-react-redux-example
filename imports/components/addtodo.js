import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux'
import { addTask } from '../actionCreators';

class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { text: '' };
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { addTask } = this.props;

    addTask(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          value={this.state.text}
          placeholder="Type to add new tasks"
          onChange={this.handleTextChange.bind(this)}
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
