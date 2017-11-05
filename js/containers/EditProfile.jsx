import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import UserProfileForm from '../components/UserProfileForm';
import * as Action from '../actions/editProfile';
import {SELECTORS} from '../reducers';

const EditProfile = ({profile, feedback, updateProfile, resetProfile, saveProfile}) => (
  <Row>
    <Col lg={1}/>
    <Col lg={11}>
      <Row><Col><h1>Edit profile</h1></Col></Row>
      <UserProfileForm profile={profile} feedback={feedback} updateProfile={updateProfile} resetProfile={resetProfile}
                       saveProfile={saveProfile}/>
    </Col>
  </Row>
);
EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  feedback: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  resetProfile: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({
    profile: SELECTORS.editProfile.getProfile(state),
    feedback: SELECTORS.editProfile.getProfileFeedback(state),
  }), {
    updateProfile: Action.updateProfile,
    resetProfile: Action.resetProfile,
    saveProfile: Action.saveProfile,
  })
)(EditProfile);