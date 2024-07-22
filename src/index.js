import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './components/i18n/en.json';
import heTranslation from './components/i18n/he.json';
import theme from './createTheme';
import { ThemeProvider } from '@mui/material';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <div dir="rtl">
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>
);


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      he: { translation: heTranslation }
    },
    lng: 'he', // // שפת ברירת המחדל
    fallbackLng: 'he', // שפת ניפוי אם אין תרגום שנמצא
    interpolation: {
      escapeValue: false // React כבר יוצא מצב יציאה
    }
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals



export default i18n;

reportWebVitals();

