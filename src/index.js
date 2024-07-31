import React, { useState, useEffect } from 'react';
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
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import stylisRTLPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      he: { translation: heTranslation }
    },
    lng: 'he', // Default language
    fallbackLng: 'he',
    interpolation: {
      escapeValue: false // React already handles escaping
    }
  });

// Function to create cache based on language
const createCacheForLanguage = (language) => {
  return language === 'en' ? createCache({
    key: 'mui',
    stylisPlugins: [prefixer],
    color: '#0D1E46',
  }) : createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, stylisRTLPlugin],
    color: '#0D1E46',
  });
};

// Main component that manages the cache
const Main = () => {
  const [cache, setCache] = useState(createCacheForLanguage(i18n.language));

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCache(createCacheForLanguage(lng));
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </CacheProvider>
  );
};

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

reportWebVitals();
