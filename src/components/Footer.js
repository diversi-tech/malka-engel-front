import { Link, Outlet } from "react-router-dom"
import { useTranslation } from 'react-i18next';

//Footer page
export const Footer = () => {

  const { t, i18n } = useTranslation();
  return (

    <footer class=" mt-auto py-3 bg-dark text-white" 
     
    >
      <Link to="./myCommonQuestions" className="text-black text-decoration-none me-3">{t('footerPage.linkCommonQuestions')}</Link>
      <Link to="./MyAccount" className="text-black text-decoration-none me-3">{t('footerPage.linkMyAccount')}</Link>
      <Link to="./myContact" className="text-black text-decoration-none me-3">{t('footerPage.linkContact')}</Link>
      <Link to="./myDesignerBirkins" className="text-black text-decoration-none me-3">{t('footerPage.linkDesignerBirkins')}</Link>
      <Link to="./myCongratulationsToTheDonors" className="text-black text-decoration-none me-3">{t('footerPage.linkCongratulationsToTheDonors')}</Link>
      <Link to="./myJoys" className="text-black text-decoration-none me-3">{t('footerPage.linkJoys')}</Link>
      <Link to="./myEvents" className="text-black text-decoration-none me-3">{t('footerPage.linkEvents')}</Link>
      <Link to="./myLogin" className="text-black text-decoration-none me-3">{t('footerPage.linkLogin')}</Link>
      <Link to="./myTerms" className="text-black text-decoration-none me-3">{t('footerPage.linkTerms')}</Link>
      <Link to="./myProduct" className="text-black text-decoration-none me-3">product</Link>
      <h5 className="text-black text-decoration-none me-3">כל הזכויות שמורות@</h5>


    </footer>
  );
}




