// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getCommonQuestions, deleteQuestion, updateQuestion, addQuestion } from "../../axios/CommonQuestionsAxios";
// import { setFAQlist } from "../../redux/DataActions/DataActions.FAQ";
// import { Button, Card, Collapse, Container, Form, Modal } from "react-bootstrap";

// export const AdminCommonQuestions = () => {
//   const { t, i18n } = useTranslation();
//   let FAQlist = useSelector(s => s.DataReducer_FAQ.FAQlist);
//   let [questionsList, setQuestionsList] = useState(FAQlist);
//   const [openIndex, setOpenIndex] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [updatedQuestion, setUpdatedQuestion] = useState({ question: '', answer: '' });
//   const [newQuestion, setNewQuestion] = useState({ questionHe: '', answerHe: '', questionEn: '', answerEn: '', rating: '' });
//   const dispatch = useDispatch();
//   let erroFetch = false;

//   async function fetchData() {
//     if (FAQlist.length === 0) {
//       let result = await getCommonQuestions();
//       if (result && result.status === 200) {
//         setQuestionsList(result.data);
//         dispatch(setFAQlist(result.data));
//       } else {
//         erroFetch = true;
//       }
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (event) => {
//     setQuestionsList(FAQlist.filter(q => q[t('CommonQuestionsPage.question')].toLowerCase().includes(event.target.value.toLowerCase())));
//   };

//   const handleToggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

// const confirmDelete = async (Id) => {
//   try {
//     await deleteQuestion(Id); // שימוש בפונקציה deleteQuestion מ-Axios
//     setShowDeleteModal(false);
//     fetchData(); // רענון הנתונים לאחר מחיקה
//   } catch (error) {
//     console.error('Error confirming delete:', error);
//   }
// };

// const handleDelete = (question) => {
//   setSelectedQuestion(question);
//   setShowDeleteModal(true);
// };
 
//   const handleEdit = (question) => {
//     setSelectedQuestion(question);
//     setUpdatedQuestion({ question: question[t('CommonQuestionsPage.question')], answer: question[t('CommonQuestionsPage.answer')] });
//     setShowEditModal(true);
//   };

//   const handleAdd = () => {
//     setNewQuestion({ questionHe: '', answerHe: '', questionEn: '', answerEn: '', rating: '' });
//     setShowAddModal(true);
//   };

//   const handleAddSubmit = async () => {
//     try {
//       await addQuestion(newQuestion);
//       setShowAddModal(false);
//     } catch (error) {
//       console.error('Error adding question:', error);
//     }
//   };

//   const handleUpdate = async () => {
//     const updatedData = {
//       id: selectedQuestion.id,
//       questionHe: updatedQuestion.questionHe,
//       answerHe: updatedQuestion.answerHe,
//       questionEn: updatedQuestion.questionEn,
//       answerEn: updatedQuestion.answerEn,
//       rating: updatedQuestion.rating
//     };
//     try {
//       await updateQuestion(selectedQuestion.id, updatedData);
//       setShowEditModal(false);
//       fetchData();
//     } catch (error) {
//       console.error('Error updating question:', error);
//     }
//   };
  


//   return (
//     <div>
//       <Container>
//         <h1>{t('CommonQuestionsPage.title')}</h1>
//         <Form.Group className="mt-20">
//           <Form.Label>{t('CommonQuestionsPage.serchTitle')}</Form.Label>
//           <Form.Control type="text" placeholder="Search" onChange={handleChange} />
//         </Form.Group>
//         <Button variant="primary" onClick={() => handleAdd()}>Add New Question</Button>
//       </Container>

//       {erroFetch ? (
//         <div>
//           <h1>Network Error</h1>
//         </div>
//       ) : (
//         <Container>
//           {questionsList.map((item, index) => (
//             <Card key={index} className="mb-3">
//               <Card.Header>
//                 <Button
//                   variant="link"
//                   onClick={() => handleToggle(index)}
//                   aria-controls={`faq-collapse-${index}`}
//                   aria-expanded={openIndex === index}
//                   className="text-dark text-decoration-none w-100 text-right d-flex justify-content-between align-items-center"
//                 >
//                   {item[t('CommonQuestionsPage.question')]}
//                   <span>{openIndex === index ? '▲' : '▼'}</span>
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDelete(item.Id)}>Delete</Button>
//                 <Button variant="warning" onClick={() => handleEdit(item)}>Edit</Button>
//               </Card.Header>
//               <Collapse in={openIndex === index}>
//                 <div id={`faq-collapse-${index}`}>
//                   <Card.Body>{item[t('CommonQuestionsPage.answer')]}</Card.Body>
//                   <Card.Body>{item.rating}</Card.Body>
//                 </div>
//               </Collapse>
//             </Card>
//           ))}
//         </Container>
//       )}

