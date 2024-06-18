// Login.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t, i18n } = useTranslation();

    const handleLogin = () => {
        // Handle login logic here
    };

    return (
        <div>
            <h2>{t('loginPage.title')}</h2>
            <form onSubmit={handleLogin}>
                <label>{t('loginPage.username')}</label>
                <input type="text" name="username" />
                <label>{t('loginPage.password')}</label>
                <input type="password" name="password" />
                <button type="submit">{t('loginPage.loginButton')}</button>
            </form>
        </div>
    );
};

export default Login;
