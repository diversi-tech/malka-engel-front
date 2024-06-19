import React from 'react';
import { useTranslation } from 'react-i18next';
//Home page
export const DesignerBirkins = () => {
    const { t, i18n } = useTranslation();
    return (
       <div>
        <h1>{t('designerBirkinsPage.title')}</h1>
        
       </div>
    );
}