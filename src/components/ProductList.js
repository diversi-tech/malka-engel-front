import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
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

    const addToCart = (productId) => {
        const productToAdd = products.find(product => product.id === productId);
        if (productToAdd) {
            const currentItems = itemsSubject.value;
            const existingItemIndex = currentItems.findIndex(item => item.id === productToAdd.id);

            if (existingItemIndex !== -1) {
                const updatedItems = [...currentItems];
                updatedItems[existingItemIndex].quantity += 1;
                itemsSubject.next(updatedItems);
            } else {
                itemsSubject.next([...currentItems, { ...productToAdd, quantity: 1 }]);
            }
        }
    };

    const goToProductDetails = (productId) => {
        navigate(`/myProduct/${productId}`);
    };

    return (
        <div>
            <h1>{t('productListPage.title')}</h1>
            <Container>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {products.map((product, index) => (
                        <Col key={index}>
                            <Card style={{ backgroundColor: 'darksalmon' }}>
                                {/* //TODO:// */}
                                {/* sapose to be in a global url!! */}
                                <Card.Img variant="top" src={`https://localhost:44314${product.imageURL}`} alt={product.name} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        Price: {product.price} USD
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => goToProductDetails(product.productID)}>Details</Button>
                                    <Button variant="primary" onClick={() => addToCart(product.id)}>Add to cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
