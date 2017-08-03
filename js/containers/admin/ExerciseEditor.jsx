import React from 'react';
import PropTypes from 'prop-types';
import {Col, Nav, NavItem, Row, Tab} from 'react-bootstrap';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {SELECTORS} from '../../reducers';
import * as Action from '../../actions/admin/exerciseEditor';
import ExercisePropertyEditor from '../../components/admin/ExercisePropertyEditor';
import SourcesManager from '../../components/admin/SourcesManager';

const tabTitle = (text, unsaved) => {
  if (unsaved) {
    text += '*';
  }
  return text;
};

const ExerciseEditor = ({
                          currentTab,
                          isChanged,
                          properties,
                          feedback,
                          sourceFiles,
                          currentSourceFile,
                          renameCurrentFile,
                          selectTab,
                          exerciseUpdate,
                          saveExercise,
                          selectSourceFile,
                          sourceFileUpdate,
                          createNewSourceFile,
                          saveSourceFile,
                          deleteSourceFile,
                          updateRenameCurrentFile,
                          okRenameCurrentFile,
                        }) => (
  <Row>
    <Row>
      <Tab.Container id='tabs' activeKey={currentTab} onSelect={selectTab}>
        <Row className="clearfix">
          <Col lg={4}>
            <Nav bsStyle="pills" stacked>
              <NavItem eventKey="properties">{tabTitle('Properties', isChanged)}</NavItem>
              <NavItem eventKey="sources">{tabTitle('Sources', sourceFiles.some(file => file.isChanged))}</NavItem>
            </Nav>
          </Col>
          <Col lg={8}>
            <Tab.Content>
              <Tab.Pane eventKey='properties'>
                <ExercisePropertyEditor
                  exerciseUpdate={exerciseUpdate}
                  saveExercise={saveExercise}
                  isChanged={isChanged}
                  properties={properties}
                  feedback={feedback}
                />
              </Tab.Pane>
              <Tab.Pane eventKey='sources'>
                <SourcesManager currentFile={currentSourceFile}
                                files={sourceFiles}
                                renameCurrentFile={renameCurrentFile}
                                selectSourceFile={selectSourceFile}
                                sourceFileUpdate={sourceFileUpdate}
                                createNewFile={createNewSourceFile}
                                saveSourceFile={saveSourceFile}
                                deleteSourceFile={deleteSourceFile}
                                updateRenameCurrentFile={updateRenameCurrentFile}
                                okRenameCurrentFile={okRenameCurrentFile}/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Row>
  </Row>
);
ExerciseEditor.propTypes = {
  currentTab: PropTypes.string.isRequired,
  isChanged: PropTypes.bool.isRequired,
  properties: PropTypes.object.isRequired,
  feedback: PropTypes.object.isRequired,
  sourceFiles: PropTypes.array.isRequired,
  currentSourceFile: PropTypes.object,
  renameCurrentFile: PropTypes.object.isRequired,
  selectTab: PropTypes.func.isRequired,
  exerciseUpdate: PropTypes.func.isRequired,
  saveExercise: PropTypes.func.isRequired,
  selectSourceFile: PropTypes.func.isRequired,
  sourceFileUpdate: PropTypes.func.isRequired,
  createNewSourceFile: PropTypes.func.isRequired,
  saveSourceFile: PropTypes.func.isRequired,
  deleteSourceFile: PropTypes.func.isRequired,
  updateRenameCurrentFile: PropTypes.func,
  okRenameCurrentFile: PropTypes.func,
};

export default compose(
  connect(state => (
      {
        currentTab: SELECTORS.exerciseEditor.getCurrentTab(state),
        isChanged: SELECTORS.exerciseEditor.isExercisePropertiesChanged(state),
        properties: SELECTORS.exerciseEditor.getExerciseProperties(state),
        feedback: SELECTORS.exerciseEditor.getExercisePropertiesFeedback(state),
        sourceFiles: SELECTORS.exerciseEditor.getSourceFiles(state),
        currentSourceFile: SELECTORS.exerciseEditor.getCurrentSourceFile(state),
        renameCurrentFile: SELECTORS.exerciseEditor.getRenameCurrentFile(state),
      }), {
      selectTab: Action.selectTab,
      exerciseUpdate: Action.exercisePropertiesUpdate,
      saveExercise: Action.saveExercise,
      selectSourceFile: Action.selectSourceFile,
      sourceFileUpdate: Action.sourceFileUpdate,
      createNewSourceFile: Action.createNewSourceFile,
      saveSourceFile: Action.saveSourceFile,
      deleteSourceFile: Action.deleteSourceFile,
      updateRenameCurrentFile: Action.updateRenameCurrentFile,
      okRenameCurrentFile: Action.okRenameCurrentFile,
    }
  )
)(ExerciseEditor);
