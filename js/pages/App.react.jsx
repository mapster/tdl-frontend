'use strict';

var React = require('react');
var {PropTypes} = React;

var ConfirmationActions = require('../actions/ConfirmationActions');
var ConfirmationStore = require('../stores/ConfirmationStore');
var ConnectToStore = require('../mixins/ConnectToStore');
var SessionStore = require('../stores/SessionStore');
var UserStore = require('../stores/UserStore');
var ConfirmationModal = require('../components/ConfirmationModal.react');

var App = React.createClass({
  propTypes: {
    children: PropTypes.node,
    session: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  },
  mixins: [
    ConnectToStore('confirmation', ConfirmationStore, (store) => store.getState()),
    ConnectToStore('session', SessionStore, (store) => store.getSession()),
    ConnectToStore('user', UserStore, (store) => ({user: store.getUser(), auth: store.getAuth()}) )
  ],
  render: function() {
    return (
      <div className='container'>
        {this.props.children && React.cloneElement(this.props.children, {session: this.state.session, user: this.state.user})}
        <ConfirmationModal
            {...this.state.confirmation}
            doCancel={ConfirmationActions.cancel}
            doOk={() => ConfirmationActions.confirm(this.state.confirmation.todoAction)}
        />
      </div>
    );
  }
});

module.exports = App;
