import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const useValidation = () => {
    const { t, i18n } = useTranslation();

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [isValid, setIsValid] = useState(true);
// בדיקות תקינות למייל ,סיסמא וטלפון
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
 
  const validatePassword = (password) => {
    return password != null && password.length >= 8; 
  };
  const invalidPasswordConfirmation = (password1, password2) => {
    return password1 == password2
  };
  const validatePhone = (phone) => {
   // בדיקה של מספר ישראלי עם קידומת בינלאומית או מקומית
   const re = /^(\+972|0|02)?[5-9]\d{8}$/;
   return re.test(phone);
  }

   const validForm = (newUser) => {
   debugger  
   //Check email
       if (!validateEmail(newUser.email)) {
         setEmailError(t('loginPage.invalidEmail'));
         setIsValid(false);
       } 
       else{setEmailError(''); }
   
   //Check password   
       if (!validatePassword(newUser.passwordHash)) {
         setPasswordError(t('loginPage.invalidPassword'));
         setIsValid(false);
       }
        else {setPasswordError('');} 
   //Check Phone Number
   if(newUser.phoneNumber != null){
   if (!validatePhone(newUser.phoneNumber)) {
     setPhoneNumberError(t('loginPage.invalidphoneNumber'));
     setIsValid(false);
    }
    else {setPhoneNumberError('');} } 
    debugger 
    return isValid;
 }
  

  return {
    validatePhone,
    validateEmail,
    validatePassword,
    invalidPasswordConfirmation,
    phoneNumberError,
    passwordError,
    emailError,
    validForm
  };
};

export default useValidation;
