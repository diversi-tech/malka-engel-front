import React,{ useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PutUser } from '../../axios/UsersAxios';



export const ResetPasTakeCare=()=>{
    const { t, i18n } = useTranslation();
    const [pas, setPas] = useState({});
    const [passwordError, setPasswordError] = useState('');
    const currentUser = useSelector(s=>s.DataReducer_Users.currentUser);
    const [current, setCurrent] = useState(currentUser)

    //בדיקות תקינות לסיסמא
const validatePassword = (password) => {
    return password != null && password.length >= 8; 
  };
  const invalidPasswordConfirmation = (password1, password2) => {
    return password1 == password2
  };
//On click function
const handleClick=async() => {
    let isValid = true;
    if (!validatePassword(pas.password1)) {
        setPasswordError(t('resetPasswordCarePage.invalidPassword'));
        isValid = false;
      }

      else if (!invalidPasswordConfirmation(pas.password1, pas.password2)) {
        setPasswordError(t('resetPasswordCarePage.invalidPasswordConfirmation'));
        isValid = false;
      }
       else {setPasswordError('');    
         isValid = true;
       } 
       if(isValid) {
        debugger
        //לשנות את הסיסמא עבור המשתמש
        //----------------------------------------------------------------
        setCurrent({...current, passwordHash: pas.password1});
        let result = await PutUser(current)
        if(result != null && result.status == 200) {
            alert(t('resetPasswordCarePage.alertMessage'))}
else 
    alert('Network error')

       } 
}
return <>
    <Container className="d-flex justify-content-center align-items-center vh-100">
    <Row className="w-100">
      <Col xs={12} md={6} lg={4} className="mx-auto">
        <h3 className="text-center mb-4">{t('resetPasswordCarePage.title')}</h3>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> {t('resetPasswordCarePage.password1')}</Form.Label>
            <Form.Control type="password" 
             onChange={(e) => {setPas({ ...pas, password1: e.target.value })}} />
            {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> {t('resetPasswordCarePage.password2')}</Form.Label>
            <Form.Control  type="password" 
             onChange={(e) => {setPas({ ...pas, password2: e.target.value })}} />
             {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

          </Form.Group>
          <Button className="w-100 mt-3" onClick={()=>handleClick()}>
          {t('resetPasswordCarePage.resetButton')}
          </Button>
          </Form>
      </Col>
    </Row>
  </Container>
  </>
}