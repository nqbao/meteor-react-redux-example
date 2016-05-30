function getCollectionByName(name) {
  return global.Meteor.connection._mongo_livedata_collections[name];
}

const meteorMiddleware = store => next => action => {
  const meta = action.meta;
  const payload = action.payload;

  if (meta && meta.meteor) {
    if (meta.meteor.collection) {
      const collection = getCollectionByName(meta.meteor.collection);

      // check if this is a meteor collection action
      if (/REMOVE_/.test(action.type)) {
        collection.remove(payload.id);
      } else if (/ADD_/.test(action.type)) {
        collection.insert(payload);
      }
    }
  }

  return next(action);
};

export default meteorMiddleware;
