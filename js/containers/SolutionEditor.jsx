import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Glyphicon, Media, Nav, NavItem, Row, Tab, Tabs} from 'react-bootstrap';

import * as Action from '../actions/solutionEditor';
import SourcesManager from '../components/SourcesManager';
import {SELECTORS} from '../reducers';
import SolveAttempts from '../components/SolveAttempts';
// var FailureList = require('../components/FailureList.react');
// var SolveAttempts = require('../components/SolveAttempts.react');

      //
      // <Row>
      //   <Col lg={12}>
      //     <FailureList attempt={lastAttempt}/>
      //   </Col>
      // </Row>



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

                          selectTab,
                          selectExerciseFile,
                          selectSolutionFile,
                          createNewSolutionFile,
                          deleteSolutionFile,
                          solutionFileUpdate,
                          saveSolutionFile,
                          createSolveAttempt,
                        }) => (
  <div>
    <Tab.Container id='tabs' activeKey={currentTab} onSelect={selectTab}>
      <Row className="clearfix">
        <Col lg={2}>
          <Nav bsStyle="pills" stacked>
            <NavItem eventKey='solution_sources'>
              {tabTitle('Solution sources', solutionFiles.some(file => file.isChanged))}
            </NavItem>
            <NavItem eventKey='exercise_sources'>Exercise sources</NavItem>
          </Nav>
        </Col>
        <Col lg={10}>
          <Tab.Content>
            <Tab.Pane eventKey='solution_sources'>
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
            <Tab.Pane eventKey='exercise_sources'>
              <SourcesManager
                files={exerciseFiles}
                currentFile={currentExerciseFile}
                selectSourceFile={selectExerciseFile}
                readOnly
              />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    <Row>
      <Col lg={11}>
        <Media>
          <Media.Body>
            <Media.Heading>Solve Attempts</Media.Heading>
            <SolveAttempts attempts={solveAttempts}/>
          </Media.Body>
        </Media>
      </Col>
      <Col lg={1}>
        <Button bsStyle="success" onClick={createSolveAttempt}>Run</Button>
      </Col>
    </Row>
  </div>
);

SolutionEditor.propTypes = {
  currentTab: PropTypes.string.isRequired,
  currentExerciseFile: PropTypes.object,
  currentSolutionFile: PropTypes.object,
  solutionFiles: PropTypes.array.isRequired,
  exerciseFiles: PropTypes.array.isRequired,
  solveAttempts: PropTypes.array.isRequired,

  selectTab: PropTypes.func.isRequired,
  selectExerciseFile: PropTypes.func.isRequired,
  selectSolutionFile: PropTypes.func.isRequired,
  createNewSolutionFile: PropTypes.func.isRequired,
  deleteSolutionFile: PropTypes.func.isRequired,
  solutionFileUpdate: PropTypes.func.isRequired,
  saveSolutionFile: PropTypes.func.isRequired,
  createSolveAttempt: PropTypes.func.isRequired,
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
    }
  )
)(SolutionEditor);
