import React  from 'react';
import { getVisibleTodos } from '../store/selectors';
import Task from './task.js';

const EmptyTaskPlaceHolder = () => (<ul><li><em>There is no task yet.</em></li></ul>);

const RemoveAllTasks = (props) => (
  <div {...props} className='remove-all-tasks'>
    Remove all tasks
  </div>
);

class TaskList extends React.Component {
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

export default TaskList;
