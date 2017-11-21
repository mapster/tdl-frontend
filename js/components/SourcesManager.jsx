import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import {Button, ButtonGroup, Col, Nav, NavItem} from 'react-bootstrap';
/* eslint-disable no-unused-vars */
import brace from 'brace';
import brace0 from 'brace/mode/java';
import brace01 from 'brace/theme/github';
import brace012 from 'brace/ext/language_tools';
/* eslint-enable no-unused-vars */

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

  const onRenameChange = (value, isChanged = true) => {
    if (!readOnly) {
      sourceFileUpdate({...currentFile.data, rename: value}, isChanged);
    }
  };
  const openRenameModal = () => onRenameChange(currentFile.data.name, false);
  const closeRename = () => onRenameChange(null, false);
  const confirmRename = () => {
    if (!readOnly) {
      sourceFileUpdate({
          ...currentFile.data,
          name: currentFile.data.rename,
          rename: null,
        },
        currentFile.data.name !== currentFile.data.rename
      );
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
    <div>
      <Col lg={1}>
        {!readOnly &&
          <ButtonGroup className='file-buttons' vertical>
            {createNewFile && (<Button onClick={createNewFile}>New file</Button>)}
            {onFileChange && (<Button onClick={openRenameModal}>Rename</Button>)}
            {saveSourceFile && (<Button onClick={() => saveSourceFile(currentFile)}>Save</Button>)}
            {deleteSourceFile && (<Button onClick={() => deleteSourceFile(currentFile)}>Delete</Button>)}
          </ButtonGroup>
        }
      </Col>
      <Col lg={11}>
        <Nav bsStyle='tabs'>
          {files && files.map(file => (
            <NavItem key={file.data.id} active={currentFile.id === file.id} onClick={() => selectSourceFile(file.id)}>
              {tabTitle(file)}
            </NavItem>
          ))}
        </Nav>
        {currentFile.data && (
          <div className='text-editor'>
            <AceEditor
              readOnly={readOnly}
              name={'ace-editor-' + currentFile.id}
              value={currentFile.data.contents}
              onChange={(value) => onFileChange('contents', value)}
              mode='java'
              theme="github"
              width='100%'
              editorProps={{$blockScrolling: true}}
              showPrintMargin={false}
              highlightActiveLine={true}
            />
          </div>
        )}
      </Col>
      {currentFile.data.rename &&
      <SingleFieldModal
        doCancel={closeRename}
        doOk={confirmRename}
        doUpdate={onRenameChange}
        label={currentFile.data.name + ' => '}
        show={!!currentFile.data.rename}
        title='Rename'
        value={currentFile.data.rename}/>}
    </div>
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
