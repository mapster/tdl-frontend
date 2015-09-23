'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Row,Col,ListGroup,Button,Glyphicon,Alert} = require('react-bootstrap');

var Actions = require('../../actions/admin/ExerciseManagerActions');
var ConnectToStore = require('../../mixins/ConnectToStore');
var ExerciseManagerStore = require('../../stores/admin/ExerciseManagerStore');
var Forbidden = require('../../components/Forbidden.react');
var ExerciseEditor = require('../../components/admin/ExerciseEditor.react');
var ResponseConstants = require('../../constants/ResponseConstants');
var ExercisesConstants = require('../../constants/admin/ExercisesConstants');

var ExerciseManager = React.createClass({
  propTypes: {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  },
  mixins: [
    ConnectToStore('ex', ExerciseManagerStore, function(store) {
      return {
        alert: store.getAlert(),
        editorState: store.getExerciseEditorState(),
        showAddExercise: store.showAddExercise()
      };
    })
  ],
  _setExerciseEditorState: function (stateChange) {
    var newState = Object.assign({}, this.state.ex.editorState, stateChange);
    Actions.setExerciseEditorState(newState);
  },

  render: function() {
    var authorized = this.props.user && this.props.user.auth && this.props.user.auth;
    if(!authorized.manage_exercises){
      return (<Forbidden />);
    }
    var alert = this.state.ex.alert;

    return (
      <Row>
        <Col lg={8}>
          <Row>
            <Col lg={10}><h1 className='inline'>Exercises</h1></Col>
            <Col lg={2} className='right'>
                <Button bsSize='medium' onClick={() => Actions.showAddExercise(!this.state.ex.showAddExercise)}><Glyphicon glyph='plus'/></Button>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              {alert && (<Alert bsStyle={alert.type} onDismiss={Actions.dismissAlert}>{alert.text}</Alert>)}
            </Col>
          </Row>
          <Row><Col lg={12}>
            <ExerciseEditor
                {...this.state.ex.editorState}
                doSaveExercise={(exercise) => Actions.addExercise(exercise)}
                doUpdateExercise={this._setExerciseEditorState}
                show={this.state.ex.showAddExercise}
            />
          </Col></Row>
        </Col>
      </Row>
    );
  }
});

module.exports = ExerciseManager;
