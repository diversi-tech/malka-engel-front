import { Link, Outlet } from "react-router-dom"
import { useTranslation } from 'react-i18next';

//Footer page
export const Footer = () => {

  const { t, i18n } = useTranslation();
  return (

  <footer >
      <Link to="./myCommonQuestions" className="text-white text-decoration-none me-3">{t('footerPage.linkCommonQuestions')}</Link>
      <Link to="./MyAccount" className="text-white text-decoration-none me-3">{t('footerPage.linkMyAccount')}</Link>
      <Link to="./myContact" className="text-white text-decoration-none me-3">{t('footerPage.linkContact')}</Link>
      <Link to="./myDesignerBirkins" className="text-white text-decoration-none me-3">{t('footerPage.linkDesignerBirkins')}</Link>
      <Link to="./myCongratulationsToTheDonors" className="text-white text-decoration-none me-3">{t('footerPage.linkCongratulationsToTheDonors')}</Link>
      <Link to="./myJoys" className="text-white text-decoration-none me-3">{t('footerPage.linkJoys')}</Link>
      <Link to="./myEvents" className="text-white text-decoration-none me-3">{t('footerPage.linkEvents')}</Link>
      <Link to="./myLogin" className="text-white text-decoration-none me-3">{t('footerPage.linkLogin')}</Link>
      <Link to="./myTerms" className="text-white text-decoration-none me-3">{t('footerPage.linkTerms')}</Link>
      <Link to="./myProduct" className="text-white text-decoration-none me-3">product</Link>
      <h5 className="text-white text-decoration-none me-3"  >כל הזכויות שמורות@</h5>


    </footer>
  );
}