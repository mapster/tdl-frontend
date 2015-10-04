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
    doSaveSourceFile: PropTypes.func.isRequired,
    doUpdateSourceFile: PropTypes.func.isRequired,
    selectedSourceFile: PropTypes.string.isRequired,
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
  _tabTitle: function(name) {
    var unsaved = this.props.sourceFiles[name]['@unsaved'];
    if(unsaved !== undefined && unsaved) {
      name += '*';
    }
    return name;
  },

  render: function() {
    var files = this.props.sourceFiles;
    return (
      <Row>
        <Col lg={10}>
          <Tabs activeKey={this.props.selectedSourceFile}>
            {files && Object.keys(files).map((name) => (
              <Tab key={name} eventKey={name} title={this._tabTitle(name)}>
                <AceEditor name={this._aceId(name)} value={files[name].contents} onChange={files[name] && this._onFileChange.bind(null, name)} mode='java' theme="github"/>
              </Tab>
            ))}
          </Tabs>
        </Col>
        <Col lg={2}>
          <ButtonGroup vertical>
            <Button onClick={this.props.doCreateNewFile}>New file</Button>
            <Button onClick={() => this.props.doSaveSourceFile(files[this.props.selectedSourceFile])}>Save</Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }

});

module.exports = SourcesManager;
