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
import SingleFieldModal from './SingleFieldModal';

const tabTitle = (file) => file.data.name + (file.isChanged ? '*' : '');

const SourcesManager = ({
                          files,
                          currentFile = {data: {}},
                          readOnly = false,
                          selectSourceFile,
                          sourceFileUpdate,
                          createNewFile,
                          deleteSourceFile,
                          saveSourceFile,
                        }) => {
  const onFileChange = sourceFileUpdate && ((field, value) => {
    if (!readOnly) {
      sourceFileUpdate({
        ...currentFile.data,
        [field]: value,
      });
    }
  });

  const openRenameModal = () => onFileChange('rename', currentFile.data.name);
  const closeRename = () => onFileChange('rename', null);
  const confirmRename = () => {
    if (!readOnly) {
      sourceFileUpdate({
        ...currentFile.data,
        name: currentFile.data.rename,
        rename: null,
      })
    }
  };

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
          {currentFile.data && (
            <AceEditor
              readOnly={readOnly}
              name={'ace-editor-' + currentFile.id}
              value={currentFile.data.contents}
              onChange={(value) => onFileChange('contents', value)}
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
          {onFileChange && (<Button onClick={openRenameModal}>Rename</Button>)}
          {saveSourceFile && (<Button onClick={() => saveSourceFile(currentFile)}>Save</Button>)}
          {deleteSourceFile && (<Button onClick={() => deleteSourceFile(currentFile)}>Delete</Button>)}
        </ButtonGroup>
      </Col>
      }
      {currentFile.data.rename &&
      <SingleFieldModal
        doCancel={closeRename}
        doOk={confirmRename}
        doUpdate={(value) => onFileChange('rename', value)}
        label={currentFile.data.name + ' => '}
        show={!!currentFile.data.rename}
        title='Rename'
        value={currentFile.data.rename}/>}
    </Row>
  );
};

SourcesManager.propTypes = {
  files: PropTypes.array.isRequired,
  currentFile: PropTypes.object,
  readOnly: PropTypes.bool,
  selectSourceFile: PropTypes.func.isRequired,
  sourceFileUpdate: PropTypes.func,
  createNewFile: PropTypes.func,
  deleteSourceFile: PropTypes.func,
  saveSourceFile: PropTypes.func,
};

export default SourcesManager;
