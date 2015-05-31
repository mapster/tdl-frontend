/*jslint node: true */
'use strict';

var React = require('react');
var Bootstrap = require('bootstrap');

var Button = React.createClass({
  getDefaultProps: function() {
    return {kind: "default"};
  },
  render: function() {
    return (
      <a {...this.props} href="javascript:;" role="button"
        className={(this.props.className || '') + (' btn btn-' + this.props.kind)} />
    );
  }
});

var Label = React.createClass({
  getDefaultProps: function() {
    return {kind: "default"};
  },
  render: function() {
    return (
      <span className={(this.props.className || '') + (' label label-' + this.props.kind)}>
        {this.props.children}
      </span>
    );
  }
});

var Panel = React.createClass({
  getDefaultProps: function() {
    return {kind: "default"};
  },
  render: function() {
    var heading;
    if(this.props.heading) {
      heading = (<div className="panel-heading">{this.props.heading}</div>);
    }
    return (
      <div className={(this.props.className || '') + (' panel panel-' + this.props.kind)}>
        {heading}
        <div className="panel-body">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = {
    Button: Button,
    Label: Label,
    Panel: Panel
};
