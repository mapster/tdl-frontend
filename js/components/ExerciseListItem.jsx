import React from 'react';
import PropTypes from 'prop-types';
import {Accordion, Button, Panel} from 'react-bootstrap';

// var TestCase = React.createClass({
//   render: function() {
//     var [kind, label] = this.props.passed ? ["success", "OK"] : ["danger", "Feil"];
//     return (
//       <div>
//         <Label bsStyle={kind}>{label}</Label> {this.props.name}
//       </div>
//     );
//   }
// });
//
// var Report = React.createClass({
//   render: function() {
//     var testcasesData = this.props.testcases;
//     var testcases;
//     if(testcasesData) {
//       testcases = testcasesData.map(function(tc) {
//         return (<li key={tc[0]}><TestCase name={tc[0]} passed={tc[1]} /></li>);
//       });
//     }
//
//     var errorsData = this.props.errors;
//     var errors;
//     if(errorsData) {
//       errors = (<span> | Kritiske feil <Label bsStyle="danger">{errorsData}</Label></span>);
//     }
//
//     return (
//       <div>
//         <strong>{this.props.name} </strong>
//         <Label bsStyle={this.props.success ? "success" : "warning"}>{this.props.passed}/{this.props.tests}</Label>
//         {errors}
//         <ul>{testcases}</ul>
//       </div>
//     );
//   }
// });
const Status = () => {
  // let statusText = 'status';
  // if(data.tested) {
  //   var passedText = data.passed + "/" + data.tests;
  //   var errorText;
  //   if(data.errors) {
  //     errorText = (<span> | Kritiske feil <Label bsStyle="danger">{data.errors}</Label></span>);
  //   }
  //   statusText = (
  //     <span>Vellykkede tester <Label bsStyle={data.success ? "success" : "warning"}>{passedText}</Label>
  //       {errorText}
  //     </span>);
  // }
  return null;
};

const Header = ({name, doEditExercise}) => (
  <div>
    <h4>{name}</h4>
    <Status />
    <Button onClick={doEditExercise}>Edit</Button>
  </div>
);
Header.propTypes = {
  name: PropTypes.string.isRequired,
  doEditExercise: PropTypes.func.isRequired,
};

// var footer = (<Button disabled={this.state.isRunningTests} onClick={this.state.isRunningTests ? null : this.handleRunTestClick}>Run tests</Button>);

// var reportsData = data.reports;
// var reports;
// if(reportsData && reportsData.length > 0){
//   reports = reportsData.map(function(r) {
//     return (<li key={r.name}><Report {...r} /></li>);
//   });
//   reports = (<ul>{reports}</ul>);
// }
const ExerciseListItem = ({exercise, doEditExercise}) => (
  <Accordion>
    <Panel header={<Header name={exercise.name} doEditExercise={doEditExercise}/>} eventKey={exercise.id}>
    </Panel>
  </Accordion>
);

ExerciseListItem.propTypes = {
  doEditExercise: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
};

export default ExerciseListItem;