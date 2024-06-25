// import { useTranslation } from 'react-i18next';
// import { RecommendedProducts } from '../RecommendedProducts';
// import { Login } from './Login';

// //Home page
// export const Wording = ()=> {
//     const { t, i18n } = useTranslation();
//     return (
//        <div>
//          <textarea id="user-input" placeholder="הקלידו את ההערה שלכם כאן..."></textarea>
//        </div>
//     );
// }


// export const Wording = () => {
//     const editorRef = useRef(null);

//     const handleBold = () => {
//         document.execCommand('bold', false, null);
//     };

//     const handleHighlight = () => {
//         document.execCommand('hiliteColor', false, 'yellow');
//     };

//     const handleUndo = () => {
//         document.execCommand('undo', false, null);
//     };


//     return (
//         <div className="container mt-4">
//             <div className="col-3">
//                 <button onClick={handleBold}>Bold</button>
//                 <button onClick={handleHighlight}>Highlight</button>
//                 <button onClick={handleUndo}>Undo</button>

//             </div>
//             <div
//                 contentEditable
//                 ref={editorRef}
//                 style={{ border: '1px solid #ccc', minHeight: '200px', padding: '5px' }}>
//             </div>
//         </div>
//     );
// };

// export default Wording;


// import React, { useState,useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export const Wording = () => {
//   const [inputText, setInputText] = useState('');
//   const [isBold, setIsBold] = useState(false);
//   const [isHighlighted, setIsHighlighted] = useState(false);

//   const handleInputChange = (e) => {
//     setInputText(e.target.value);
//   };

//     const handleHighlight = () => {
//         document.execCommand('hiliteColor', false, 'yellow');
//     };

//   const toggleBold = () => {
//     setIsBold(!isBold);
//   };

//   const toggleHighlight = () => {
//     setIsHighlighted(!isHighlighted);
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="form-group">
//             <label htmlFor="user-input">הזן טקסט:</label>
//             <textarea
//               className={`form-control ${isHighlighted ? 'bg-dark text-white' : ''}`}
//               id="user-input"
//               rows="4"
//               value={inputText}
//               onChange={handleInputChange}
//               style={isBold ? { fontWeight: 'bold' } : {}}
//               placeholder="הזן את הטקסט שלך כאן..."
//             />
//           </div>
//           <div className="form-check">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="boldCheckbox"
//               checked={isBold}
//               onChange={toggleBold}
//             />
//             <label className="form-check-label" htmlFor="boldCheckbox">הדגשת טקסט</label>
//             <button onClick={handleHighlight}>Highlight</button>
//           </div>
//           <div className="form-check">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="highlightCheckbox"
//               checked={isHighlighted}
//               onChange={toggleHighlight}
//             />
//             <label className="form-check-label" htmlFor="highlightCheckbox">הזרקת צבע רקע</label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Wording;



// import React, { useState, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export const Wording = () => {
//   const [inputText, setInputText] = useState('');
//   const [isBold, setIsBold] = useState(false);
//   const [isHighlighted, setIsHighlighted] = useState(false);
//   const textAreaRef = useRef(null);

//   const handleInputChange = (e) => {
//     setInputText(e.target.value);
//   };

//   const handleHighlight = () => {
//     const textarea = textAreaRef.current;
//     const selection = textarea && textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
//     if (selection) {
//       const newText =
//         inputText.substring(0, textarea.selectionStart) +
//         `<span style="background-color: yellow;">${selection}</span>` +
//         inputText.substring(textarea.selectionEnd);
//       setInputText(newText);
//     }
//   };

//   const toggleBold = () => {
//     setIsBold(!isBold);
//   };

//   const toggleHighlight = () => {
//     setIsHighlighted(!isHighlighted);
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="form-group">

//             <textarea
//               ref={textAreaRef}
//               className={`form-control ${isHighlighted ? 'bg-dark text-white' : ''}`}
//               id="user-input"
//               rows="4"
//               value={inputText}
//               onChange={handleInputChange}
//               style={isBold ? { fontWeight: 'bold' } : {}}
//               placeholder="הקלד כאן ניסוח"
//             />
//           </div>
//           <div className="form-check">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="boldCheckbox"
//               checked={isBold}
//               onChange={toggleBold}
//             />
//             <label className="form-check-label" htmlFor="boldCheckbox">הדגשת טקסט</label>
//             <button onClick={handleHighlight}>Highlight</button>
//           </div>
//           <div className="form-check">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="highlightCheckbox"
//               checked={isHighlighted}
//               onChange={toggleHighlight}
//             />
//             <label className="form-check-label" htmlFor="highlightCheckbox">הזרקת צבע רקע</label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Wording;

import { Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // סגנון עבור עורך Quill

export const Wording = () => {
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  return (
    // <Row className="justify-content-center align-items-center">
    //     <Col  className="text-center">
    //       <ReactQuill 
    //         theme="snow"
    //         value={editorHtml}
    //         onChange={handleChange}
    //         style={{ width: '300px' }}
    //        />
    //     </Col>
    //   </Row>

    <Row className="justify-content-center align-items-center" >

    <Col className="text-center">
        <ReactQuill
            className="mt-3"
            theme="snow"
            value={editorHtml}
            onChange={handleChange}
            style={{ width: '300px', margin: '0 auto' }}
        />
    </Col>
</Row>


  );
}

export default Wording;


