import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

//Footer page


export const Footer = () => {

  const { t, i18n } = useTranslation();
  return (

      <footer class="bg-dark text-white p-3 fixed-bottom">
        <Link  to="./CommonQuestions" className="text-white text-decoration-none me-3">{t('footerpage.linkCommonQuestions')}</Link>
        <Link  to="./MyAccount" className="text-white text-decoration-none me-3">{t('footerpage.linkMyAccount')}</Link>
        <Link  to="./Contact" className="text-white text-decoration-none me-3">{t('footerpage.linkContact')}</Link>
        <Link  to="./DesignerBirkins" className="text-white text-decoration-none me-3">{t('footerpage.linkDesignerBirkins')}</Link>
        <Link  to="./CongratulationsToTheDonors" className="text-white text-decoration-none me-3">{t('footerpage.linkCongratulationsToTheDonors')}</Link>
        <Link  to="./Joys" className="text-white text-decoration-none me-3">{t('footerpage.linkJoys')}</Link>
        <Link  to="./Events" className="text-white text-decoration-none me-3">{t('footerpage.linkEvents')}</Link>
        <Link  to="./Login" className="text-white text-decoration-none me-3">{t('footerpage.linkLogin')}</Link>
        <Link  to="./Terms" className="text-white text-decoration-none me-3">{t('footerpage.linkTerms')}</Link>
        
       

      </footer>
  );
}

