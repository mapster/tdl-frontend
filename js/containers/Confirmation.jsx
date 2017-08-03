import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import ConfirmationModal from '../components/ConfirmationModal';
import {SELECTORS} from '../reducers';
import * as Action from '../actions/confirmation';

const Confirmation = ({description, action, decline, confirm}) => (
  <ConfirmationModal {...description} decline={decline} confirm={() => confirm(action)}/>
);
Confirmation.propTypes = {
  description: PropTypes.object.isRequired,
  action: PropTypes.object,
  decline: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default compose(
  connect(
    (state) => ({
      description: SELECTORS.confirmation.getDescription(state),
      action: SELECTORS.confirmation.getAction(state),
    }),
    {
      decline: Action.decline,
      confirm: Action.confirm,
    }
  )
)(Confirmation);
