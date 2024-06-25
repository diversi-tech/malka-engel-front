import { useTranslation } from 'react-i18next';
import { RecommendedProducts } from '../RecommendedProducts';
import { Login } from './Login';
import { Wording } from './Wording';
import { Image } from './Image';
import React from 'react';
import { PageTitle } from './PageTitle';
//Product page
export const Product = () => {
    const { t, i18n } = useTranslation();
    // const childrens=React.Children.toArray(props.children);
    // var oneChild = React.cloneElement(childrens[1]);
    return (
        <div>
            <div>
             <PageTitle title="product Component" />
        nnn</div>  
            <Image />
            <Wording />
        </div>
    );
}
