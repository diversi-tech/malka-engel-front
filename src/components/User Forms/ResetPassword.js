import React,{ useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ResetPassword=()=>{

    const { t, i18n } = useTranslation();
    const [user, setUser] = useState({});
    const [emailError, setEmailError] = useState('');
    
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
alert("נשלח מייל לאיפוס הסיסמא")
navigate('/myResetPasswordLink')

    }
}
return<>
    <Container className="d-flex justify-content-center align-items-center vh-100">
    <Row className="w-100">
      <Col xs={12} md={6} lg={4} className="mx-auto">
        <h3 className="text-center mb-4">{t('resetPasswordPage.title')}</h3>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> {t('resetPasswordPage.putEmail')}</Form.Label>
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
  </>

}
