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
          {exercises && Object.keys(exercises).map((id) => (
            <ExerciseListItem exercise={exercises[id]} solution={solutions[id]} editExercise={() => editExercise(id)}
                              key={id}/>
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
