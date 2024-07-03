import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
<<<<<<<< HEAD:src/components/User/Login.js
import { PageTitle } from '../Empty pages/PageTitle';
========
>>>>>>>> b4aefbcb798f5ede078e3382569b4af91c233c86:src/components/User Forms/SignIn.js
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { GetAllUsers, LoginUser } from '../../axios/UsersAxios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { connect, setCurrentUser } from '../../redux/DataActions/DataAction.Users';


export const Login = () => {
  debugger
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState({});

  //יצירת משנה שישמש לשיגור
  const dispatch = useDispatch()

  //יצירת משנה שישמש לניווט
  const navigate = useNavigate()
//משתנים לבדיקות תקינות 
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
 

//בדיקות תקינות למייל וסיסמא
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password != null && password.length >= 8; 
  };
const faCheck=(e)=>{
  if (!validateEmail(e)) {
    setEmailError(t('loginPage.invalidEmail'));
  } 
  else{setEmailError(''); }
}
//--------------------------------------------------------------------------

//Function to handle login
const handleLogin = async ()=>{
  let isValid = true;
  //Check email
      if (!validateEmail(user.email)) {
        setEmailError(t('loginPage.invalidEmail'));
        isValid = false;
      } 
      else{setEmailError(''); }
     
  // //Check password   
      if (!validatePassword(user.password)) {
        setPasswordError(t('loginPage.invalidPassword'));
        isValid = false;
      }
       else {setPasswordError('');}  

  //The Email & the password are valid
      if (isValid) {
        
  //Go to DB ......
    let userLogin = await LoginUser(user.email, user.password); 
    if(userLogin != null && userLogin.status == 200){
     //User exists in the database
     debugger
     dispatch(setCurrentUser(userLogin.data));
     dispatch(connect())
   //Go to Home page
      navigate('/myResetPasswordLink')
     //popup - nevigate
     //save in cookies
    }
    else if (userLogin == null) alert("Network Error")
    else{
      alert("Plese sighn up") 
      navigate('/mySignUp')


    }
}
}

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
    <Row className="w-100">
      <Col xs={12} md={6} lg={4} className="mx-auto">
        <h3 className="text-center mb-4">{t('loginPage.title')}</h3>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> {t('loginPage.email')}</Form.Label>
            <Form.Control type="email"
             onChange={(e) => {setUser({ ...user, email: e.target.value })}} />
              {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label> {t('loginPage.password')} 
            </Form.Label>
            <Form.Control type="password" 
             onChange={(e) => setUser({ ...user, password: e.target.value }) }/>
              {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
              <a href="/myResetPassword">{t('loginPage.forgot') }</a>
          </Form.Group>

          <Button className="w-100 mt-3" onClick={()=>handleLogin()}>
          {t('loginPage.loginButton')}
          </Button>
          <div className="text-center mt-3">   {t('loginPage.noAccount')}
          <a  href="./mySignUp">{t('loginPage.createAccount') }</a>
         </div>
        </Form>
      </Col>
    </Row>
  </Container>
);
 
};
