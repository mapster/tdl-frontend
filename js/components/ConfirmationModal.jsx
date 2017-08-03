import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap';

const ConfirmationModal = ({show, title, text, confirmButtonStyle, decline, confirm}) => (
  <Modal show={show} onHide={decline}>
    <Modal.Header closeButton>
      <Modal.Title>{title || 'Confirm'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{text}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={decline}>Decline</Button>
      <Button bsStyle={confirmButtonStyle || 'default'} onClick={confirm}>OK</Button>
    </Modal.Footer>
  </Modal>
);
ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  confirmButtonStyle: PropTypes.string,
  decline: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
