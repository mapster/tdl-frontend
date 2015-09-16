'use strict';

var React = require('react');
var {Row,Col,ListGroup,ListGroupItem} = require('react-bootstrap');

var UsersStore = require('../../stores/admin/UsersStore');
var ConnectToStore = require('../../mixins/ConnectToStore');

var UserAdmin = React.createClass({
  mixins: [
    ConnectToStore('users', UsersStore, function(store){return store.getUsers();})
  ],
  render: function() {
    var users = this.state && this.state.users;
    return (
      <Row>
        <Col lg={12}>
          <h1>Users</h1>
          <ListGroup>
            {users && users.map((user) => (<ListGroupItem key={user.id}>{user.name}</ListGroupItem>))}
          </ListGroup>
        </Col>
      </Row>
    );
  }
});

module.exports = UserAdmin;
