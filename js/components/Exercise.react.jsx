/*jslint node: true */
'use strict';

var React = require('react');
var $ = require('jquery');
var {Accordion, Panel, Label} = require('react-bootstrap');

var TestCase = React.createClass({
  render: function() {
    var [kind, label] = this.props.passed ? ["success", "OK"] : ["danger", "Feil"] ;
    return (
      <div>
        <Label bsStyle={kind}>{label}</Label> {this.props.name}
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
        return (<li key={tc[0]}><TestCase name={tc[0]} passed={tc[1]} /></li>);
      });
    }

    var errorsData = this.props.errors;
    var errors;
    if(errorsData) {
      errors = (<span> | Kritiske feil <Label bsStyle="danger">{errorsData}</Label></span>);
    }

    return (
      <div>
        <strong>{this.props.name} </strong>
        <Label bsStyle={this.props.success ? "success" : "warning"}>{this.props.passed}/{this.props.tests}</Label>
        {errors}
        <ul>{testcases}</ul>
      </div>
    );
  }
});

var Exercise = React.createClass({
  getInitialState: function() {
    return {
      data: '{}'
    };
  },
  componentDidMount: function() {
    $.get('http://127.0.0.1/exercises/'+this.props.name, function(result) {
      if(this.isMounted()) {
        this.setState({data: result});
      }
    }.bind(this));
  },
  render: function() {
    var data = this.state.data;
    var statusText;
    if(data.tested) {
      var passedText = data.passed + "/" + data.tests;
      var errorText;
      if(data.errors) {
        errorText = (<span> | Kritiske feil <Label bsStyle="danger">{data.errors}</Label></span>);
      }
      statusText = (
        <span>Vellykkede tester <Label bsStyle={data.success ? "success" : "warning"}>{passedText}</Label>
          {errorText}
        </span>);
    }

    var heading = (
      <div>
        <h4>{data.pretty_name}</h4>
        {statusText}
      </div>
      );

    var reportsData = data.reports;
    var reports;
    if(reportsData && reportsData.length > 0){
      reports = reportsData.map(function(r) {
        return (<li key={r.name}><Report {...r} /></li>);
      });
      reports = (<ul>{reports}</ul>);
    }

    var containerId = "ExerciseContainer-"+this.props.name;
    return (
      <Accordion>
        <Panel collapsable={reports} header={heading} eventKey={data.name}>
          {reports}
        </Panel>
      </Accordion>
    );
  }
  });

module.exports = Exercise;