//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Delete</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this question?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
//           <Button variant="danger" onClick={confirmDelete}>Delete</Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Question</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formQuestion">
//               <Form.Label>questionHe</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.question}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, question: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswer">
//               <Form.Label>questionEn</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.question}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answer: e.target.value })}
//                 required
//               />
//             </Form.Group>
//                      <Form.Group controlId="formAnswer">
//               <Form.Label>questionEn</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.question}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answer: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswer">
//               <Form.Label>answerHe</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.answer}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answer: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswer">
//               <Form.Label>answerEn</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.answer}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answer: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswer">
//               <Form.Label>rating</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.rating}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, rating: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={handleUpdate}>Update</Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//   <Modal.Header closeButton>
//     <Modal.Title>Edit Question</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <Form>
//       <Form.Group controlId="formQuestionHe">
//         <Form.Label>Question (Hebrew)</Form.Label>
//         <Form.Control
//           type="text"
//           value={updatedQuestion.questionHe}
//           onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, questionHe: e.target.value })}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="formAnswerHe">
//         <Form.Label>Answer (Hebrew)</Form.Label>
//         <Form.Control
//           type="text"
//           value={updatedQuestion.answerHe}
//           onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answerHe: e.target.value })}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="formQuestionEn">
//         <Form.Label>Question (English)</Form.Label>
//         <Form.Control
//           type="text"
//           value={updatedQuestion.questionEn}
//           onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, questionEn: e.target.value })}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="formAnswerEn">
//         <Form.Label>Answer (English)</Form.Label>
//         <Form.Control
//           type="text"
//           value={updatedQuestion.answerEn}
//           onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answerEn: e.target.value })}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="formRating">
//         <Form.Label>Rating</Form.Label>
//         <Form.Control
//           type="number"
//           value={updatedQuestion.rating}
//           onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, rating: e.target.value })}
//           required
//         />
//       </Form.Group>
//       <Button variant="primary" onClick={handleUpdate}>Update</Button>
//     </Form>
//   </Modal.Body>
// </Modal>
// <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Question</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formQuestion">
//               <Form.Label>questionHe</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.question}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, question: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswer">
//               <Form.Label>questionEn</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.question}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answer: e.target.value })}
//                 required
//               />
//             </Form.Group>
//                      <Form.Group controlId="formAnswer">
//               <Form.Label>questionEn</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.question}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answer: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswer">
//               <Form.Label>answerHe</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.answer}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answer: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswer">
//               <Form.Label>answerEn</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.answer}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answer: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswer">
//               <Form.Label>rating</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.rating}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, rating: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={handleUpdate}>Update</Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
//   <Modal.Header closeButton>
//     <Modal.Title>Edit Question</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <Form>
//       <Form.Group controlId="formQuestionHe">
//         <Form.Label>Question (Hebrew)</Form.Label>
//         <Form.Control
//           type="text"
//           value={updatedQuestion.questionHe}
//           onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, questionHe: e.target.value })}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="formAnswerHe">
//         <Form.Label>Answer (Hebrew)</Form.Label>
//         <Form.Control
//           type="text"
//           value={updatedQuestion.answerHe}
//           onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answerHe: e.target.value })}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="formQuestionEn">
//         <Form.Label>Question (English)</Form.Label>
//         <Form.Control
//           type="text"
//           value={updatedQuestion.questionEn}
//           onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, questionEn: e.target.value })}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="formAnswerEn">
//         <Form.Label>Answer (English)</Form.Label>
//         <Form.Control
//           type="text"
//           value={updatedQuestion.answerEn}
//           onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answerEn: e.target.value })}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="formRating">
//         <Form.Label>Rating</Form.Label>
//         <Form.Control
//           type="number"
//           value={updatedQuestion.rating}
//           onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, rating: e.target.value })}
//           required
//         />
//       </Form.Group>
//       <Button variant="primary" onClick={handleAddSubmit}>add</Button>
//     </Form>
//   </Modal.Body>
// </Modal>

