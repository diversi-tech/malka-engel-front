import { useTranslation } from 'react-i18next';
import { RecommendedProducts } from '../../RecommendedProducts';


//Home page
export const Home = () => {
    const { t, i18n } = useTranslation();
    return (
       <div>
        {/* <h1>{t('homePage.title')}</h1> */}
        <RecommendedProducts/>
       </div>
    );
}


