import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { ProductList } from './ProductList';
import {useSelector} from 'react-redux';
//Details page
export const Details = () => {
    // זה בדיוק קומפוננטת Product
    // לאילה באהבה
    // התחלתי לעשות לא גמרתי
    // ניסתי לעשות קובץ גסון גלובלי - לא הלך  תנסי את 
    // נראה אותך :)
    // const { t, i18n } = useTranslation();
    // const params = useParams();
    // let listProd = useSelector(p=>p.ProductListJSON.products);

    // return(
    //     <>עמוד של פרטים נוספים להמשך
    //     <>מוצר</>
    //     <div>{listProd.filter(p => p.id == params.id)}</div>
    //     </>
    // )
    return(
        <>עמוד של פרטים נוספים להמשך</>
    );
};