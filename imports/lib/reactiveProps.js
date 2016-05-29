import { Tracker } from 'meteor/tracker';
import createElement from 'recompose/createElement'
import createHelper  from 'recompose/createHelper';

const reactiveProps = (fn) => BaseComponent =>
  class extends BaseComponent {
    componentDidMount() {
      if (super.componentDidMount) super.componentDidMount();

      this._tracker = Tracker.autorun(() => {
        this.computedProps = fn(this.props);
        this.forceUpdate();
      });
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) super.componentWillUnmount();

      this._tracker.stop();
    }

    render() {
      return createElement(BaseComponent, {
        ...this.props,
        ...this.computedProps
      });
    }
  };

export default createHelper(reactiveProps, 'reactiveProps');
