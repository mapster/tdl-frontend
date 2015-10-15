var React = require('react');
var PropTypes = React.PropTypes;
var {ListGroup,ListGroupItem,ButtonGroup,Row,Col,Button,Glyphicon} = require('react-bootstrap');

var ExerciseList = React.createClass({
  propTypes: {
    doDeleteExercise: PropTypes.func.isRequired,
    doEditExercise: PropTypes.func.isRequired,
    exercises: PropTypes.array.isRequired
  },

  render: function() {
    return (
      <ListGroup>
        {this.props.exercises && this.props.exercises.map((ex) => (
          <ListGroupItem key={ex.id}>
            <Row>
              <Col lg={9}>{ex.name}</Col>
              <Col lg={3}>
                <ButtonGroup className='pull-right'>
                  <Button bsSize='small' onClick={() => this.props.doEditExercise(ex)}><Glyphicon glyph='pencil'/></Button>
                  <Button bsSize='small' onClick={() => this.props.doDeleteExercise(ex)}><Glyphicon glyph='trash'/></Button>
                </ButtonGroup>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }

});

module.exports = ExerciseList;
