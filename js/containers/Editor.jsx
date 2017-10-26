import React from 'react';
import AceEditor from 'react-ace';
/* eslint-disable no-unused-vars */
import brace from 'brace/mode/java';
import brace0 from 'brace/theme/eclipse';
/* eslint-enable no-unused-vars */

const Editor = () => (
  <div>
    <AceEditor mode="java" theme="eclipse" name="editor"/>
  </div>
);
export default Editor;
