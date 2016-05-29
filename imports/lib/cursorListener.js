import { PropTypes } from 'react';
import { Tracker } from 'meteor/tracker';
import { lifecycle, getContext, compose } from 'recompose';
import createHelper  from 'recompose/createHelper';

const subscribeToCursor = (cursor) => {
  return cursor.observe({
    added(item) {
      console.log('added', item);
    },

    changed(item) {
      console.log('changed', item);
    },

    removed(item) {
      console.log('removed', item);
    }
  });
};

const cursorListener = fn => {
  let handler;

  return compose(
    lifecycle({
      componentDidMount() {
        const cursor = fn(this.props);

        handler = subscribeToCursor(cursor);
      },

      componentWillUnmount() {
        handler.stop();
      }
    }),
    getContext({
      store: PropTypes.object
    })
  );
};

export default createHelper(cursorListener, 'cursorListener');
