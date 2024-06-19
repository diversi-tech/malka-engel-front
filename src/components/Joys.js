import React from 'react';
import { useTranslation } from 'react-i18next';
//Home page
export const Joys = () => {
    const { t, i18n } = useTranslation();
    return (
       <div>
        <h1>{t('joysPage.title')}</h1>
        
       </div>
    );
}