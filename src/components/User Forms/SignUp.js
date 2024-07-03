import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { connect, setCurrentUser } from '../../redux/DataActions/DataAction.Users';
import { LoginUser, PostUser } from '../../axios/UsersAxios';


const SignUp = () => {
    const { t, i18n } = useTranslation();
   const [newUser, setNewUser] = useState(
    {
      "userID": 0,
      "name": "string",
      "email": "string",
      "phoneNumber": "string",
      "passwordHash": "string",
      "createdAt": "2024-07-02T09:30:07.640Z",
      "typeID": 1,
      "credits": 0
    }
   );
 //יצירת משנה שישמש לשיגור
 const dispatch = useDispatch()

 //יצירת משנה שישמש לניווט
 const navigate = useNavigate()
 
 const [emailError, setEmailError] = useState('');
 const [passwordError, setPasswordError] = useState('');
 const [phoneNumberError, setPhoneNumberError] = useState('');


// בדיקות תקינות למייל ,סיסמא וטלפון
 const validateEmail = (email) => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
 };

 const validatePassword = (password) => {
   return password != null && password.length >= 8; 
 };
 const validatePhone = (phone) => {
  // בדיקה של מספר ישראלי עם קידומת בינלאומית או מקומית
  const re = /^(\+972|0)?[5-9]\d{8}$/;
  return re.test(phone);
};
 //--------------------------------------------------------------------------

//Function to handle Register
    const handleRegister = async () => {
        let isValid = true;
        //Check email
            if (!validateEmail(newUser.email)) {
              setEmailError(t('loginPage.invalidEmail'));
              isValid = false;
            } 
            else{setEmailError(''); }
           
        //Check password   
            if (!validatePassword(newUser.passwordHash)) {
              setPasswordError(t('loginPage.invalidPassword'));
              isValid = false;
            }
             else {setPasswordError('');} 
        //Check Phone Number
        if (!validatePhone(newUser.phoneNumber)) {
          setPhoneNumberError(t('loginPage.invalidphoneNumber'));
          isValid = false;
        }
         else {setPhoneNumberError('');}   
       //type----
       if(newUser.typeID)
        newUser.typeID = 2
      else{
        newUser.typeID = 1

      }
        //The Email & the password are valid
            if (isValid) {
        // //Go to DB ......
        debugger
          let postUser = await PostUser(newUser); 
          if(postUser != null && postUser.status == 200){
           //User post successfully!
           debugger
           dispatch(connect())
           let userLogin = await LoginUser(newUser.email, newUser.passwordHash); 
           dispatch(setCurrentUser(userLogin.data));
           alert("Thank you!"); 
         //Go to Home page
            navigate('/myHome')
        //    popup - nevigate
        //    save in cookies
          
        
          }
          else
          alert("Error while registering")
         } 
    };

    return (<>

        <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100">
          <Col xs={4} md={1} lg={4} className="mx-auto">
            <h3 className="text-center mb-4">{t('signUpPage.title')}</h3>
            <Form>
                
            <Form.Group controlId="formBasicName">
                <Form.Label> {t('signUpPage.userName')}</Form.Label>
                <Form.Control type="text"
                 onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
              </Form.Group>

              <Form.Group controlId="formBasicPhoneNuber">
                <Form.Label> {t('signUpPage.phoneNumber')}</Form.Label>
                <Form.Control type="phoneNumber"
                 onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })} />
                  {phoneNumberError && <div style={{ color: 'red' }}>{t('signUpPage.invalidphoneNumber')}</div>}
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label> {t('signUpPage.email')}</Form.Label>
                <Form.Control type="email"
                 onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                  {emailError && <div style={{ color: 'red' }}>{t('signUpPage.invalidEmail')}</div>}
              </Form.Group>
{/*  */}
              <Form.Group controlId="formType">
                <input type="checkbox"
                 onChange={(e) => setNewUser({ ...newUser,typeID : e.target.checked})} />
              <Form.Label> {t('signUpPage.typeName')}</Form.Label>
              </Form.Group>

{/*  */}
              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label> {t('signUpPage.password')}</Form.Label>
                <Form.Control type="password" 
                 onChange={(e) => setNewUser({ ...newUser, passwordHash: e.target.value })}/>
                  {passwordError && <div style={{ color: 'red' }}>{t('signUpPage.invalidPassword')}</div>}
              </Form.Group>
    



              <Button className="w-100 mt-3" onClick={()=>handleRegister()}>
              {t('signUpPage.loginButton')}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      </>
    );
};
export default SignUp
