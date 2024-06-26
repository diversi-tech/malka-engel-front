import { useTranslation } from 'react-i18next';
import { RecommendedProducts } from '../RecommendedProducts';
import { Login } from './Login';
import { Wording } from './Wording';
import { Image } from './Image';
import React from 'react';
import { PageTitle } from './PageTitle';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
//Product page
export const Product = ({ filteredData, filterDataById, match }) => {
    const { t, i18n } = useTranslation();
    // const childrens=React.Children.toArray(props.children);
    // var oneChild = React.cloneElement(childrens[1]);
    const products = useSelector(s => s.DataReducer_Pro.Prolist)
    const { id } = useParams();
    const p = products.find(product => product.id === id);
    if (!p) {
        return <div>
            <div>{products[0].name}</div>Product not found</div>;
    }

    return (
        <div>

            <div style={{ display: 'flex' }}>
                <div style={{ flex: '2' }}>
                    <p style={{ direction: 'rtl' }}>{p.url}</p>
                    <h1>{p.kind}</h1>

                    <p>{p.size}</p>
                    <p>מחיר:{p.price}ש"ח </p>
                    <Wording />
                    <br></br>
                    <button >הוספה לסל</button>

                </div>
                <div style={{ flex: '2' }}>
                    <Image />
                </div>
            </div>
        </div>
    );
}
