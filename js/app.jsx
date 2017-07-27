import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';
import configureStore from './store/configureStore';

const store = configureStore({});

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('app')
);


// ReactDOM.render(<Router history={hashHistory} routes={routes}/>, document.getElementById('app-contents'));







// import configureStore from './store/configureStore';
// import storage from './libs/storage';
//
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
// // Setup database connections
// setTimeout(() => {
//   store.dispatch(startListeningToBrewsData());
//   store.dispatch(startListeningToWeightHub());
//   store.dispatch(startListeningToTapsData());
//   store.dispatch(startListeningToImagesData());
// });
//
// // Setup hash (#) navigation
// const onHashChange = () => {
//   store.dispatch(navigationComplete());
// }
// window.addEventListener('hashchange', onHashChange , false);
// onHashChange();
