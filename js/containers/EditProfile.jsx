import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Row, Col, Button} from 'react-bootstrap';

import TextInput from '../components/TextInput';
import * as Action from '../actions/editProfile';
import {SELECTORS} from '../reducers';

const UserProfileForm = ({profile, feedback, updateProfile, resetProfile, saveProfile}) => {
  const createUpdater = field => {
    return (value) => updateProfile({
        ...profile,
        [field]: value,
      }
    );
  };
  const getFeedback = (field) => feedback[field] || '';

  const {email, name, password, password_confirmation} = profile;
  return (
    <div>
      <Row>
        <Col lg={8}>
          <TextInput label='Email' type='email' feedback={getFeedback('email')} value={email || ''} onChange={createUpdater('email')}/>
          <TextInput label='Name' value={name || ''} feedback={getFeedback('name')} onChange={createUpdater('name')}/>
          <TextInput label='Password' type='password' feedback={getFeedback('password')} value={password || ''} onChange={createUpdater('password')}/>
          <TextInput label='Confirm password' type='password' feedback={getFeedback('password_confirmation')} value={password_confirmation || ''}
                     onChange={createUpdater('password_confirmation')}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={resetProfile}>Reset</Button>
          <Button onClick={() => saveProfile(profile)}>Save</Button>
        </Col>
      </Row>
    </div>
  );
};
UserProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  feedback: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  resetProfile: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
};

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