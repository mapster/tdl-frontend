'use strict';

var React = require('react');
var AceEditor = require('react-ace');

require('brace/mode/java');
require('brace/theme/eclipse');

var Editor = React.createClass({
  render: function() {
    return (
      <div>
        <AceEditor mode="java" theme="eclipse" name="editor"/>
      </div>
    );
  }
});

module.exports = Editor;
