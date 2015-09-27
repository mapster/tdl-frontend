var React = require('react');
var PropTypes = React.PropTypes;
var AceEditor = require('react-ace');
require('brace');
require('brace/mode/java');
require('brace/theme/github');

var {Tabs,Tab,Row,Col,Button,ButtonGroup} = require('react-bootstrap');


var SourcesManager = React.createClass({
  propTypes: {
    doChange: PropTypes.func.isRequired,
    doSaveFile: PropTypes.func.isRequired,
    newFilesCounter: PropTypes.number.isRequired,
    sourceFiles: PropTypes.object.isRequired
  },
  _aceId: function(name) {
    return 'ace-editor-'+name+'-'+this.props.sourceFiles[name].id;
  },
  _doCreateNewFile: function() {
    var count = this.props.newFilesCounter + 1;
    var name = 'unsaved-file-' + count;
    var newFile = {};
    newFile[name] = {name, contents: ''};
    this.props.doChange({
      sourceFiles: Object.assign({}, this.props.sourceFiles, newFile),
      newFilesCounter: count
    });
  },
  _onFileChange: function(name, contents) {
    var change = this.props.sourceFiles;
    change[name].contents = contents;
    this.props.doChange({sourceFiles: change});
  },

  render: function() {
    var files = this.props.sourceFiles;
    return (
      <Row>
        <Col lg={10}>
          <Tabs>
            {files && Object.keys(files).map((name) => (
              <Tab key={name} eventKey={name+'-'+files[name].id} title={name}>
                <AceEditor name={this._aceId(name)} value={files[name].contents} onChange={this._onFileChange.bind(null, name)} mode='java' theme="github"/>
              </Tab>
            ))}
          </Tabs>
        </Col>
        <Col lg={2}>
          <ButtonGroup vertical>
            <Button onClick={this._doCreateNewFile}>New file</Button>
            <Button onClick={this.props.doSaveFile}>Save</Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }

});

module.exports = SourcesManager;
