import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory, Link} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

const Test = () => {
  return (
    <div>
      <h1>dude</h1>
      <Link to="a">a</Link>
    </div>
  );
};

const A = () => {
  return (
    <div>
      <h1>A yeah</h1>
      <Link to="/">test</Link>
    </div>
  );
};


export default class RootDev extends React.Component {
  render() {
    const {store} = this.props;
    const history = syncHistoryWithStore(browserHistory, store);

    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Test} />
          <Route path="a" component={A} />
        </Router>
      </Provider>
    );
  }
}
RootDev.propTypes = {
  store: PropTypes.object
};
