import React from 'react';
import AceEditor from 'react-ace';
// eslint-disable-next-line no-unused-vars
import brace from 'brace/mode/java';
// eslint-disable-next-line no-unused-vars
import brace0 from 'brace/theme/eclipse';


const Editor = () => (
  <div>
    <AceEditor mode="java" theme="eclipse" name="editor"/>
  </div>
);
export default Editor;
