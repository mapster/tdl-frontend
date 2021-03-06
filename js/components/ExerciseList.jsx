import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  OverlayTrigger,
  Button,
  ButtonGroup,
  Col,
  Glyphicon,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap';

import SolutionConstants from '../constants/solution';

const ExerciseListItem = ({exercise, solution, editExercise}) => {
  const popover = (
    <Popover id={exercise.id}>
      {exercise.description}
      <br /> <br />
      Kind: {exercise.kind} <br/>
      Difficulty: {exercise.difficulty} <br/>
    </Popover>
  );
  return (
    <OverlayTrigger trigger={['hover', 'focus']} placement='right' overlay={popover}>
      <ListGroupItem bsStyle={solution && SolutionConstants.statusStyle[solution.last_solve_attempt_status]}>
        <Row>
          <Col lg={6}>{exercise.name}</Col>
          <Col lg={3}>{solution && SolutionConstants.statusText[solution.last_solve_attempt_status]}</Col>
          <Col lg={3}>
            <ButtonGroup className='pull-right'>
              <Button bsSize='small' onClick={editExercise}><Glyphicon glyph='pencil'/></Button>
            </ButtonGroup>
          </Col>
        </Row>
      </ListGroupItem>
    </OverlayTrigger>
  );
};
ExerciseListItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  solution: PropTypes.object,
  editExercise: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func,
};

const exercisesAlphabetical = (e1, e2) => {
  const name1 = e1.name.toLowerCase();
  const name2 = e2.name.toLowerCase();
  if (name1 > name2) {
    return 1;
  }

  if (name1 < name2) {
    return -1;
  }

  return 0;
};

const ExerciseList = ({editExercise, exercises, solutions}) => (
  <div>
    <Row>
      <Col lg={1}/>
      <Col lg={9}><h1 className='inline'>Exercises</h1></Col>
    </Row>
    <Row className='exercise-list'>
      <Col lg={1}/>
      <Col lg={4}>
        <ListGroup>
          {exercises && Object.keys(exercises).map(id => exercises[id]).sort(exercisesAlphabetical).map(exercise => (
            <ExerciseListItem exercise={exercise} solution={solutions[exercise.id]} editExercise={() => editExercise(exercise.id)}
                              key={exercise.id}/>
          ))}
        </ListGroup>
      </Col>
      <Col lg={1}/>
    </Row>
  </div>
);
ExerciseList.propTypes = {
  deleteExercise: PropTypes.func,
  editExercise: PropTypes.func.isRequired,
  createNewExercise: PropTypes.func,
  exercises: PropTypes.object.isRequired,
  solutions: PropTypes.object.isRequired,
};

export default ExerciseList;
