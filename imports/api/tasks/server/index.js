import { Meteor } from 'meteor/meteor';
import Tasks from '../collection';
import './publications';
import './methods';

// Temporary enables all permissions
Tasks.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});
