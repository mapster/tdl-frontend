'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var {Input,Glyphicon,Button} = require('react-bootstrap');

var ExerciseConstants = require('../../constants/ExerciseConstants');

function _change(field, event) {
  var change = {};
  change[field] = event.target.value;
  this.setState(change);
}

var ExerciseProperties = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <form>
        <Input type='text' label='Name' onChange={_change.bind(this, 'name')}/>
        <Input type='text' label='Title' onChange={_change.bind(this, 'title')} />
        <Input
            type='select'
            label={<span>Kind <Glyphicon glyph={ExerciseConstants.symbols[this.state.kind]}/></span>}
            onChange={_change.bind(this, 'kind')}
        >
          {!this.state.kind && <option value=''>Select kind...</option>}
          <option value='expectation'>Expectation</option>
          <option value='error'>Error</option>
          <option value='implementation'>Implementation</option>
        </Input>
        <Input type='text' label='Difficulty' onChange={_change.bind(this, 'difficulty')} />
        <Input type='textarea' label='Description' onChange={_change.bind(this, 'description')} />
        <Button bsStyle='success' onClick={() => console.log(this.state)}>Save</Button>
      </form>
    );
  }

});

module.exports = ExerciseProperties;
