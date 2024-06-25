import { useTranslation } from 'react-i18next';
import { RecommendedProducts } from '../../RecommendedProducts';
import { Login } from '../Login';
import { Wording } from './Wording';
import { Image } from './Image';
import React from 'react';
import { useSelector } from 'react-redux';
//Product page
export const Product = () => {
    const product = {
        id: 1,
        name: 'דגם גפן',
        price: 50,
        image: 'product1.jpg',
        kind: 'פוסטר',
        url: "מזכרות / קטלוג מוצרים / אירועים / דגם גפן / פוסטר מק",
        size: "אורך:  13.0ס״מ רוחב:  13.0ס״מ",
    };
    const { t, i18n } = useTranslation();
    // const childrens=React.Children.toArray(props.children);
    // var oneChild = React.cloneElement(childrens[1]);
    // const PRO = useSelector(s => s.DataReducer_Product.ProductList)
    return (<div>
        <div style={{ padding: '10px'}}>
            <h1>{product.name}</h1>
        </div>
        <div style={{ display: 'flex' }}>
            <div style={{ flex: '2' }}>
            <p style={{ direction: 'rtl' }}>{product.url}</p>

                <p>{product.size}</p>
                <p>מחיר:{product.price}ש"ח </p>
                <Wording />
                <br></br>
                <button>הוספה לסל</button>

            </div>
            <div style={{ flex: '2' }}>
                <Image />
            </div>
        </div>
    </div>
    );
}
