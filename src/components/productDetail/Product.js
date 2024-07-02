import { useTranslation } from 'react-i18next';
import { Wording } from '../Wording';
import { Image } from '../Image';
import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GetAllProducts } from '../../axios/ProductAxios';
import { setProductList } from '../../redux/DataActions/DataAction.Product';
import { Review } from './Review';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';

export const Product = () => {
    debugger
    const { t, i18n } = useTranslation();
    //get the product list from the redux store
    const productsList = useSelector(s => s.DataReducer_Products.Prodlist);
    //get the product ID from the URL parameters
    const { id } = useParams();
    //set current product list - that loaded from redux
    const [products, setProducts] = useState(productsList);
    //get dispatch function to send to redux store
    const myDispatch = useDispatch();
    const imageRef = useRef(null); // Use ref to reference the image element

    //fetch the product list when the component mounts
    async function fetchProducts() {
        if (productsList.length === 0) {
            var response = await GetAllProducts();
            setProducts(response); 
            myDispatch(setProductList(response));
        } else {
            setProducts(productsList);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    // Find the current product
    const product = products.find(product => product.productID == id);

    if (!product) {
        return <div>Loading...</div>;
    }

    const addToCart = () => {
        // TODO: Add the product to the cart in redux store
    }

    // Handle mouse movement over the image
    const handleMouseMove = (e) => {
        const img = imageRef.current;
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element

        img.style.transformOrigin = `${x}px ${y}px`;
        img.style.transform = 'scale(1.3)';
    };

    const handleMouseOut = () => {
        const img = imageRef.current;
        img.style.transform = 'scale(1)';
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col md={5} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        overflow: 'hidden',
                        position: 'relative',
                        width: '100%',
                        // maxWidth: '300px'
                    }}>
                        <img 
                            ref={imageRef}
                            src={`https://localhost:44314${product.imageURL}`} 
                            alt={product.name} 
                            style={{
                                width: '100%',
                                height: 'auto',
                                transition: 'transform 0.005s, transform-origin 0.005s'
                            }}
                            onMouseMove={handleMouseMove}
                            onMouseOut={handleMouseOut}
                        />
                        <button className="btn btn-light" onClick={()=>{}} >* {t('productPage.review')}</button>
                    </div>
                </Col>
                <Col md={7}>
                    <h2>{product.nameHe}</h2>
                    <p>{product.descriptionHe}</p>
                    <p className="text-muted">מחיר: {product.price} ש"ח</p>
                    <Wording />
                    <Button variant="outline-primary" className="mt-2">הוספה לסל</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* <Review /> */}
                </Col>
            </Row>
        </Container>
    );
}
