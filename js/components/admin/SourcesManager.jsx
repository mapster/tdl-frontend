import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
/* eslint-disable no-unused-vars */
import brace from 'brace';
import brace0 from 'brace/mode/java';
import brace01 from 'brace/theme/github';
import brace012 from 'brace/ext/language_tools';
/* eslint-enable no-unused-vars */

import {Col, Nav, NavItem, Row} from 'react-bootstrap';
// import SingleFieldModal from '../SingleFieldModal.react';

/*
getDefaultProps:

function () {
  return {readOnly: false};
}

,
getInitialState: function () {
  return {rename: false};
}
_onFileChange: function (name, contents) {
  if (this.props.readOnly) {
    return;
  }
  if (contents !== this.props.sourceFiles[name].contents) {
    this.props.doUpdateSourceFile(name, contents);
  }
}
,
,
_showRename: function (name) {
  this.setState({rename: name});
}
,
_saveRename: function (name) {
  this.props.doRenameSourceFile(this.props.selectedSourceFile, name, this.props.sourceFiles);
  this._showRename(false);
}

,


  var showButtons = this.props.doCreateNewFile && this.props.doSaveSourceFile && this.props.doRenameSourceFile && this.props.doDeleteSourceFile && true;

  var files = this.props.sourceFiles;

    <SingleFieldModal
      doCancel={() => this._showRename(false)}
      doSave={this._saveRename}
      label={this.state.rename + ' => '}
      show={this.state.rename && true}
      title='Rename'
      value={this.state.rename}
    />


    {showButtons &&
    <Col lg={2}>
      <ButtonGroup vertical>
        {this.props.doCreateNewFile && (<Button onClick={this.props.doCreateNewFile}>New file</Button>)}
        {this.props.doSaveSourceFile && (
          <Button onClick={() => this.props.doSaveSourceFile(files[this.props.selectedSourceFile])}>Save</Button>)}
        {this.props.doRenameSourceFile && (
          <Button onClick={() => this._showRename(this.props.selectedSourceFile)}>Rename</Button>)}
        {this.props.doDeleteSourceFile && (<Button
          onClick={() => this.props.doDeleteSourceFile(this.props.selectedSourceFile, this.props.sourceFiles)}>Delete</Button>)}
      </ButtonGroup>
    </Col>
    }

              <Tab key={name} eventKey={name} title={this._tabTitle(name)}>

          </Tab>
 */


const tabTitle = (file) => file.data.name + (file.isChanged ? '*' : '');

const SourcesManager = ({files, currentFile, readOnly = false, selectSourceFile}) => {
  return (
    <Row>
      <Col lg={10}>
        <Nav bsStyle='tabs'>
          {files && files.map(file => (
            <NavItem key={file.data.name} active={currentFile.id === file.id} onClick={() => selectSourceFile(file.id)}>
              {tabTitle(file)}
            </NavItem>
          ))}
          {currentFile && (
            <AceEditor
              readOnly={readOnly || currentFile.readOnly}
              name={'ace-editor-' + currentFile.id}
              value={currentFile.data.contents}
              onChange={() => {
              }}
              mode='java'
              theme="github"
              width='100%'
              editorProps={{$blockScrolling: 'infinity'}}
            />
          )}
        </Nav>
      </Col>
    </Row>
  );
};

SourcesManager.propTypes = {
  // doCreateNewFile: PropTypes.func,
  // doDeleteSourceFile: PropTypes.func,
  // doRenameSourceFile: PropTypes.func,
  // doSaveSourceFile: PropTypes.func,
  // doSelectSourceFile: PropTypes.func.isRequired,
  // doUpdateSourceFile: PropTypes.func,
  // readOnly: PropTypes.bool,
  // selectedSourceFile: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  currentFile: PropTypes.object,
  readOnly: PropTypes.bool,
  selectSourceFile: PropTypes.func.isRequired,
};

export default SourcesManager;
