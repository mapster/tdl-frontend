'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Row,Col,ListGroup,ListGroupItem,Button,Glyphicon,Alert} = require('react-bootstrap');

var Actions = require('../../actions/admin/ExerciseManagerActions');
var ConnectToStore = require('../../mixins/ConnectToStore');
var ExerciseEditor = require('../../components/admin/ExerciseEditor.react');
var ExerciseManagerStore = require('../../stores/admin/ExerciseManagerStore');
var ExerciseManagerActions = require('../../actions/admin/ExerciseManagerActions');
var Forbidden = require('../../components/Forbidden.react');

var ExerciseManager = React.createClass({
  propTypes: {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  },
  mixins: [
    ConnectToStore('ex', ExerciseManagerStore, function(store) {
      return {
        alert: store.getAlert(),
        editorState: store.getExerciseEditorState(),
        exercises: store.getExercises(),
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
    var exercises = this.state.ex.exercises;

    if(this.state.ex.editorState) {
      return (
        <ExerciseEditor
            {...this.state.ex.editorState}
            doSaveExercise={(id, exercise) => Actions.saveExercise(id, exercise)}
            doUpdateExercise={this._setExerciseEditorState}
            show
        />
      );
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
          <Row>
            <Col lg={8}>
              {alert && (<Alert bsStyle={alert.type} onDismiss={Actions.dismissAlert}>{alert.text}</Alert>)}
            </Col>
          </Row>
          <Row><Col lg={12}>
            <ListGroup>
              {exercises && exercises.map((ex) => (
                <ListGroupItem key={ex.id}>
                  <Row>
                    <Col lg={9}>{ex.name}</Col>
                    <Col lg={3}>
                      <Button bsSize='small' onClick={() => ExerciseManagerActions.editExercise(ex)}><Glyphicon glyph='pencil'/></Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col></Row>
        </Col>
      </Row>
    );
  }
});

module.exports = ExerciseManager;
