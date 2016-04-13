var React = require('react');
var PropTypes = React.PropTypes;
var AceEditor = require('react-ace');
require('brace');
require('brace/mode/java');
require('brace/theme/github');
require('brace/ext/language_tools');
var {Tabs,Tab,Row,Col,Button,ButtonGroup} = require('react-bootstrap');

var SingleFieldModal = require('../SingleFieldModal.react');

var SourcesManager = React.createClass({
  propTypes: {
    doCreateNewFile: PropTypes.func,
    doDeleteSourceFile: PropTypes.func,
    doRenameSourceFile: PropTypes.func,
    doSaveSourceFile: PropTypes.func,
    doSelectSourceFile: PropTypes.func.isRequired,
    doUpdateSourceFile: PropTypes.func,
    selectedSourceFile: PropTypes.string.isRequired,
    sourceFiles: PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {rename: false};
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
    if(unsaved) {
      name += '*';
    }
    return name;
  },
  _showRename: function(name) {
    this.setState({rename: name});
  },
  _saveRename: function(name) {
    this.props.doRenameSourceFile(this.props.selectedSourceFile, name, this.props.sourceFiles);
    this._showRename(false);
  },

  render: function() {
    var showButtons = this.props.doCreateNewFile && this.props.doSaveSourceFile && this.props.doRenameSourceFile && this.props.doDeleteSourceFile && true;

    var files = this.props.sourceFiles;
    return (
      <Row>
        <SingleFieldModal
            doCancel={() => this._showRename(false)}
            doSave={this._saveRename}
            label={this.state.rename + ' => '}
            show={this.state.rename && true}
            title='Rename'
            value={this.state.rename}
        />
        <Col lg={10}>
          <Tabs activeKey={this.props.selectedSourceFile} onSelect={this.props.doSelectSourceFile}>
            {files && Object.keys(files).map((name) => (
              <Tab key={name} eventKey={name} title={this._tabTitle(name)}>
                <AceEditor
                    readOnly={files[name]['@readOnly']}
                    name={this._aceId(name)}
                    value={files[name].contents}
                    onChange={files[name] && this._onFileChange.bind(null, name)}
                    mode='java'
                    theme="github"
                />
              </Tab>
            ))}
          </Tabs>
        </Col>
        {showButtons &&
          <Col lg={2}>
            <ButtonGroup vertical>
              {this.props.doCreateNewFile && (<Button onClick={this.props.doCreateNewFile}>New file</Button>)}
              {this.props.doSaveSourceFile && (<Button onClick={() => this.props.doSaveSourceFile(files[this.props.selectedSourceFile])}>Save</Button>)}
              {this.props.doRenameSourceFile && (<Button onClick={() => this._showRename(this.props.selectedSourceFile)}>Rename</Button>)}
              {this.props.doDeleteSourceFile && (<Button onClick={() => this.props.doDeleteSourceFile(this.props.selectedSourceFile, this.props.sourceFiles)}>Delete</Button>)}
            </ButtonGroup>
          </Col>
        }
      </Row>
    );
  }

});

module.exports = SourcesManager;
