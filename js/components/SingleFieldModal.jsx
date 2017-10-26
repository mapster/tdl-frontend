import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap';
import TextInput from './TextInput';

const SingleFieldModal = ({label, show, title, value, doUpdate, doCancel, doOk}) => {
  return (
    <Modal show={show} onHide={doCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <TextInput type='text' label={label} value={value || ''} onChange={doUpdate}/>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={doCancel}>Cancel</Button>
        <Button bsStyle='success' onClick={doOk}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
};

SingleFieldModal.propTypes = {
  doUpdate: PropTypes.func.isRequired,
  doCancel: PropTypes.func.isRequired,
  doOk: PropTypes.func.isRequired,
  label: PropTypes.string,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  value: PropTypes.string,
};

export default SingleFieldModal;
