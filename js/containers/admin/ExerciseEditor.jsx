import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Glyphicon, Row, Tab, Tabs} from 'react-bootstrap';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {SELECTORS} from '../../reducers';
import * as Action from '../../actions/admin/exerciseEditor';
import ExercisePropertyEditor from '../../components/admin/ExercisePropertyEditor';
import {saveExercise} from '../../actions/admin/exerciseEditor';

// var SourcesManager = require('./SourcesManager.react');

// propTypes: {
//   doClose: PropTypes.func.isRequired,
//     doCreateNewFile: PropTypes.func.isRequired,
//     doDeleteSourceFile: PropTypes.func.isRequired,
//     doRenameSourceFile: PropTypes.func.isRequired,
//     doResetExerciseProperties: PropTypes.func.isRequired,
//     doSaveExerciseProperties: PropTypes.func.isRequired,
//     doSaveSourceFile: PropTypes.func.isRequired,
//     doSelectSourceFile: PropTypes.func.isRequired,
//     doSetEditorTab: PropTypes.func.isRequired,
//     doUpdateExerciseProperties: PropTypes.func.isRequired,
//     doUpdateSourceFile: PropTypes.func.isRequired,
//     feedback: PropTypes.object.isRequired,
//     newFileId: PropTypes.number.isRequired,
//     origProperties: PropTypes.object.isRequired,
//     properties: PropTypes.object.isRequired,
//     selectedSourceFile: PropTypes.string.isRequired,
//     show: PropTypes.bool.isRequired,
//     sourceFiles: PropTypes.object.isRequired,
//     tab: PropTypes.string
// },

// _anyUnsavedFiles: function () {
//   var files = this.props.sourceFiles;
//   return Object.keys(files).some((f) => files[f]['@unsaved']);
// },
/*

        {this.props.properties.id && (
          <Tab eventKey='sources' title={this._tabTitle('Sources', this._anyUnsavedFiles())}>
            <SourcesManager
              doCreateNewFile={() => this.props.doCreateNewFile(this.props.properties.id, this.props.newFileId)}
              doDeleteSourceFile={this.props.doDeleteSourceFile}
              doRenameSourceFile={this.props.doRenameSourceFile}
              doSaveSourceFile={this.props.doSaveSourceFile}
              doSelectSourceFile={this.props.doSelectSourceFile}
              doUpdateSourceFile={this.props.doUpdateSourceFile}
              selectedSourceFile={this.props.selectedSourceFile}
              sourceFiles={this.props.sourceFiles}
            />
          </Tab>
        )}
 */

/*

            doChange={this.props.doUpdateExerciseProperties}
            doReset={() => this.props.doResetExerciseProperties(this.props.origProperties)}
            doSaveExercise={this.props.doSaveExerciseProperties}


      <Tabs id="tabs" position='left'>
        <Tab id="properties" eventKey='properties' title={tabTitle('Properties', exercise['@unsaved'])}>
 */

const tabTitle = (text, unsaved) => {
  if (unsaved) {
    text += '*';
  }
  return text;
};

const ExerciseEditor = ({isChanged, properties, feedback, exerciseUpdate, saveExercise}) => (
  <Row>
    <Row>
      <Col lg={3}><Button><Glyphicon glyph='arrow-left'/> Back</Button></Col>
    </Row>
    <Row>
          <ExercisePropertyEditor
            exerciseUpdate={exerciseUpdate}
            saveExercise={saveExercise}
            isChanged={isChanged}
            properties={properties}
            feedback={feedback}
          />
    </Row>
  </Row>
);
ExerciseEditor.propTypes = {
  isChanged: PropTypes.bool.isRequired,
  properties: PropTypes.object.isRequired,
  feedback: PropTypes.object.isRequired,
  exerciseUpdate: PropTypes.func.isRequired,
  saveExercise: PropTypes.func.isRequired,
};

export default compose(
  connect(state => (
    {
      isChanged: SELECTORS.exerciseEditor.isCurrentExerciseChanged(state),
      properties: SELECTORS.exerciseEditor.getCurrentExerciseProperties(state),
      feedback: SELECTORS.exerciseEditor.getCurrentExerciseFeedback(state),
    }),{
      exerciseUpdate: Action.exerciseUpdate,
      saveExercise: Action.saveExercise,
    }
  )
)(ExerciseEditor);
