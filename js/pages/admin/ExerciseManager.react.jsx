'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Row,Col,ListGroup,Button,Glyphicon} = require('react-bootstrap');

var Actions = require('../../actions/admin/ExerciseManagerActions');
var ConnectToStore = require('../../mixins/ConnectToStore');
var ExerciseManagerStore = require('../../stores/admin/ExerciseManagerStore');
var Forbidden = require('../../components/Forbidden.react');
var ExerciseEditor = require('../../components/admin/ExerciseEditor.react');

function _setEcerciseEditorState(stateChange) {
  var newState = Object.assign({}, this.state.ex.editorState, stateChange);
  Actions.setExerciseEditorState(newState);
}

var ExerciseManager = React.createClass({
  propTypes: {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  },
  mixins: [
    ConnectToStore('ex', ExerciseManagerStore, function(store) {
      return {
        editorState: store.getExerciseEditorState(),
        showAddExercise: store.showAddExercise()
      };
    })
  ],

  render: function() {
    var authorized = this.props.user && this.props.user.auth && this.props.user.auth;
    if(!authorized.manage_exercises){
      return (<Forbidden />);
    }
    return (
      <Row>
        <Col lg={8}>
          <Row>
            <Col lg={10}><h1 className='inline'>Exercises</h1></Col>
            <Col lg={2} className='right'>
                <Button bsSize='medium' onClick={() => Actions.showAddExercise(!this.state.ex.showAddExercise)}><Glyphicon glyph='plus'/></Button>
            </Col>
          </Row>
          <Row><Col lg={12}>
            <ExerciseEditor
                {...this.state.ex.editorState}
                doUpdateExercise={_setEcerciseEditorState.bind(this)}
                show={this.state.ex.showAddExercise}
            />
          </Col></Row>
        </Col>
      </Row>
    );
  }
});

module.exports = ExerciseManager;
