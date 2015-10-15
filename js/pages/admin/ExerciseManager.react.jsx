'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Row,Col,Button,Glyphicon} = require('react-bootstrap');

var Actions = require('../../actions/admin/ExerciseManagerActions');
var ConnectToStore = require('../../mixins/ConnectToStore');
var ExerciseEditor = require('../../components/admin/ExerciseEditor.react');
var ExerciseList = require('../../components/ExerciseList.react');
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
        <ExerciseList doDeleteExercise={Actions.deleteExercise} doEditExercise={Actions.editExercise} exercises={this.state.ex.exercises}/>
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
