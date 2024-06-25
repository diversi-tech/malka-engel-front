import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from './PageTitle';

//Home page
export const CongratulationsToTheDonors = () => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            <PageTitle title={t('congratulationsToTheDonorsPage.title')} />
        </div>
    );
}