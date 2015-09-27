'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Input,Glyphicon,Button} = require('react-bootstrap');

var ExerciseConstants = require('../../constants/ExerciseConstants');

var ExercisePropertyEditor = React.createClass({
  propTypes: {
    description: PropTypes.string,
    difficulty: PropTypes.string,
    doSaveExercise: PropTypes.func.isRequired,
    doUpdateProperties: PropTypes.func.isRequired,
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    kind: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string
  },
  _change: function (field, event) {
    var change = {};
    change[field] = event.target.value;
    this.props.doUpdateProperties(change);
  },
  _doSaveExercise: function() {
    var {name,kind,difficulty,description} = this.props;
    this.props.doSaveExercise({name,kind,difficulty,description});
  },
  _feedback: function(field) {
    return this._help(field) && true;
  },
  _help: function(field) {
    var e = this.props.errors;
    return (e && e[field]) || false;
  },
  _style: function(field) {
    return (this._feedback(field) && 'error') || null;
  },

  render: function() {
        // <Input type='text' label='Title' value={this.props.title} onChange={this._change.bind(this, 'title')} />
    return (
      <form>
        <Input type='text' label='Name' value={this.props.name}
            bsStyle={this._style('name')}
            help={this._help('name')}
            hasFeedback={this._feedback('name')}
            onChange={this._change.bind(this, 'name')}
        />
        <Input
            bsStyle={this._style('kind')}
            help={this._help('kind')}
            feedback={this._feedback('kind')}
            type='select'
            label={<span>Kind {this.props.kind && (<Glyphicon glyph={ExerciseConstants.symbols[this.props.kind]}/>)}</span>}
            value={this.props.kind}
            onChange={this._change.bind(this, 'kind')}
        >
          {!this.props.kind && <option value=''>Select kind...</option>}
          <option value='expectation'>Expectation</option>
          <option value='error'>Error</option>
          <option value='implementation'>Implementation</option>
        </Input>
        <Input type='text' label='Difficulty' value={this.props.difficulty}
            bsStyle={this._style('difficulty')}
            help={this._help('difficulty')}
            feedback={this._feedback('difficulty')}
            onChange={this._change.bind(this, 'difficulty')}
        />
        <Input type='textarea' label='Description' value={this.props.description}
            bsStyle={this._style('description')}
            help={this._help('description')}
            feedback={this._feedback('description')}
            onChange={this._change.bind(this, 'description')}
        />
        <Button bsStyle='success' onClick={this._doSaveExercise}>Save</Button>
      </form>
    );
  }

});

module.exports = ExercisePropertyEditor;
