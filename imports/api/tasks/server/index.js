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
  'removeAllTasks'() {
    return Tasks.remove({});
  }
});