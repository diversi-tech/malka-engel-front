import { useTranslation } from 'react-i18next';
import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GetAllProducts } from '../../../axios/ProductAxios';
import { setProductList } from '../../../redux/DataActions/DataAction.Product';
import { Review } from './Review';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Wording } from './Wording';

export const Product = () => {
    const { t, i18n } = useTranslation();
    const productsList = useSelector(s => s.DataReducer_Products.Prodlist);
    const { id } = useParams();
    const [products, setProducts] = useState(productsList);
    const myDispatch = useDispatch();
    const imageRef = useRef(null);
    const navigate = useNavigate();
    const scrollToRef = useRef(null);

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

    const product = products.find(product => product.productID == id);

    if (!product) {
        return <div>Loading...</div>;
    }

    const addToCart = () => {
        // TODO: Add the product to the cart in redux store
    }

    const handleMouseMove = (e) => {
        const img = imageRef.current;
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        img.style.transformOrigin = `${x}px ${y}px`;
        img.style.transform = 'scale(1.3)';
    };

    const handleMouseOut = () => {
        const img = imageRef.current;
        img.style.transform = 'scale(1)';
    };

    const handleScroll = () => {
        scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
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
                        <Button className="btn btn-light" onClick={handleScroll} >* {t('productPage.review')}</Button>
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
                <div style={{ marginTop: '150px' }} ref={scrollToRef}>
                    <Review />
                </div>
                </Col>
            </Row>
        </Container>
    );
}