//     </div>
//   );
// };

// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getCommonQuestions, deleteQuestion, updateQuestion, addQuestion } from "../../axios/CommonQuestionsAxios";
// import { setFAQlist } from "../../redux/DataActions/DataActions.FAQ";
// import { Button, Card, Collapse, Container, Form, Modal } from "react-bootstrap";

// export const AdminCommonQuestions = () => {
//   const { t, i18n } = useTranslation();
//   let FAQlist = useSelector(s => s.DataReducer_FAQ.FAQlist);
//   let [questionsList, setQuestionsList] = useState(FAQlist);
//   const [openIndex, setOpenIndex] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [updatedQuestion, setUpdatedQuestion] = useState({ question: '', answer: '' });
//   const [newQuestion, setNewQuestion] = useState({ questionHe: '', answerHe: '', questionEn: '', answerEn: '', rating: '' });
//   const dispatch = useDispatch();
//   let erroFetch = false;

//   async function fetchData() {
//     if (FAQlist.length === 0) {
//       let result = await getCommonQuestions();
//       if (result && result.status === 200) {
//         setQuestionsList(result.data);
//         dispatch(setFAQlist(result.data));
//       } else {
//         erroFetch = true;
//       }
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (event) => {
//     setQuestionsList(FAQlist.filter(q => q[t('CommonQuestionsPage.question')].toLowerCase().includes(event.target.value.toLowerCase())));
//   };

//   const handleToggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const confirmDelete = async (Id) => {
//     try {
//       await deleteQuestion(Id); // שימוש בפונקציה deleteQuestion מ-Axios
//       setShowDeleteModal(false);
//       fetchData(); // רענון הנתונים לאחר מחיקה
//     } catch (error) {
//       console.error('Error confirming delete:', error);
//     }
//   };

//   const handleDelete = (question) => {
//     setSelectedQuestion(question);
//     setShowDeleteModal(true);
//   };
 
//   const handleEdit = (question) => {
//     setSelectedQuestion(question);
//     setUpdatedQuestion({ question: question[t('CommonQuestionsPage.question')], answer: question[t('CommonQuestionsPage.answer')] });
//     setShowEditModal(true);
//   };

//   const handleAdd = () => {
//     setNewQuestion({ questionHe: '', answerHe: '', questionEn: '', answerEn: '', rating: '' });
//     setShowAddModal(true);
//   };

//   const handleAddSubmit = async () => {
//     try {
//       await addQuestion(newQuestion);
//       setShowAddModal(false);
//       fetchData(); // רענון הנתונים לאחר הוספה
//     } catch (error) {
//       console.error('Error adding question:', error);
//     }
//   };

//   const handleUpdate = async () => {
//     const updatedData = {
//       id: selectedQuestion.id,
//       questionHe: updatedQuestion.questionHe,
//       answerHe: updatedQuestion.answerHe,
//       questionEn: updatedQuestion.questionEn,
//       answerEn: updatedQuestion.answerEn,
//       rating: updatedQuestion.rating
//     };
//     try {
//       await updateQuestion(selectedQuestion.id, updatedData);
//       setShowEditModal(false);
//       fetchData();
//     } catch (error) {
//       console.error('Error updating question:', error);
//     }
//   };

//   return (
//     <div>
//       <Container>
//         <h1>{t('CommonQuestionsPage.title')}</h1>
//         <Form.Group className="mt-20">
//           <Form.Label>{t('CommonQuestionsPage.serchTitle')}</Form.Label>
//           <Form.Control type="text" placeholder="Search" onChange={handleChange} />
//         </Form.Group>
//         <Button variant="primary" onClick={() => handleAdd()}>Add New Question</Button>
//       </Container>

//       {erroFetch ? (
//         <div>
//           <h1>Network Error</h1>
//         </div>
//       ) : (
//         <Container>
//           {questionsList.map((item, index) => (
//             <Card key={index} className="mb-3">
//               <Card.Header>
//                 <Button
//                   variant="link"
//                   onClick={() => handleToggle(index)}
//                   aria-controls={`faq-collapse-${index}`}
//                   aria-expanded={openIndex === index}
//                   className="text-dark text-decoration-none w-100 text-right d-flex justify-content-between align-items-center"
//                 >
//                   {item[t('CommonQuestionsPage.question')]}
//                   <span>{openIndex === index ? '▲' : '▼'}</span>
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDelete(item.Id)}>Delete</Button>
//                 <Button variant="warning" onClick={() => handleEdit(item)}>Edit</Button>
//               </Card.Header>
//               <Collapse in={openIndex === index}>
//                 <div id={`faq-collapse-${index}`}>
//                   <Card.Body>{item[t('CommonQuestionsPage.answer')]}</Card.Body>
//                   <Card.Body>{item.rating}</Card.Body>
//                 </div>
//               </Collapse>
//             </Card>
//           ))}
//         </Container>
//       )}

