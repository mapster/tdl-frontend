import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Glyphicon, Media, Nav, NavItem, Row, Tab, Tabs} from 'react-bootstrap';

import * as Action from '../actions/solutionEditor';
import SourcesManager from '../components/SourcesManager';
import {SELECTORS} from '../reducers';
// var FailureList = require('../components/FailureList.react');
// var SolveAttempts = require('../components/SolveAttempts.react');
// var SolutionConstants = require('../constants/SolutionEditor');


// _tabTitle: function (text, unsaved) {
//   if (unsaved) {
//     text += '*';
//   }
//   return text;
// }
// ,
// _anyUnsavedFiles: function () {
//   var files = this.props.sourceFiles;
//   return Object.keys(files).some((f) => files[f]['@unsaved']);
// }
/*

      <Row>
        <Col lg={3}><Button onClick={() => this.props.doClose(this.props.sourceFiles)}><Glyphicon glyph='arrow-left'/>
          Back</Button></Col>
        <Col lg={3}><Button
          onClick={() => this.props.doTestSolution(this.props.properties.id, this.props.sourceFiles)}>Run
          tests</Button></Col>
      </Row>

      <Row>
        <Col lg={12}>
          <FailureList attempt={lastAttempt}/>
        </Col>
      </Row>


      <Row>
        <Col lg={12}>
          <Media>
            <Media.Body>
              <Media.Heading>Solve Attempts</Media.Heading>
              <SolveAttempts attempts={solveAttempts}/>
            </Media.Body>
          </Media>
        </Col>
      </Row>
    </div>
 */
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

                          selectTab,
                          selectExerciseFile,
                          selectSolutionFile,
                          createNewSolutionFile,
                          deleteSolutionFile,
                          solutionFileUpdate,
                          saveSolutionFile,
                        }) => {
  // var exerciseId = this.props.properties.id;
  // var exerciseSources = this.props.exercises[exerciseId].sourceFiles || {};
  // var solveAttempts = this.props.solutions[exerciseId].solve_attempts || [];
  // var lastAttempt = solveAttempts[solveAttempts.length - 1] || {};
  return (
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
            <Tab.Pane eventKey='exercise_sources' title='Exercise sources'>
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
  );
};
SolutionEditor.propTypes = {
  // doTestSolution: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
  currentExerciseFile: PropTypes.object,
  currentSolutionFile: PropTypes.object,
  solutionFiles: PropTypes.array.isRequired,
  exerciseFiles: PropTypes.array.isRequired,

  selectTab: PropTypes.func.isRequired,
  selectExerciseFile: PropTypes.func.isRequired,
  selectSolutionFile: PropTypes.func.isRequired,
  createNewSolutionFile: PropTypes.func.isRequired,
  deleteSolutionFile: PropTypes.func.isRequired,
  solutionFileUpdate: PropTypes.func.isRequired,
  saveSolutionFile: PropTypes.func.isRequired,
};

export default compose(
  connect(
    state => ({
      currentTab: SELECTORS.solutionEditor.getCurrentTab(state),
      currentExerciseFile: SELECTORS.solutionEditor.getCurrentExerciseFile(state),
      currentSolutionFile: SELECTORS.solutionEditor.getCurrentSolutionFile(state),
      solutionFiles: SELECTORS.solutionEditor.getSolutionFiles(state),
      exerciseFiles: SELECTORS.solutionEditor.getExerciseFiles(state),
    }),
    {
      selectTab: Action.selectTab,
      selectExerciseFile: Action.selectExerciseFile,
      selectSolutionFile: Action.selectSolutionFile,
      createNewSolutionFile: Action.createNewSolutionFile,
      deleteSolutionFile: Action.deleteSolutionFile,
      solutionFileUpdate: Action.solutionFileUpdate,
      saveSolutionFile: Action.saveSolutionFile,
    }
  )
)(SolutionEditor);
