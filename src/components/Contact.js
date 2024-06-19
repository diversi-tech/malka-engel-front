import { useTranslation } from 'react-i18next';


//Contact page
export const Contact = () => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            <h1>{t('contactPage.title')}</h1>
            
            <h5>{t('contactPage.h5contact')}</h5>
        </div>
     );
}
