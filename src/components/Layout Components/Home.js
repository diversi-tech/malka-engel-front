import { useTranslation } from 'react-i18next';
import { RecommendedProducts } from '../What is/RecommendedProducts';
import Banner  from './Banner';
//Home page
export const Home = () => {
    const { t, i18n } = useTranslation();
    return (
       <div>
        <Banner/>
        {/* <h1>{t('homePage.title')}</h1> */}
        <RecommendedProducts/>
       </div>
    );
}


