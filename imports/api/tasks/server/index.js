import { Meteor } from 'meteor/meteor';
import Tasks from '../collection';
import './publications';

// Temporary enables all permissions
Tasks.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Meteor.methods({
  'addTask'({text}) {
    return Tasks.insert({
      text,
      createdAt: new Date()
    });
  },
  'removeTask'({id}) {
    return Tasks.remove({ _id: id });
  },
  'removeAllTasks'() {
    return Tasks.remove({});
  },
  'toggleTask'({id}) {
    const task = Tasks.findOne(id);

    if (task) {
      return Tasks.update({ _id: id }, { $set: { checked: !task.checked } })
    }
  }
});