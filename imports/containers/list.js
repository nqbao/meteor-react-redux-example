import React  from 'react';
import { connect } from 'react-redux'
import { toggleTask, removeTask, removeAllTasks } from '../actionCreators';
import { getVisibleTodos } from '../store/selectors';
import TaskList from '../components/list';

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

const enhancer = (
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(TaskList);
