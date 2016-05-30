import { PropTypes } from 'react';
import { lifecycle } from 'recompose';
import createHelper  from 'recompose/createHelper';
import { METEOR_ITEM_ADDED, METEOR_ITEM_CHANGED, METEOR_ITEM_REMOVED} from './constants';

const subscribeToCursor = (cursor, dispatch) => {
  const meta = {
    collection: cursor.collection.name
  };

  return cursor.observe({
    added(item) {
      dispatch({
        type: METEOR_ITEM_ADDED,
        payload: item,
        meta
      });
    },

    changed(item) {
      dispatch({
        type: METEOR_ITEM_CHANGED,
        payload: item,
        meta
      });
    },

    removed(item) {
      dispatch({
        type: METEOR_ITEM_REMOVED,
        payload: item,
        meta
      });
    }
  });
};

const cursorListener = fn => BaseComponent => {
  let handler;
  const component = class extends BaseComponent {
    componentDidMount() {
      const cursor = fn(this.props);

      handler = subscribeToCursor(cursor, this.context.store.dispatch);
    }

    componentWillUnmount() {
      handler.stop();
    }
  };

  component.contextTypes = {
    store: PropTypes.object
  };

  return component;
};

export default createHelper(cursorListener, 'cursorListener');
