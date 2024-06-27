import React, { useState } from 'react';
import { loginUser } from './ClientApi.js/Api';
import { useTranslation } from 'react-i18next';
import { PageTitle } from './PageTitle';

export const Login = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8; 
  };

  const handleLogin = async () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError(t('loginPage.invalidEmail'));
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password should be at least 8 characters long');
      setPasswordError(t('loginPage.invalidPassword'));

      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {
        const userData = { email, password };
        const response = await loginUser(userData);
        console.log('Login Successful:', response);
        // ניתן להתעלם מהקונסול ולעבור לתצוגה מתאימה למשתמש
      } catch (error) {
        console.error('Login Failed:', error);
        // טיפול בטעות בהתאם
      }
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
      
      <button onClick={handleLogin}>{t('loginPage.loginButton')}</button>
    </div>
  );
};
