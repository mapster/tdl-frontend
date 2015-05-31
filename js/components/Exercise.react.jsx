/*jslint node: true */
'use strict';

var React = require('react');

var {Button, Label, Panel} = require('./Bootstrap.react');

var TestCase = React.createClass({
  render: function() {
    var kind = this.props.passed ? "success" : "danger";
    var label = this.props.passed ? "OK" : "Feil";
    return (
      <div>
        <Label kind={kind}>{label}</Label> {this.props.name}
      </div>
    );
  }
});

var Report = React.createClass({
  render: function() {
    var testcasesData = this.props.testcases;
    var testcases;
    if(testcasesData) {
      testcases = testcasesData.map(function(tc) {
        return (<li><TestCase name={tc[0]} passed={tc[1]} /></li>);
      });
    }

    var errorsData = this.props.errors;
    var errors;
    if(errorsData) {
      errors = (<span> | Kritiske feil <Label kind="danger">{errorsData}</Label></span>);
    }

    return (
      <div>
        <strong>{this.props.name} </strong>
        <Label kind={this.props.success ? "success" : "warning"}>{this.props.passed}/{this.props.tests}</Label>
        {errors}
        <ul>{testcases}</ul>
      </div>
    );
  }
});

var Exercise = React.createClass({
  render: function() {
    var statusText;
    if(this.props.data.tested) {
      var passedText = this.props.data.passed + "/" + this.props.data.tests;
      var errorText;
      if(this.props.data.errors) {
        errorText = (<span> | Kritiske feil <Label kind="danger">{this.props.data.errors}</Label></span>);
      }
      statusText = (
        <span>Vellykkede tester <Label kind={this.props.data.success ? "success" : "warning"}>{passedText}</Label>
          {errorText}
        </span>);
    }

    var heading = (
      <div>
        <h4>{this.props.data.pretty_name}</h4>
        {statusText}
      </div>
      );

    var reportsData = this.props.data.reports;
    var reports;
    if(reportsData){
      reports = reportsData.map(function(r) {
        return (<li><Report {...r} /></li>);
      });
    }
    return (
      <Panel kind="default" heading={heading}>
        <ul>{reports}</ul>
      </Panel>
    );
  }
});

module.exports = Exercise;
