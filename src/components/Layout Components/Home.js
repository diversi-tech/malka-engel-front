import { useTranslation } from 'react-i18next';
import { RecommendedProducts } from '../What is/RecommendedProducts';
import Banner  from './Banner';
import { EmailForm } from '../Email/EmailForm';
import { StayTuned } from '../User Forms/StayTuned';

export const Home = () => {
    const { t, i18n } = useTranslation();
    return (
       <div>
        <Banner/>
        <RecommendedProducts/>
        <EmailForm></EmailForm>
        <StayTuned></StayTuned>
       </div>
    );
}


