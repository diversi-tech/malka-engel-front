import React,{ useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PutUser, ResetPas } from '../../axios/UsersAxios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useValidation from './useValidation';
import { ValidToken } from '../../axios/TokenAxios';



export const ResetPasTakeCare=()=>{
    const { t, i18n } = useTranslation();
    const { token } = useParams();

    const [pas, setPas] = useState({});
    const [passwordError1, setPasswordError] = useState('');
    const currentUser = useSelector(s=>s.DataReducer_Users.currentUser);
    const [current, setCurrent] = useState(currentUser)
const navigate = useNavigate()
    //Pupup 
const [showModal, setShowModal] = useState(false);
const handleClose = () => {window.close()};


 //Custom Hook for Validation
 const {passwordError, passwordComfirmError, validPasswordError, invalidPasswordConfirmation} = useValidation()
 const [resetSec, setRestSec] = useState(false);
 //check valid token
 const validToken = async()=>{
  debugger
  const result = await ValidToken(token)
  if(result.data)
   setShowModal(true)
  else{
    navigate(`/myErrorPage/${404}/${"דף לא נמצא"}/${"close"}`)
  }  
 }
//On click function
const handleClick=async() => {
    //בדיקות תקינות הקלטים    
    if(validPasswordError(pas.password1,pas.password2)) {
        debugger
        //לשנות את הסיסמא עבור המשתמש
        //----------------------------------------------------------------
        let result = await ResetPas(token, pas.password1)
        if(result != null && result.data) {
           setRestSec (true)
        }
           
        
             else
                alert('Network error')
             
       } 
}

const style3={
    ' width': '100%',
    ' height': '700px',
     'border': '5px'
   }

   useEffect(() => {
    validToken();
}, []);   
return (
    

<Modal show={showModal} onHide={handleClose}  centered> 
    <Modal.Body>
{/*  */}
{resetSec?(
  <h2 className="text-center">{t('resetPasswordCarePage.alertMessage')}</h2>
):(
<Container className="d-flex justify-content-center align-items-center vh-50" style={style3}>
    <Row className="w-100">
      <Col xs={80} md={50} lg={100} className="mx-auto">
        <h3 className="text-center mb-4">{t('resetPasswordCarePage.title')}</h3>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> {t('resetPasswordCarePage.password1')}</Form.Label>
            <Form.Control type="password" 
             onChange={(e) => {validPasswordError(pas.password1, pas.password2);setPas({ ...pas, password1: e.target.value })}} />
            {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> {t('resetPasswordCarePage.password2')}</Form.Label>
            <Form.Control  type="password" 
             onChange={(e) => {validPasswordError(pas.password1, pas.password2);setPas({ ...pas, password2: e.target.value })}} />
             {passwordComfirmError && <div style={{ color: 'red' }}>{passwordComfirmError}</div>}

          </Form.Group>
          <Button className="w-100 mt-3" onClick={()=>handleClick()}>
          {t('resetPasswordCarePage.resetButton')}
          </Button>
          </Form>
      </Col>
    </Row>
  </Container>)}
{/*  */}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      {/* Add additional buttons if needed */}
    </Modal.Footer>
  </Modal>
  
)}
 