//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Delete</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this question?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
//           <Button variant="danger" onClick={confirmDelete}>Delete</Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Question</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formQuestionHe">
//               <Form.Label>Question (Hebrew)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.questionHe}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, questionHe: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswerHe">
//               <Form.Label>Answer (Hebrew)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.answerHe}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answerHe: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formQuestionEn">
//               <Form.Label>Question (English)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.questionEn}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, questionEn: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswerEn">
//               <Form.Label>Answer (English)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.answerEn}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answerEn: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formRating">
//               <Form.Label>Rating</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={updatedQuestion.rating}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, rating: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={handleUpdate}>Update</Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Question</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formQuestionHe">
//               <Form.Label>Question (Hebrew)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newQuestion.questionHe}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, questionHe: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswerHe">
//               <Form.Label>Answer (Hebrew)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newQuestion.answerHe}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, answerHe: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formQuestionEn">
//               <Form.Label>Question (English)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newQuestion.questionEn}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, questionEn: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswerEn">
//               <Form.Label>Answer (English)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newQuestion.answerEn}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, answerEn: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formRating">
//               <Form.Label>Rating</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={newQuestion.rating}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, rating: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={handleAddSubmit}>Add</Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getCommonQuestions, deleteQuestion, updateQuestion, addQuestion } from "../../axios/CommonQuestionsAxios";
// import { setFAQlist } from "../../redux/DataActions/DataActions.FAQ";
// import { Button, Card, Collapse, Container, Form, Modal } from "react-bootstrap";

// export const AdminCommonQuestions = () => {
//   const { t, i18n } = useTranslation();
//   let FAQlist = useSelector(s => s.DataReducer_FAQ.FAQlist);
//   let [questionsList, setQuestionsList] = useState(FAQlist);
//   const [openIndex, setOpenIndex] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [updatedQuestion, setUpdatedQuestion] = useState({ questionHe: '', answerHe: '', questionEn: '', answerEn: '', rating: '' });
//   const [newQuestion, setNewQuestion] = useState({ questionHe: '', answerHe: '', questionEn: '', answerEn: '', rating: '' });
//   const dispatch = useDispatch();
//   let erroFetch = false;

