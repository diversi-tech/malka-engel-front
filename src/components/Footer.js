import { Link, Outlet } from "react-router-dom"

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

//Footer page


export const Footer = () => {

  const { t, i18n } = useTranslation();
  return (

      <footer class="bg-dark text-white p-3 fixed-bottom">
        <Link  to="./CommonQuestions" className="text-white text-decoration-none me-3">{t('footerPage.linkCommonQuestions')}</Link>
        <Link  to="./MyAccount" className="text-white text-decoration-none me-3">{t('footerPage.linkMyAccount')}</Link>
        <Link  to="./Contact" className="text-white text-decoration-none me-3">{t('footerPage.linkContact')}</Link>
        <Link  to="./DesignerBirkins" className="text-white text-decoration-none me-3">{t('footerPage.linkDesignerBirkins')}</Link>
        <Link  to="./CongratulationsToTheDonors" className="text-white text-decoration-none me-3">{t('footerPage.linkCongratulationsToTheDonors')}</Link>
        <Link  to="./Joys" className="text-white text-decoration-none me-3">{t('footerPage.linkJoys')}</Link>
        <Link  to="./Events" className="text-white text-decoration-none me-3">{t('footerPage.linkEvents')}</Link>
        <Link  to="./Login" className="text-white text-decoration-none me-3">{t('footerPage.linkLogin')}</Link>
        <Link  to="./Terms" className="text-white text-decoration-none me-3">{t('footerPage.linkTerms')}</Link>
      
       

      </footer>
  );
}

