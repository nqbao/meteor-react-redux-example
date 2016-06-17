# meteor-react-redux-example

This is a sample TODO app written in Meteor, React, and Redux. I start from tutorial app from Meteor and continue
the integration from that, so most of the UI is from [here](https://www.meteor.com/tutorials/react/creating-an-app).
I use this as a sandbox to explore the possibility to integrate these frameworks together.

If you have any question or feedback, feel free to submit a PR or open an issue.

# Goal

The goal of this exploration is to propose an integration approach that:

  * Follow strictly [three principles](http://redux.js.org/docs/introduction/ThreePrinciples.html) from Redux.
  * Provide a clear guideline how to use Meteor Collection, Subscription and Method.
  * Embrace best practices from all frameworks.

In general, we will place all side-effects call to redux actions using **react-thunk**. We try to avoid using unnecessary
middleware or other libraries, unless it is really necessary.

# TODOs

* Accounts
* SimpleSchema

# Meteor Method

Meteor Method can be considered as normal server-side call, and therefore is side-effect. We can wrap it inside an
action and optionally dispatch call result.

``` javascript
export const removeAllTasks = () => (dispatch) => {
  dispatch({ type: 'REMOVE_ALL_TASK_REQUEST' });
  Meteor.call('removeAllTasks', (error, result) => {
    if (err) dispatch({ type: 'REMOVE_ALL_TASK_ERROR', payload: error });
    else dispatch({ type: 'REMOVE_ALL_TASK_SUCCESS', payload: result });
  });
};
```

There is also a helper function to quickly create a meteor action call:

``` javascript
import { createMeteorAction } from './libs/meteorActions';
 
export removeAllTasks = createMeteorAction('removeAllTasks');
```

## Collections

### Subscription

We can directly subscribe / unsubscribe to a subscription in an action.

``` javascript
export const someAction = (id) => (dispatch) => {
  // ...
  Meteor.subscribe('publicationName', { id });
  // ...
};
```

If we can determine if the lifecycle of a subscription is controlled by a component, we can enhance it with **meteorSubscribe**
high-order component.

``` javascript
import meteorSubscribe from 'path/to/imports/lib/subscribe';

export const enhancer = compose(
  meteorSubscribe(props => ({ name: 'publicationName', options: { id: props.id } })),
  otherEnhancer
);

export default enhancer(YourComponent);
```

When YourComponent is mounted, it will automatically subscribe to the publication and unsubscribe when the component is removed.

### Fetching Data

One of the coolest feature of Meteor is Reactive Collection. But since we don't use Blade we will have to manage the
update by ourselves. The approach is similar to subscription, we use a Container component to manage the
lifecycle of the cursor.

``` javascript
import cursorListener from 'path/to/imports/lib/cursorListener';

class YourComponent extends React.Component {
  // ...
}

export const enhancer = compose(
  cursorListener(props => YourCollection.find({ someCondition: props.someValue }))
);

export default enhancer(YourComponent);
```

When YourComponent is mounted, it will listen to the cursor and start dispatching actions when there are changes. Then
in your reducers, you can capture the change into store as below:

``` javascript
import { makeCursorReducer } from '../lib/cursorReducer';
import Tasks from 'path/to/imports/api/yourCollection';
import { combineReducers } from 'redux' ;

const tasks = makeCursorReducer(tasks);

export default combineReducers({
  // ....
  tasks
});
```

### Create / Update / Delete

Collection mutators are implemented as methods. When we call any of these functions on client side, we're actually 
invoking a method. For simplicity, we can wrap all collection mutations into methods. It is also better for security reason.
There should be no direct manipulation at client side at all.

On server side:

``` javascript
Meteor.methods({
  'addTask'({ text }) {
    return Tasks.insert({ text });
  },

  'toggleTask'({ id }) {
    const task = Tasks.findOne(id);
    
    if (task) {
      return Tasks.update({ _id: id }, { $set: { checked: !task.checked } })
    }
  }
});
```

On client side:

``` javascript
export const addTask = (text) => () => {
  Meteor.call('addTask', { text });
};

export const toggleTask = (id) => () => {
  Meteor.call('toggleTask', { id });
};
```

# FAQ

- Why don't we use createContainer from [meteor-react-data](http://guide.meteor.com/react.html#data) to fill data from Collection into Component?
Because we want to enforce uni-directional dataflow, and Component will receive data only from Redux store. 

- When should we use Component state and when to use redux store?
In general, we should use redux store as much as we can. But sometime it may be too much to store everything inside the redux store. 
If the data is only used within the Component then we can use it as component state. But if the data will be used by another component we should
store the data in redux store instead.

# References

  * http://guide.meteor.com/react.html
  * https://www.meteor.com/tutorials/react/creating-an-app
  * https://medium.com/modern-user-interfaces/how-we-redux-part-1-introduction-18a24c3b7efe
  * https://subvisual.co/blog/posts/79-a-bridge-between-redux-and-meteor
  * https://atmospherejs.com/meteor/react-meteor-data
  * https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.ry4qjvhng
  * https://github.com/acdlite/flux-standard-action
