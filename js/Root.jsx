import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

const Test = () => {
  return <h1>dude</h1>;
};


export default class RootDev extends React.Component {
  render() {
    const {store} = this.props;
    const history = syncHistoryWithStore(browserHistory, store);

    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Test} />
        </Router>
      </Provider>
    );
  }
}
RootDev.propTypes = {
  store: PropTypes.object
};
