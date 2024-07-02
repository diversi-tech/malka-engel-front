import { useTranslation } from 'react-i18next';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { itemsSubject } from './ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../axios/ProductAxios';
import { setProductList } from '../redux/DataActions/DataAction.Product';

export const ProductList = () => {
    const { t, i18n } = useTranslation();
    const productsList = useSelector(s => s.DataReducer_Products.Prodlist);
    const [products, setProducts] = useState(productsList);
    const myDispatch = useDispatch();
    const navigate = useNavigate();

    async function fetchProducts() {
        debugger
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

    const goToProductDetails = (productId) => {
        navigate(`/myProduct/${productId}`);
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            <h1>{t('productListPage.title')}</h1>
            <Container>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {products.map((product, index) => (
                        <Col key={index}>
                            <Card style={{ 
                                position: 'relative', 
                                border: 'none', 
                                transition: 'transform 0.2s', 
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
                            }}>
                                {product.isNew && <Badge bg="success" style={{ 
                                    position: 'absolute', 
                                    top: '10px', 
                                    right: '10px', 
                                    zIndex: 10 
                                }}>New</Badge>}
                                <div style={{ 
                                    overflow: 'hidden', 
                                    position: 'relative' 
                                }}>
                                    <Card.Img 
                                        variant="top" 
                                        src={`https://localhost:44314${product.imageURL}`} 
                                        alt={product.name} 
                                        style={{ 
                                            height: '250px', 
                                            objectFit: 'cover', 
                                            transition: 'transform 0.3s' 
                                        }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text style={{ 
                                        fontSize: '18px', 
                                        color: '#888' 
                                    }}>
                                        {product.price} ₪
                                    </Card.Text>
                                    <Link 
                                        to={`/myProduct/${product.productID}`} 
                                        style={{ 
                                            display: 'block', 
                                            width: '100%', 
                                            marginTop: '10px', 
                                            textAlign: 'center',
                                            textDecoration: 'none', 
                                            color: '#007bff' 
                                        }}
                                    >
                                        {t('productListPage.moreDetails')}
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};
