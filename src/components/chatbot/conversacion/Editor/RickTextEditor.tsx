import React, { useState } from 'react';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Card } from '@mui/material';

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
//cambiar respuesta por mensaje
//const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
//buscar opciones nubes de tutorial
//cambiar los titulos del stepper


  return (
    <Card variant='outlined' style={{border: '1px solid #80808061', padding:'.5em 1em 1em 1em'}}>
      {/* <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      /> */}
      {/* <button onClick={() => console.log(convertToRaw(editorState.getCurrentContent()))}>
        Mostrar contenido en formato JSON
      </button> */}
    </Card>
  );
};

export default RichTextEditor;
