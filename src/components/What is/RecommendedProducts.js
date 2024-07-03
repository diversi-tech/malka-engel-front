import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { PageTitle } from './PageTitle';

const RecommendedProducts = () => {
    const { t, i18n } = useTranslation();
    const [cart, setCart] = useState([]);
    const products = useSelector(s => s.DataReducer_Products.Prodlist)
    // const products = [
    //     { id: 1, name: 'Product 1', price: 50, image: 'product1.jpg' },
    //     { id: 2, name: 'Product 2', price: 80, image: 'product2.jpg' },
    //     { id: 3, name: 'Product 3', price: 120, image: 'product3.jpg' }
    // ];
    const navigate = useNavigate();

    const addToCart = (productId) => {
        const productToAdd = products.find(product => product.id === productId);
        if (productToAdd) {
            const currentItems = itemsSubject.value;
            const existingItemIndex = currentItems.findIndex(item => item.id === productToAdd.id);

            if (existingItemIndex !== -1) {
                // Item already exists in cart, update quantity
                const updatedItems = [...currentItems];
                updatedItems[existingItemIndex].quantity += 1;
                itemsSubject.next(updatedItems);
            } else {
                // Item does not exist in cart, add it
                itemsSubject.next([...currentItems, { ...productToAdd, quantity: 1 }]);
            }
        }
    };
    // const addToCart = (productId) => {
    //     const productToAdd = products.find(product => product.id === productId);
    //     if (productToAdd) {
    //         debugger
    //         itemsSubject.next([...itemsSubject.value, { ...productToAdd, quantity: 1 }]);
    //     }
    // };
    
    const goToProductDetails = (productId) => {
        navigate(`/myProduct/${productId}`);  // Navigate to product details page with product ID
    };


    // const removeFromCart = (productId) => {
    //     const updatedCart = cart.filter(product => product.id !== productId);
    //     setCart(updatedCart);
    // };

    // const calculateTotalPrice = () => {
    //     return cart.reduce((total, product) => total + product.price, 0);
    // };
    return (
        <div>
            <div>
             <PageTitle title={t('productListPage.title')} />
            </div>  
            <Container>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {products.map((product, index) => (
                        <Col key={index}>
                            <Card style={{ backgroundColor: 'darksalmon' }}>
                                <Card.Img variant="top" src={product.image} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        Price: {product.price} USD
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => goToProductDetails(product.id)}>Details</Button>
                                    <Button variant="primary" onClick={() => addToCart(product.id)}>Add to cart</Button>
                                    {/* <Button variant="primary" onClick={() => addToCart(product.id)}>Add to cart </Button> */}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            {/* <ShoppingCart cart={cart} removeFromCart={removeFromCart} calculateTotalPrice={calculateTotalPrice} /> */}
        </div>
    )
}
export default RecommendedProducts;