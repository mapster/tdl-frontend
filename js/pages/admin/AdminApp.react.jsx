'use strict';

var React = require('react');
var {PropTypes} = React;
var {Grid,Row,Col} = require('react-bootstrap');

var Header = require('../../components/Header.react');

var AdminApp = React.createClass({
  propTypes: {
    children: PropTypes.node,
    session: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  },
  render: function() {
    var menu = [{href: '#/', text: 'JavaTDL'}];
    var auth = this.props.user && this.props.user.auth;

    if(auth){
      Object.keys(auth).map((authType) => {
          var isAuth = auth[authType];
          if(isAuth) {
            switch (authType) {
              case 'manage_exercises':
                menu.push({href: '#/admin/exercises', text: 'Exercises'});
                break;
              case 'manage_users':
                menu.push({href: '#/admin/users', text: 'Users'});
                break;
              default:
            }
          }
        });
    }

    return (
      <div className='container'>
        <Grid>
          <Row>
            <Col lg={12}>
              <Header title='JavaTDL Admin' menu={menu} auth={auth} session={this.props.session} />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              {this.props.children && React.cloneElement(this.props.children, {user: this.props.user})}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

module.exports = AdminApp;
