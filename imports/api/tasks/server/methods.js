import { Meteor } from 'meteor/meteor';
import Tasks from '../collection';
import { ADD_TASK, REMOVE_TASK, TOGGLE_TASK, REMOVE_ALL_TASKS } from '../constants';

Meteor.methods({
  [ADD_TASK]({ text }) {
    return Tasks.insert({
      text,
      createdAt: new Date()
    });
  },

  [REMOVE_TASK]({ id }) {
    return Tasks.remove({ _id: id });
  },

  [TOGGLE_TASK]({id}) {
    const task = Tasks.findOne(id);

    if (task) {
      return Tasks.update({ _id: id }, { $set: { checked: !task.checked } })
    }
  },

  [REMOVE_ALL_TASKS]() {
    return Tasks.remove({});
  },
});
