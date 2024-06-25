import React, { useState } from 'react';
import { loginUser } from './ClientApi.js/Api';
import { useTranslation } from 'react-i18next';
import { PageTitle } from './PageTitle';

export const Login = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userData = { email, password };
      const response = await loginUser(userData);
      console.log('Login Successful:', response);
      // ניתן להתעלם מהקונסול ולעבור לתצוגה מתאימה למשתמש
    } catch (error) {
      console.error('Login Failed:', error);
      // טיפול בטעות בהתאם
    }
  };

  return (
    <div>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};