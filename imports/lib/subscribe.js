import { Meteor } from 'meteor/meteor';
import createHelper  from 'recompose/createHelper';
import { lifecycle } from 'recompose';

const meteorSubscribe = (factory, onReady) => {
  let subscription;

  return lifecycle({
    componentDidMount() {
      let name;
      let options;
      let returnOptions = factory;

      if (typeof subscription === 'function') {
        returnOptions = subscription(this.props);
      }

      if (typeof returnOptions === 'string') {
        name = returnOptions;
      } else if (typeof returnOptions === 'object') {
        name = returnOptions.name;
        options = returnOptions.options;
      }

      subscription = Meteor.subscribe(name, options, onReady);
    },

    componentWillUnmount() {
      subscription.stop();
    }
  });
};

export default createHelper(meteorSubscribe, 'meteorSubscribe');
