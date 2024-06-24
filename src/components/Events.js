import React from 'react';
import { useTranslation } from 'react-i18next';
//Events page
export const Events = () => {
    const { t, i18n } = useTranslation();
    return (
       <div>
        <h1>{t('eventsPage.title')}</h1>
        
       </div>
    );
}