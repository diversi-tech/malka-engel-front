import React, { useState } from 'react';
import { registerUser } from '../ClientApi.js/Api';
import { useAuth } from '../ClientApi.js/AuthContext';
import { useTranslation } from 'react-i18next';


const RegistrationForm = () => {
    const { t, i18n } = useTranslation();
    const { loginUser } = useAuth(); 
    const { state, dispatch } = useAuth(); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            const userData = { name, email, phone, password };
            const response = await registerUser(userData);
            console.log('Registration Successful:', response);

            // לאחר הרישום, התחבר אוטומטית למערכת
            loginUser(response); // הכנסת המשתמש למערכת אימות
        } catch (error) {
            console.error('Registration Failed:', error);
            // טיפול בטעות בהתאם
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister} disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </div>
    );
};

export default RegistrationForm;
