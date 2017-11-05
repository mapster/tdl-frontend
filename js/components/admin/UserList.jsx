import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, Glyphicon, Table, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import Authorizations from '../../constants/authorizations';

const AuthorizationsList = ({user_authorization, saveAuths}) => {
  const authorizations = Object.keys(Authorizations).filter(auth => user_authorization[auth] === true);
  const doSaveAuths = (auth) => {
    const newAuths = {...user_authorization};
    newAuths[auth] = !newAuths[auth];
    saveAuths(newAuths);
  };

  return (
    <ToggleButtonGroup type='checkbox' value={authorizations} onChange={doSaveAuths}>
      {Object.keys(Authorizations).map(auth => (
        <ToggleButton key={auth} onClick={() => doSaveAuths(auth)} value={auth}>{Authorizations[auth]}</ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
AuthorizationsList.propTypes = {
  user_authorization: PropTypes.object.isRequired,
  saveAuths: PropTypes.func.isRequired,
};

const UserList = ({users, saveUserAuthorizations, doEditUser}) => (
  <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Authorizations</th>
        <th></th>
      </tr>
    </thead>
    <tbody>{users.map(user => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <AuthorizationsList saveAuths={saveUserAuthorizations} user_authorization={user.user_authorization} />
        </td>
        <td>
          <ButtonGroup className='pull-right'>
            <Button bsSize='small' onClick={() => doEditUser(user.id)}><Glyphicon glyph='pencil'/></Button>
            <Button bsSize='small' onClick={() => {}}><Glyphicon glyph='trash'/></Button>
          </ButtonGroup>
        </td>
      </tr>
    ))}</tbody>
  </Table>
);
UserList.propTypes = {
  users: PropTypes.array.isRequired,
  saveUserAuthorizations: PropTypes.func.isRequired,
  doEditUser: PropTypes.func.isRequired,
};

export default UserList;