//   async function fetchData() {
//     if (FAQlist.length === 0) {
//       let result = await getCommonQuestions();
//       if (result && result.status === 200) {
//         setQuestionsList(result.data);
//         dispatch(setFAQlist(result.data));
//       } else {
//         erroFetch = true;
//       }
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (event) => {
//     setQuestionsList(FAQlist.filter(q => q[t('CommonQuestionsPage.question')].toLowerCase().includes(event.target.value.toLowerCase())));
//   };

//   const handleToggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const confirmDelete = async (Id) => {
//     try {
//       await deleteQuestion(Id);
//       setShowDeleteModal(false);
//       fetchData();
//     } catch (error) {
//       console.error('Error confirming delete:', error);
//     }
//   };

//   const handleDelete = (question) => {
//     setSelectedQuestion(question);
//     setShowDeleteModal(true);
//   };

//   const handleEdit = (question) => {
//     setSelectedQuestion(question);
//     setUpdatedQuestion({
//       questionHe: question.questionHe,
//       answerHe: question.answerHe,
//       questionEn: question.questionEn,
//       answerEn: question.answerEn,
//       rating: question.rating
//     });
//     setShowEditModal(true);
//   };

//   const handleAdd = () => {
//     setNewQuestion({ questionHe: '', answerHe: '', questionEn: '', answerEn: '', rating: '' });
//     setShowAddModal(true);
//   };

//   const handleAddSubmit = async () => {
//     try {
//       await addQuestion(newQuestion);
//       setShowAddModal(false);
//       fetchData(); // רענון הנתונים לאחר הוספה
//     } catch (error) {
//       console.error('Error adding question:', error);
//     }
//   };

//   const handleUpdate = async () => {
//     const updatedData = {
//       id: selectedQuestion.id,
//       questionHe: updatedQuestion.questionHe,
//       answerHe: updatedQuestion.answerHe,
//       questionEn: updatedQuestion.questionEn,
//       answerEn: updatedQuestion.answerEn,
//       rating: updatedQuestion.rating
//     };
//     try {
//       await updateQuestion(selectedQuestion.id, updatedData);
//       setShowEditModal(false);
//       fetchData();
//     } catch (error) {
//       console.error('Error updating question:', error);
//     }
//   };

//   return (
//     <div>
//       <Container>
//         <h1>{t('CommonQuestionsPage.title')}</h1>
//         <Form.Group className="mt-20">
//           <Form.Label>{t('CommonQuestionsPage.serchTitle')}</Form.Label>
//           <Form.Control type="text" placeholder="Search" onChange={handleChange} />
//         </Form.Group>
//         <Button variant="primary" onClick={() => handleAdd()}>Add New Question</Button>
//       </Container>

//       {erroFetch ? (
//         <div>
//           <h1>Network Error</h1>
//         </div>
//       ) : (
//         <Container>
//           {questionsList.map((item, index) => (
//             <Card key={index} className="mb-3">
//               <Card.Header>
//                 <Button
//                   variant="link"
//                   onClick={() => handleToggle(index)}
//                   aria-controls={`faq-collapse-${index}`}
//                   aria-expanded={openIndex === index}
//                   className="text-dark text-decoration-none w-100 text-right d-flex justify-content-between align-items-center"
//                 >
//                   {item[t('CommonQuestionsPage.question')]}
//                   <span>{openIndex === index ? '▲' : '▼'}</span>
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDelete(item)}>Delete</Button>
//                 <Button variant="warning" onClick={() => handleEdit(item)}>Edit</Button>
//               </Card.Header>
//               <Collapse in={openIndex === index}>
//                 <div id={`faq-collapse-${index}`}>
//                   <Card.Body>{item[t('CommonQuestionsPage.answer')]}</Card.Body>
//                   <Card.Body>{item.rating}</Card.Body>
//                 </div>
//               </Collapse>
//             </Card>
//           ))}
//         </Container>
//       )}

