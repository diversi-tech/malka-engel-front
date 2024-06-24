import { useTranslation } from 'react-i18next';
import { RecommendedProducts } from '../RecommendedProducts';
import { Login } from './Login';
import { Wording } from './Wording';
import { Image } from './Image';
import React from 'react';
//Product page
export const Product = () => {
    const { t, i18n } = useTranslation();
    // const childrens=React.Children.toArray(props.children);
    // var oneChild = React.cloneElement(childrens[1]);
    return (
        <div>
            <h2>product Component</h2>

            <Image />
            <Wording />
        </div>
    );
}
