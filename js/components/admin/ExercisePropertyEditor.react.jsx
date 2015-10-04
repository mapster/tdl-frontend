'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Input,Glyphicon,Button} = require('react-bootstrap');

var ExerciseConstants = require('../../constants/ExerciseConstants');

var ExercisePropertyEditor = React.createClass({
  propTypes: {
    doChange: PropTypes.func.isRequired,
    doReset: PropTypes.func.isRequired,
    doSaveExercise: PropTypes.func.isRequired,
    feedback: PropTypes.object,
    properties: PropTypes.object.isRequired
  },
  _change: function (field, event) {
    var change = {};
    change[field] = event.target.value;
    this.props.doChange(Object.assign({}, this.props.properties, change));
  },
  _doSaveExercise: function() {
    var {id,name,kind,difficulty,description} = this.props.properties;
    this.props.doSaveExercise(id, {name,kind,difficulty,description});
  },
  _feedback: function(field) {
    return this._help(field) && true;
  },
  _help: function(field) {
    return this.props.feedback[field] || false;
  },
  _style: function(field) {
    return (this._feedback(field) && 'error') || null;
  },

  render: function() {
    var {name,kind,difficulty,description} = this.props.properties;
    var _unsaved = this.props.properties['@unsaved'];
    return (
      <form>
        <Input type='text' label='Name' value={name}
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
            label={<span>Kind {kind && (<Glyphicon glyph={ExerciseConstants.symbols[kind]}/>)}</span>}
            value={kind || ''}
            onChange={this._change.bind(this, 'kind')}
        >
          {!kind && <option value=''>Select kind...</option>}
          <option value='expectation'>Expectation</option>
          <option value='error'>Error</option>
          <option value='implementation'>Implementation</option>
        </Input>
        <Input type='text' label='Difficulty' value={difficulty}
            bsStyle={this._style('difficulty')}
            help={this._help('difficulty')}
            feedback={this._feedback('difficulty')}
            onChange={this._change.bind(this, 'difficulty')}
        />
        <Input type='textarea' label='Description' value={description}
            bsStyle={this._style('description')}
            help={this._help('description')}
            feedback={this._feedback('description')}
            onChange={this._change.bind(this, 'description')}
        />
        <Button onClick={this.props.doReset}>Reset</Button>
        <Button bsStyle='success' disabled={!_unsaved} onClick={this._doSaveExercise}>Save</Button>
      </form>
    );
  }

});

module.exports = ExercisePropertyEditor;
