import { PropTypes } from 'react';
import { lifecycle } from 'recompose';
import createHelper  from 'recompose/createHelper';
import { METEOR_ITEM_ADDED, METEOR_ITEM_CHANGED, METEOR_ITEM_REMOVED} from './constants';

export const subscribeToCursor = (cursor, dispatch) => {
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

// TODO: we can pass extra metadata so reducer can work with multiple cursors of the same collection
const cursorListener = fn => BaseComponent => {
  let handler;
  const component = class extends BaseComponent {
    componentDidMount() {
      if (super.componentDidMount) super.componentDidMount();
      const cursor = fn(this.props);

      handler = subscribeToCursor(cursor, this.context.store.dispatch);
    }

    componentWillUnmount() {
      if (super.componentDidMount) super.componentDidMount();

      handler.stop();
    }
  };

  component.contextTypes = {
    store: PropTypes.object
  };

  return component;
};

export default createHelper(cursorListener, 'cursorListener');
