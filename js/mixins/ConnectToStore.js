'use strict';

function _onChange(name, callback) {
  var stateChange = {};
  stateChange[name] = callback();
  this.setState(stateChange);
}

function buildMixin(name, store, getState) {
  function getStateFromStore() {
    return getState(store);
  }
  return {
    getInitialState: function() {
      var state = {};
      state[name] = getStateFromStore(store);
      return state;
    },
    componentDidMount: function() {
      this._listener = _onChange.bind(this, name, getStateFromStore);
      store.addChangeListener(this._listener);
    },
    componentWillUnmount: function() {
      store.removeChangeListener(this._listeners.session);
    }
  };
}

module.exports = buildMixin;
