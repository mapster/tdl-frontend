var React = require('react');
var PropTypes = React.PropTypes;
var {Label,ListGroup,ListGroupItem,Row,Col,ButtonGroup,Button,OverlayTrigger,Tooltip,Glyphicon} = require('react-bootstrap');

var UserList = React.createClass({
  propTypes: {
    doDeleteUser: PropTypes.func.isRequired,
    doDismissUserAlert: PropTypes.func.isRequired,
    doEditUser: PropTypes.func.isRequired,
    doEditUserAuths: PropTypes.func.isRequired,
    showAuthsButton: PropTypes.bool.isRequired,
    userAlerts: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
  },
  shouldComponentUpdate: function(newProps) {
    var {users, userAlerts} = this.props;
    return users !== newProps.users || userAlerts !== newProps.userAlerts;
  },

  render: function() {
    var {showAuthsButton, users, userAlerts} = this.props;
    return (
      <ListGroup>
        {users.map((user) => (
          <ListGroupItem key={user.id}>
            <Row>
              <Col lg={7}><span>{user.name}</span></Col>
              <Col lg={2}>
                {userAlerts[user.id] && (
                  <Label bsStyle={userAlerts[user.id].type} onClick={() => this.props.doDismissUserAlert(user.id)}>
                    {userAlerts[user.id].text}
                  </Label>
                )}
              </Col>
              <Col lg={3}>
                <ButtonGroup className='pull-right'>
                  <OverlayTrigger placement='left' overlay={(<Tooltip id='edit-user-tp'>Edit user</Tooltip>)}>
                    <Button bsSize='small' onClick={() => this.props.doEditUser(user)}><Glyphicon glyph='pencil'/></Button>
                  </OverlayTrigger>
                  {showAuthsButton &&
                    (<OverlayTrigger placement='top' overlay={(<Tooltip id='edit-uset-auth-tp'>Edit authorizations</Tooltip>)}>
                      <Button bsSize='small' onClick={() => this.props.doEditUserAuths(user.id)}><Glyphicon glyph='lock'/></Button>
                    </OverlayTrigger>)
                  }
                  <OverlayTrigger placement='right' overlay={(<Tooltip id='delete-user-tp'>Delete user</Tooltip>)}>
                    <Button bsSize='small' onClick={() => this.props.doDeleteUser(user)}><Glyphicon glyph='trash' /></Button>
                  </OverlayTrigger>
                </ButtonGroup>
              </Col>
            </Row>
          </ListGroupItem>))
        }
      </ListGroup>
    );
  }

});

module.exports = UserList;
