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


export const Product = () => {
    const { t, i18n } = useTranslation();
    //get the product list from the redux store
    const productsList = useSelector(s => s.DataReducer_Products.Prodlist);
    //get the product ID from the URL parameters
    const { id } = useParams();
    //set current product list - that loaded from redux
    const [products, setProducts] = useState(productsList);
    //get dispatch function to send to redux store
    const myDispatch = useDispatch();
    //TODO//
    //it dosent work!!! - p is null!!
    //const p = products.find(product => product.productID === id);

    //fetch the product list when the component mounts
    async function fetchProducts() {
        //if the list in the redux empty
        if (productsList.length == 0) {
            //get data - the list from server - 
            var response = await GetAllProducts(1);
            //set current product list - that loaded from redux
            setProducts(response); // Assuming response.data contains the list of reviews
            //update the product list in the redux stor
            myDispatch(setProductList(response));
        } else {
            //if the list in the product full
            //mean - was server call
            //i want to set the current list - from there
            setProducts(productsList);
        }
    }

    // Call the function automatically
    useEffect(f => {
        //set the product list
        fetchProducts();
    }, []);

    return (
        //TODO//
        //i want to improve this look!!
        <div>
            <br></br>
            <h1>More details:</h1>
            <br></br>
            {/* <div>{products[id].name}</div>product found!!!!! */}
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '2' }}>
                    <p style={{ direction: 'rtl' }}>{products[id].imageURL}</p>
                    <h2>{products[id].name}</h2>

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
