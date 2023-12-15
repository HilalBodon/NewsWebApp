// import React from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const MyEditor = ({ editorState, setEditorState }) => {


//   return (
//     <div>
//       <ReactQuill value={editorState} onChange={setEditorState} />
//     </div>
//   );
// };

// export default MyEditor;



import React from 'react';

const MyEditor = ({ editorState, setEditorState }) => {
  const handleTextChange = (e) => {
    setEditorState(e.target.value);
  };

  return (
    <div>
      <textarea
        value={editorState}
        onChange={handleTextChange}
        style={{
          width: '100%',
          minHeight: '200px',
          border: '1px solid #ccc',
          padding: '8px',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
};

export default MyEditor;





// import React, { useState } from 'react';
// import { Editor, EditorState, RichUtils } from 'draft-js';
// import 'draft-js/dist/Draft.css';

// const MyEditor = () => {
//   const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

//   const handleKeyCommand = (command) => {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       setEditorState(newState);
//       return 'handled';
//     }
//     return 'not-handled';
//   };

//   const onBoldClick = () => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
//   };

//   const onItalicClick = () => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={onBoldClick}>Bold</button>
//         <button onClick={onItalicClick}>Italic</button>
//         {/* Add more styling options as needed */}
//       </div>
//       <div style={{ border: '1px solid #ccc', padding: '8px', minHeight: '100px' }}>
//         <Editor editorState={editorState} handleKeyCommand={handleKeyCommand} onChange={setEditorState} />
//       </div>
//     </div>
//   );
// };

// export default MyEditor;
