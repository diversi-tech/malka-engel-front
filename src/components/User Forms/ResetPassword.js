import React,{ useState } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ResetPassword=()=>{

    const { t, i18n } = useTranslation();
    const [user, setUser] = useState({});
    const [emailError, setEmailError] = useState('');
//Pupup 
const [showModal, setShowModal] = useState(true);
const handleClose = () => {navigate(-2)};    
  //יצירת משנה שישמש לניווט
  const navigate = useNavigate()
//בדיקות תקינות למייל
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
//On click function
const handleClick=() => {
    if (!validateEmail(user.email)) {
        setEmailError(t('resetPasswordPage.invalidEmail'));
    }
    else{
        setEmailError('');
    //Send a Email to Rest the password
//כאן צריך להיות פעולה של שליחת מייל 
//המייל יכנס ל - '/myResetPasswordLink'
//Go back
navigate(-2) 

    }
}
const style3={
    ' width': '100%',
    ' height': '700px',
     'border': '5px'
   }
return<>

<Modal show={showModal} onHide={handleClose}  centered> 
    <Modal.Body>
{/*  */}
<Container className="d-flex justify-content-center align-items-center vh-50" style={style3}>
    <Row className="w-100">
      <Col xs={80} md={50} lg={100} className="mx-auto">
        <Form className='align-auto'>
            <h3>{t('resetPasswordPage.title')}</h3>
          <Form.Group controlId="formBasicEmail">
            <Form.Label > {t('resetPasswordPage.putEmail')}</Form.Label>
            <Form.Control type="email"
             onChange={(e) => {setUser({ ...user, email: e.target.value })}} />
              {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          </Form.Group>

          <Button className="w-100 mt-3" onClick={()=>handleClick()}>
          {t('resetPasswordPage.resetButton')}
          </Button>
          </Form>
      </Col>
    </Row>
  </Container>
{/*  */}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      {/* Add additional buttons if needed */}
    </Modal.Footer>
  </Modal>
 
      
);
  </>
};
