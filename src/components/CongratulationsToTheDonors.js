import React from 'react';
import { useTranslation } from 'react-i18next';
//Home page
export const CongratulationsToTheDonors = () => {
    const { t, i18n } = useTranslation();
    return (
       <div>
        <h1>{t('congratulationsToTheDonorsPage.title')}</h1>
        
       </div>
    );
}