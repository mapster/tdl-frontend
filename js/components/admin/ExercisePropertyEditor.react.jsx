'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Input,Glyphicon,Button} = require('react-bootstrap');

var ExerciseConstants = require('../../constants/ExerciseConstants');

var ExercisePropertyEditor = React.createClass({
  propTypes: {
    description: PropTypes.string,
    difficulty: PropTypes.string,
    doUpdateProperties: PropTypes.func.isRequired,
    kind: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string
  },
  _change: function (field, event) {
    var change = {};
    change[field] = event.target.value;
    this.props.doUpdateProperties(change);
  },

  render: function() {
    return (
      <form>
        <Input type='text' label='Name' value={this.props.name} onChange={this._change.bind(this, 'name')}/>
        <Input type='text' label='Title' value={this.props.title} onChange={this._change.bind(this, 'title')} />
        <Input
            type='select'
            label={<span>Kind <Glyphicon glyph={ExerciseConstants.symbols[this.props.kind]}/></span>}
            value={this.props.kind}
            onChange={this._change.bind(this, 'kind')}
        >
          {!this.props.kind && <option value=''>Select kind...</option>}
          <option value='expectation'>Expectation</option>
          <option value='error'>Error</option>
          <option value='implementation'>Implementation</option>
        </Input>
        <Input type='number' label='Difficulty' value={this.props.difficulty} onChange={this._change.bind(this, 'difficulty')} />
        <Input type='textarea' label='Description' value={this.props.description} Change={this._change.bind(this, 'description')} />
        <Button bsStyle='success' onClick={() => console.log(this.props)}>Save</Button>
      </form>
    );
  }

});

module.exports = ExercisePropertyEditor;
