import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Jumbotron} from 'react-bootstrap';

import UserProfileForm from '../components/UserProfileForm';
import {SELECTORS} from '../reducers';
import * as Action from '../actions/register';

const Register = ({registration, feedback, updateRegistration, resetRegistration, submitRegistration}) => (
  <Jumbotron>
    <h1>Register for Test Driven Learning</h1>
    <UserProfileForm profile={registration}
                     feedback={feedback}
                     updateProfile={updateRegistration}
                     resetProfile={resetRegistration}
                     saveProfile={submitRegistration}
    />
  </Jumbotron>
);
Register.propTypes = {
  registration: PropTypes.object.isRequired,
  feedback: PropTypes.object.isRequired,
  updateRegistration: PropTypes.func.isRequired,
  resetRegistration: PropTypes.func.isRequired,
  submitRegistration: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({
    registration: SELECTORS.register.getRegistration(state),
    feedback: SELECTORS.register.getFeedback(state),
  }), {
    updateRegistration: Action.updateRegistration,
    resetRegistration: Action.resetRegistration,
    submitRegistration: Action.submitRegistration,
  })
)(Register);
