var AppDispatcher = require('../dispatcher/AppDispatcher');

AppDispatcher.register(function(payload) {
  var source = 'unknown source';
  switch (payload.source) {
    case AppDispatcher.STORE_REFRESH:
      source = 'refresh';
      break;
    case AppDispatcher.VIEW_ACTION:
      source = 'view';
      break;
  }
  console.log(source + ': ' + payload.action.actionType);
});