//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Delete</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this question?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
//           <Button variant="danger" onClick={() => confirmDelete(selectedQuestion.Id)}>Delete</Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Question</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formQuestionHe">
//               <Form.Label>Question (Hebrew)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.questionHe}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, questionHe: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswerHe">
//               <Form.Label>Answer (Hebrew)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.answerHe}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answerHe: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formQuestionEn">
//               <Form.Label>Question (English)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.questionEn}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, questionEn: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswerEn">
//               <Form.Label>Answer (English)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={updatedQuestion.answerEn}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answerEn: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formRating">
//               <Form.Label>Rating</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={updatedQuestion.rating}
//                 onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, rating: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={handleUpdate}>Update</Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Question</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formQuestionHe">
//               <Form.Label>Question (Hebrew)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newQuestion.questionHe}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, questionHe: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswerHe">
//               <Form.Label>Answer (Hebrew)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newQuestion.answerHe}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, answerHe: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formQuestionEn">
//               <Form.Label>Question (English)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newQuestion.questionEn}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, questionEn: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAnswerEn">
//               <Form.Label>Answer (English)</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newQuestion.answerEn}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, answerEn: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formRating">
//               <Form.Label>Rating</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={newQuestion.rating}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, rating: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={handleAddSubmit}>Add</Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCommonQuestions, deleteQuestion, updateQuestion, addQuestion } from "../../axios/CommonQuestionsAxios";
import { setFAQlist } from "../../redux/DataActions/DataActions.FAQ";
import { Button, Card, Collapse, Container, Form, Modal } from "react-bootstrap";

