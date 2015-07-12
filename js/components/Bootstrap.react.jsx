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
      <a {...this.props} role="button"
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
  propTypes: {
    collapsable: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      kind: "default",
      collapsable: false
    };
  },
  render: function() {
    var collapsable = this.props.collapsable && this.props.children;
    // Set heading if given, and wrap with collapsable if active
    var heading;
    if(this.props.heading) {
      heading = this.props.heading;
      if(collapsable) {
        heading = (
          <a data-toggle="collapse" data-parent={'#'+this.props.parent} className="collapsed accordion-toggle" href={'#'+this.props.id} aria-expanded="false" aria-controls={this.props.id}>
            {heading}
          </a>
        );
      }
      heading = (
        <div className="panel-heading">
          {heading}
        </div>
      );
    }

    // Set body, and wrap with collapsable stuff if active
    var body;
    if(this.props.children) {
      body = (<div className={"panel-body"}>{this.props.children}</div>);
      if(collapsable) {
        body = (
          <div id={this.props.id} className="collapse" aria-expanded="false">
            {body}
          </div>
        );
      }
    }
    return (
      <div className={(this.props.className || '') + (' panel panel-' + this.props.kind)}>
        {heading}
        {body}
      </div>
    );
  }
});

module.exports = {
    Button: Button,
    Label: Label,
    Panel: Panel
};
