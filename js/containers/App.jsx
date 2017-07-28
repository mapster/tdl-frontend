import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';

import * as SessionActions from '../actions/session';

class App extends React.Component {

  constructor(props) {
    super(props);
    console.log('hei');
    props.getSession();
  }

  // TODO: fix the remaining connectToStore
  // mixins: [
  //   ConnectToStore('confirmation', ConfirmationStore, (store) => store.getState()),
  //   ConnectToStore('user', UserStore, (store) => ({user: store.getUser(), auth: store.getAuth()}) )
  // ],
  // TODO: fix confirmation modal
  /*
    <ConfirmationModal
    {...this.state.confirmation}
    doCancel={ConfirmationActions.cancel}
    doOk={() => ConfirmationActions.confirm(this.state.confirmation)}
    />
  */

  // TODO: add notification view
  //   <Row>
  //     <Col lg={12}><NotificationView /></Col>
  //   </Row>
  //   <Row>
  //   <Col lg={12}>
  //  {this.props.children}
  // </Col>
  //  </Row>
  render() {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  getSession: PropTypes.func.isRequired,
};

export default compose(
  connect(
    state => ({}),
    {
      getSession: SessionActions.getSession,
    }
  )
)(App);