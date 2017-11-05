import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';

import UserProfileForm from '../../components/UserProfileForm';
import {SELECTORS} from '../../reducers';
import * as Action from '../../actions/admin/userManager';

const UserEditor = ({user, feedback, editUserUpdate, saveUser, resetUser}) => (
  <UserProfileForm profile={user} feedback={feedback} saveProfile={saveUser} resetProfile={() => resetUser(user.id)} updateProfile={editUserUpdate}/>
);
UserEditor.propTypes = {
  user: PropTypes.object.isRequired,
  feedback: PropTypes.object.isRequired,
  editUserUpdate: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  resetUser: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({
    user: SELECTORS.userManager.getEditUser(state),
    feedback: SELECTORS.userManager.getEditUserFeedback(state),
  }), {
    editUserUpdate: Action.editUserUpdate,
    saveUser: Action.saveUser,
    resetUser: Action.resetEditUser,
  })
)(UserEditor);