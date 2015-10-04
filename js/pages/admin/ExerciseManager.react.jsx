'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Row,Col,ListGroup,ListGroupItem,Button,ButtonGroup,Glyphicon} = require('react-bootstrap');

var Actions = require('../../actions/admin/ExerciseManagerActions');
var ConnectToStore = require('../../mixins/ConnectToStore');
var ExerciseEditor = require('../../components/admin/ExerciseEditor.react');
var ExerciseManagerStore = require('../../stores/admin/ExerciseManagerStore');
var Forbidden = require('../../components/Forbidden.react');

var ExerciseManager = React.createClass({
  propTypes: {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  },
  mixins: [
    ConnectToStore('ex', ExerciseManagerStore, function(store) {
      return {
        editorState: store.getExerciseEditorState(),
        exercises: store.getExercises()
      };
    })
  ],

  render: function() {
    var authorized = this.props.user && this.props.user.auth && this.props.user.auth;
    if(!authorized.manage_exercises){
      return (<Forbidden />);
    }
    var exercises = this.state.ex.exercises;

    var view;
    if(this.state.ex.editorState.show) {
      view = (
        <ExerciseEditor
            {...this.state.ex.editorState}
            doCreateNewFile={Actions.createNewFile}
            doRenameSourceFile={Actions.renameSourceFile}
            doResetExerciseProperties={Actions.resetExerciseProperties}
            doSaveExerciseProperties={Actions.saveExerciseProperties}
            doSaveSourceFile={Actions.saveSourceFile}
            doSelectSourceFile={Actions.selectSourceFile}
            doSetEditorTab={Actions.setEditorTab}
            doUpdateExerciseProperties={Actions.updateExerciseProperties}
            doUpdateSourceFile={Actions.updateSourceFile}
            doClose={() => Actions.closeEditExercise(this.state.ex.editorState.properties, this.state.ex.editorState.sourceFiles)}
        />
      );
    } else {
      view = (
        <ListGroup>
          {exercises && exercises.map((ex) => (
            <ListGroupItem key={ex.id}>
              <Row>
                <Col lg={9}>{ex.name}</Col>
                <Col lg={3}>
                  <ButtonGroup className='pull-right'>
                    <Button bsSize='small' onClick={() => Actions.editExercise(ex)}><Glyphicon glyph='pencil'/></Button>
                    <Button bsSize='small' onClick={() => Actions.deleteExercise(ex)}><Glyphicon glyph='trash'/></Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      );
    }
    return (
      <Row>
        <Col lg={8}>
          <Row>
            <Col lg={10}><h1 className='inline'>Exercises</h1></Col>
            <Col lg={2} className='right'>
                <Button bsSize='medium' onClick={Actions.createNewExercise}><Glyphicon glyph='plus'/></Button>
            </Col>
          </Row>
          <Row><Col lg={12}>{view}</Col></Row>
        </Col>
      </Row>
    );
  }
});

module.exports = ExerciseManager;
