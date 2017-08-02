import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
/* eslint-disable no-unused-vars */
import brace from 'brace';
import brace0 from 'brace/mode/java';
import brace01 from 'brace/theme/github';
import brace012 from 'brace/ext/language_tools';
/* eslint-enable no-unused-vars */

import {Button, ButtonGroup, Col, Nav, NavItem, Row} from 'react-bootstrap';
import SingleFieldModal from '../SingleFieldModal';

const tabTitle = (file) => file.data.name + (file.isChanged ? '*' : '');

const SourcesManager = ({
                          files,
                          currentFile,
                          readOnly = false,
                          renameCurrentFile,
                          selectSourceFile,
                          sourceFileUpdate,
                          createNewFile,
                          deleteSourceFile,
                          saveSourceFile,
                          updateRenameCurrentFile,
                          okRenameCurrentFile,
                        }) => {
  const onFileContentsChange = sourceFileUpdate && ((contents) => {
    if (!readOnly) {
      sourceFileUpdate({
        ...currentFile.data,
        contents,
      });
    }
  });
  if (files.length === 0) {
    if (createNewFile) {
      return (<Button onClick={createNewFile}>New file</Button>);
    }
    else {
      return false;
    }
  }
  return (
    <Row>
      <Col lg={10}>
        <Nav bsStyle='tabs'>
          {files && files.map(file => (
            <NavItem key={file.data.id} active={currentFile.id === file.id} onClick={() => selectSourceFile(file.id)}>
              {tabTitle(file)}
            </NavItem>
          ))}
          {currentFile && (
            <AceEditor
              readOnly={readOnly}
              name={'ace-editor-' + currentFile.id}
              value={currentFile.data.contents}
              onChange={onFileContentsChange}
              mode='java'
              theme="github"
              width='100%'
              editorProps={{$blockScrolling: true}}
            />
          )}
        </Nav>
      </Col>
      {!readOnly &&
      <Col lg={2}>
        <ButtonGroup vertical>
          {createNewFile && (<Button onClick={createNewFile}>New file</Button>)}
          {updateRenameCurrentFile && (<Button onClick={() => updateRenameCurrentFile(true, currentFile.data.name)}>Rename</Button>)}
          {saveSourceFile && (<Button onClick={() => saveSourceFile(currentFile)}>Save</Button>)}
          {deleteSourceFile && (<Button onClick={() => deleteSourceFile(currentFile)}>Delete</Button>)}
        </ButtonGroup>
      </Col>
      }
      <SingleFieldModal
        doCancel={() => updateRenameCurrentFile(false)}
        doOk={okRenameCurrentFile}
        doUpdate={(value) => updateRenameCurrentFile(true, value)}
        label={currentFile.data.name + ' => '}
        show={renameCurrentFile.show}
        title='Rename'
        value={renameCurrentFile.value}/>
    </Row>
  );
};

SourcesManager.propTypes = {
  files: PropTypes.array.isRequired,
  currentFile: PropTypes.object,
  readOnly: PropTypes.bool,
  renameCurrentFile: PropTypes.object.isRequired,
  selectSourceFile: PropTypes.func.isRequired,
  sourceFileUpdate: PropTypes.func,
  createNewFile: PropTypes.func,
  deleteSourceFile: PropTypes.func,
  saveSourceFile: PropTypes.func,
  updateRenameCurrentFile: PropTypes.func,
  okRenameCurrentFile: PropTypes.func,
};

export default SourcesManager;
