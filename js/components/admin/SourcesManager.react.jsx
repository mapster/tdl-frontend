var React = require('react');
var PropTypes = React.PropTypes;
var AceEditor = require('react-ace');
require('brace');
require('brace/mode/java');
require('brace/theme/github');

var {Tabs,Tab,Row,Col,Button,ButtonGroup} = require('react-bootstrap');

var SourcesManager = React.createClass({
  propTypes: {
    doCreateNewFile: PropTypes.func.isRequired,
    doSaveFile: PropTypes.func.isRequired,
    doUpdateSourceFile: PropTypes.func.isRequired,
    sourceFiles: PropTypes.object.isRequired
  },
  _aceId: function(name) {
    return 'ace-editor-'+name+'-'+this.props.sourceFiles[name].id;
  },
  _onFileChange: function(name, contents) {
    if(contents !== this.props.sourceFiles[name].contents){
      this.props.doUpdateSourceFile(name, contents);
    }
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
            <Button onClick={this.props.doCreateNewFile}>New file</Button>
            <Button onClick={this.props.doSaveFile}>Save</Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }

});

module.exports = SourcesManager;
