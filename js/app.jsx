import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';
import configureStore from './store/configureStore';
import sessionEffects from './effects/session';

const store = configureStore({});
store.runSaga(sessionEffects);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('app')
);


// // Configure Store and Root component
// const store = configureStore(storage.get('weighty_beer') || {});
// if (!store.getState().navigation.transitioning) {
//   if (!store.getState().navigation.transitioning) {
//     ReactDOM.render(
//       <Root store={store} />,
//       document.getElementById('app')
//     );
//   }
// }
//
