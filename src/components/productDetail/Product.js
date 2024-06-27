import { useTranslation } from 'react-i18next';
import { Wording } from '../Wording';
import { Image } from '../Image';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GetAllProducts } from '../../axios/ProductAxios';
import { setProductList } from '../../redux/DataActions/DataAction.Product';
import { Review } from './Review';

//Product page
//{ filteredData, filterDataById, match }

export const Product = () => {
    debugger
    const { t, i18n } = useTranslation();
    // const childrens=React.Children.toArray(props.children);
    // var oneChild = React.cloneElement(childrens[1]);
    const productsList = useSelector(s => s.DataReducer_Products.Prodlist)
    const { id } = useParams();
    const [products, setProducts] = useState(productsList);
    const myDispatch = useDispatch();
    //it dosent work!!! - p is null!!
    const p = products.find(product => product.productID === id);

    async function fetchProducts() {
        debugger
        if (productsList.length == 0) {
            var response = await GetAllProducts(1);
            setProducts(response); // Assuming response.data contains the list of reviews
            myDispatch(setProductList(response));
        } else {
            setProducts(productsList);
        }
    }

    // Call the function automatically
    useEffect(() => {
        fetchProducts();
        setProducts(productsList);
    }, []);

    return (
        <div>
            <div>{products[id].name}</div>product found!!!!!
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '2' }}>
                    <p style={{ direction: 'rtl' }}>{products[id].imageURL}</p>
                    <h1>{products[id].name}</h1>

                    <p>{products[id].description}</p>
                    <p>מחיר:{products[id].price}ש"ח </p>
                    <Wording />
                    <br></br>
                    <button>הוספה לסל</button>
                </div>
                <div style={{ flex: '2' }}>
                    <Image />
                </div>
            </div>
            <Review></Review>
        </div>
    );
}
