import Tasks from '../collection';
import './publications';

// Temporary enables all permissions
Tasks.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});
