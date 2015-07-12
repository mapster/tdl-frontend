/*jslint node: true */
'use strict';

var React = require('react');
var $ = require('jquery');
var {Accordion, Button, Col, Grid, Label, Panel, Row} = require('react-bootstrap');

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
      data: '{}',
      isRunningTests: false
    };
  },
  componentDidMount: function() {
    this.updateExercise();
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

    var footer = (<Button disabled={this.state.isRunningTests} onClick={this.state.isRunningTests ? null : this.handleRunTestClick }>Run tests</Button>);

    var reportsData = data.reports;
    var reports;
    if(reportsData && reportsData.length > 0){
      reports = reportsData.map(function(r) {
        return (<li key={r.name}><Report {...r} /></li>);
      });
      reports = (<ul>{reports}</ul>);
    }

    return (
      <Accordion>
        <Panel header={heading} eventKey={data.name} footer={footer}>
          {reports}
        </Panel>
      </Accordion>
      );
  },
  handleRunTestClick: function() {
    this.setState({isRunningTests: true});

    $.get('http://127.0.0.1/test/'+this.props.name, function(response) {
      this.updateExercise(() => {
        this.setState({isRunningTests: false});
      });
    }.bind(this));
  },
  updateExercise: function(callback) {
    $.get('http://127.0.0.1/exercises/'+this.props.name, function(result) {
      if(this.isMounted()) {
        this.setState({data: result});
      }
      if(callback){
        callback();
      }
    }.bind(this));
  }
});

module.exports = Exercise;
