import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from './PageTitle';

//Events page
export const Events = () => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            <PageTitle title={t('eventsPage.title')} />
        </div>        
    );
}