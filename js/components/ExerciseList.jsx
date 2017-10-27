import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, Col, Glyphicon, ListGroup, ListGroupItem, Row} from 'react-bootstrap';

const ExerciseListItem = ({exercise, editExercise, deleteExercise}) => (
  <ListGroupItem>
    <Row>
      <Col lg={9}>{exercise.name}</Col>
      <Col lg={3}>
        <ButtonGroup className='pull-right'>
          <Button bsSize='small' onClick={editExercise}><Glyphicon glyph='pencil'/></Button>
          {deleteExercise && (
            <Button bsSize='small' onClick={deleteExercise}><Glyphicon glyph='trash'/></Button>
          )}
        </ButtonGroup>
      </Col>
    </Row>
  </ListGroupItem>
);
ExerciseListItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  editExercise: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func,
};

const ExerciseList = ({deleteExercise, editExercise, createNewExercise, exercises}) => (
  <div>
    <Row>
      <Col lg={1}/>
      <Col lg={9}><h1 className='inline'>Exercises</h1></Col>
      {createNewExercise && (
        <Col lg={2} className='right'>
          <Button bsSize='sm' onClick={createNewExercise}><Glyphicon glyph='plus'/></Button>
        </Col>
      )}
    </Row>
    <Row>
      <Col lg={1} />
      <Col lg={10}>
        <ListGroup>
          {exercises && Object.keys(exercises).map((id) => (
            <ExerciseListItem exercise={exercises[id]} deleteExercise={deleteExercise && (() => deleteExercise(id))}
                              editExercise={() => editExercise(id)} key={id}/>
          ))}
        </ListGroup>
      </Col>
      <Col lg={1} />
    </Row>
  </div>
);
ExerciseList.propTypes = {
  deleteExercise: PropTypes.func,
  editExercise: PropTypes.func.isRequired,
  createNewExercise: PropTypes.func,
  exercises: PropTypes.object
};

export default ExerciseList;
