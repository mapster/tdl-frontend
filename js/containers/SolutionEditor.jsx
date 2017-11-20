import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Media, Nav, NavItem, Row, Tab} from 'react-bootstrap';

import * as Action from '../actions/solutionEditor';
import SourcesManager from '../components/SourcesManager';
import {SELECTORS} from '../reducers';
import SolveAttempts from '../components/SolveAttempts';
import FailureList from '../components/FailureList';
import solutionConstants from '../constants/solutionEditor';

const tabTitle = (text, unsaved = false) => {
  if (unsaved) {
    text += '*';
  }
  return text;
};

const SolutionEditor = ({
                          currentTab,
                          currentExerciseFile,
                          currentSolutionFile,
                          solutionFiles,
                          exerciseFiles,
                          solveAttempts,
                          activeSolveAttemptId,

                          selectTab,
                          selectExerciseFile,
                          selectSolutionFile,
                          createNewSolutionFile,
                          deleteSolutionFile,
                          solutionFileUpdate,
                          saveSolutionFile,
                          createSolveAttempt,
                          gotoTest,
                          selectSolveAttempt,
                          gotoSourceFile
                        }) => (
  <div>
    <Tab.Container id='tabs' activeKey={currentTab} onSelect={selectTab}>
      <div>
        <Row>
          <Col lg={12}>
            <Nav className='source-sets' bsStyle="tabs" justified>
              <NavItem eventKey={solutionConstants.tabs.solutionSources}>
                <h4>{tabTitle('Solution sources', solutionFiles.some(file => file.isChanged))}</h4>
              </NavItem>
              <NavItem eventKey={solutionConstants.tabs.exerciseSources}>
                <h4>Exercise sources</h4>
              </NavItem>
            </Nav>
          </Col>
        </Row>
        <Row className='small-top-padding'>
          <Col lg={8}>
            <Tab.Content>
              <Tab.Pane eventKey={solutionConstants.tabs.solutionSources}>
                <SourcesManager
                  files={solutionFiles}
                  currentFile={currentSolutionFile}
                  selectSourceFile={selectSolutionFile}
                  createNewFile={createNewSolutionFile}
                  deleteSourceFile={(sourceFile) => deleteSolutionFile(sourceFile, true)}
                  saveSourceFile={saveSolutionFile}
                  sourceFileUpdate={solutionFileUpdate}
                />
              </Tab.Pane>
              <Tab.Pane eventKey={solutionConstants.tabs.exerciseSources}>
                <SourcesManager
                  files={exerciseFiles}
                  currentFile={currentExerciseFile}
                  selectSourceFile={selectExerciseFile}
                  readOnly
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col lg={4}>
            <FailureList gotoTest={gotoTest}
                         gotoSourceFile={gotoSourceFile}
                         attempt={solveAttempts.find(attempt => attempt.id === activeSolveAttemptId)}/>
          </Col>
        </Row>
        <Row className='small-top-padding'>
          <Col lg={8}>
            <Row>
              <Col lg={1}/>
              <Col lg={9} className='medium-padding-left'>
                <Media>
                  <Media.Body>
                    <Media.Heading>Solve Attempts</Media.Heading>
                    <SolveAttempts attempts={solveAttempts} activeAttemptId={activeSolveAttemptId}
                                   selectSolveAttempt={selectSolveAttempt}/>
                  </Media.Body>
                </Media>
              </Col>
              <Col lg={1}>
                <Button className='large-margin-left' bsSize='large' bsStyle="success" onClick={createSolveAttempt}>Run</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Tab.Container>
  </div>
);

SolutionEditor.propTypes = {
  currentTab: PropTypes.string.isRequired,
  currentExerciseFile: PropTypes.object,
  currentSolutionFile: PropTypes.object,
  solutionFiles: PropTypes.array.isRequired,
  exerciseFiles: PropTypes.array.isRequired,
  solveAttempts: PropTypes.array.isRequired,
  activeSolveAttemptId: PropTypes.number,

  selectTab: PropTypes.func.isRequired,
  selectExerciseFile: PropTypes.func.isRequired,
  selectSolutionFile: PropTypes.func.isRequired,
  createNewSolutionFile: PropTypes.func.isRequired,
  deleteSolutionFile: PropTypes.func.isRequired,
  solutionFileUpdate: PropTypes.func.isRequired,
  saveSolutionFile: PropTypes.func.isRequired,
  createSolveAttempt: PropTypes.func.isRequired,
  gotoTest: PropTypes.func.isRequired,
  selectSolveAttempt: PropTypes.func.isRequired,
  gotoSourceFile: PropTypes.func.isRequired,
};

export default compose(
connect(
state => ({
  currentTab: SELECTORS.solutionEditor.getCurrentTab(state),
  currentExerciseFile: SELECTORS.solutionEditor.getCurrentExerciseFile(state),
  currentSolutionFile: SELECTORS.solutionEditor.getCurrentSolutionFile(state),
  solutionFiles: SELECTORS.solutionEditor.getSolutionFiles(state),
  exerciseFiles: SELECTORS.solutionEditor.getExerciseFiles(state),
  solveAttempts: SELECTORS.solutionEditor.getSolveAttempts(state),
  activeSolveAttemptId: SELECTORS.solutionEditor.getActiveSolveAttemptId(state),
}),
{
  selectTab: Action.selectTab,
  selectExerciseFile: Action.selectExerciseFile,
  selectSolutionFile: Action.selectSolutionFile,
  createNewSolutionFile: Action.createNewSolutionFile,
  deleteSolutionFile: Action.deleteSolutionFile,
  solutionFileUpdate: Action.solutionFileUpdate,
  saveSolutionFile: Action.saveSolutionFile,
  createSolveAttempt: Action.createSolveAttempt,
  gotoTest: Action.gotoTest,
  selectSolveAttempt: Action.selectSolveAttempt,
  gotoSourceFile: Action.gotoSourceFile,
}
)
)(SolutionEditor);