export const AdminCommonQuestions = () => {
  const { t, i18n } = useTranslation();
  let FAQlist = useSelector(s => s.DataReducer_FAQ.FAQlist);
  let [questionsList, setQuestionsList] = useState(FAQlist);
  const [openIndex, setOpenIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [updatedQuestion, setUpdatedQuestion] = useState({ questionHe: '', answerHe: '', questionEn: '', answerEn: '', rating: '' });
  const [newQuestion, setNewQuestion] = useState({ questionHe: '', answerHe: '', questionEn: '', answerEn: '', rating: '' });
  const dispatch = useDispatch();
  let erroFetch = false;

  async function fetchData() {
    if (FAQlist.length === 0) {
      let result = await getCommonQuestions();
      if (result && result.status === 200) {
        setQuestionsList(result.data);
        dispatch(setFAQlist(result.data));
      } else {
        erroFetch = true;
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setQuestionsList(FAQlist.filter(q => q[t('CommonQuestionsPage.question')].toLowerCase().includes(event.target.value.toLowerCase())));
  };

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const confirmDelete = async () => {
    if (selectedQuestion) {
      try {
        await deleteQuestion(selectedQuestion.id);
        setShowDeleteModal(false);
        fetchData();
      } catch (error) {
        console.error('Error confirming delete:', error);
      }
    }
  };

  const handleDelete = (question) => {
    setSelectedQuestion(question);
    setShowDeleteModal(true);
  };

  const handleEdit = (question) => {
    setSelectedQuestion(question);
    setUpdatedQuestion({
      questionHe: question.questionHe,
      answerHe: question.answerHe,
      questionEn: question.questionEn,
      answerEn: question.answerEn,
      rating: question.rating
    });
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setNewQuestion({ questionHe: '', answerHe: '', questionEn: '', answerEn: '', rating: '' });
    setShowAddModal(true);
  };

  const handleAddSubmit = async () => {
    try {
      await addQuestion(newQuestion);
      setShowAddModal(false);
      fetchData(); // רענון הנתונים לאחר הוספה
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleUpdate = async () => {
    const updatedData = {
      id: selectedQuestion.id,
      questionHe: updatedQuestion.questionHe,
      answerHe: updatedQuestion.answerHe,
      questionEn: updatedQuestion.questionEn,
      answerEn: updatedQuestion.answerEn,
      rating: updatedQuestion.rating
    };
    try {
      await updateQuestion(selectedQuestion.id, updatedData);
      setShowEditModal(false);
      fetchData();
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div>
      <Container>
        <h1>{t('CommonQuestionsPage.title')}</h1>
        <Form.Group className="mt-20">
          <Form.Label>{t('CommonQuestionsPage.serchTitle')}</Form.Label>
          <Form.Control type="text" placeholder="Search" onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" onClick={() => handleAdd()}>Add New Question</Button>
      </Container>

      {erroFetch ? (
        <div>
          <h1>Network Error</h1>
        </div>
      ) : (
        <Container>
          {questionsList.map((item, index) => (
            <Card key={index} className="mb-3">
              <Card.Header>
                <Button
                  variant="link"
                  onClick={() => handleToggle(index)}
                  aria-controls={`faq-collapse-${index}`}
                  aria-expanded={openIndex === index}
                  className="text-dark text-decoration-none w-100 text-right d-flex justify-content-between align-items-center"
                >
                  {item[t('CommonQuestionsPage.question')]}
                  <span>{openIndex === index ? '▲' : '▼'}</span>
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item)}>Delete</Button>
                <Button variant="warning" onClick={() => handleEdit(item)}>Edit</Button>
              </Card.Header>
              <Collapse in={openIndex === index}>
                <div id={`faq-collapse-${index}`}>
                  <Card.Body>{item[t('CommonQuestionsPage.answer')]}</Card.Body>
                  <Card.Body>{item.rating}</Card.Body>
                </div>
              </Collapse>
            </Card>
          ))}
        </Container>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this question?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formQuestionHe">
              <Form.Label>Question (Hebrew)</Form.Label>
              <Form.Control
                type="text"
                value={updatedQuestion.questionHe}
                onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, questionHe: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAnswerHe">
              <Form.Label>Answer (Hebrew)</Form.Label>
              <Form.Control
                type="text"
                value={updatedQuestion.answerHe}
                onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answerHe: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formQuestionEn">
              <Form.Label>Question (English)</Form.Label>
              <Form.Control
                type="text"
                value={updatedQuestion.questionEn}
                onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, questionEn: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAnswerEn">
              <Form.Label>Answer (English)</Form.Label>
              <Form.Control
                type="text"
                value={updatedQuestion.answerEn}
                onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, answerEn: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                value={updatedQuestion.rating}
                onChange={(e) => setUpdatedQuestion({ ...updatedQuestion, rating: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdate}>Update</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formQuestionHe">
              <Form.Label>Question (Hebrew)</Form.Label>
              <Form.Control
                type="text"
                value={newQuestion.questionHe}
                onChange={(e) => setNewQuestion({ ...newQuestion, questionHe: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAnswerHe">
              <Form.Label>Answer (Hebrew)</Form.Label>
              <Form.Control
                type="text"
                value={newQuestion.answerHe}
                onChange={(e) => setNewQuestion({ ...newQuestion, answerHe: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formQuestionEn">
              <Form.Label>Question (English)</Form.Label>
              <Form.Control
                type="text"
                value={newQuestion.questionEn}
                onChange={(e) => setNewQuestion({ ...newQuestion, questionEn: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAnswerEn">
              <Form.Label>Answer (English)</Form.Label>
              <Form.Control
                type="text"
                value={newQuestion.answerEn}
                onChange={(e) => setNewQuestion({ ...newQuestion, answerEn: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                value={newQuestion.rating}
                onChange={(e) => setNewQuestion({ ...newQuestion, rating: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddSubmit}>Add</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
