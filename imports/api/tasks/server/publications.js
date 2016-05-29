import { Meteor } from 'meteor/meteor';
import Tasks from '../collection';

Meteor.publish('todos', () => Tasks.find({}));
