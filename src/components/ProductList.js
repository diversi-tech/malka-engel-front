
import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useState } from 'react';




export const ProductList = () => {
    const { t, i18n } = useTranslation();
    const [cart, setCart] = useState([]);
    const products = [
        { id: 1, name: 'Product 1', price: 50, image: 'product1.jpg' },
        { id: 2, name: 'Product 2', price: 80, image: 'product2.jpg' },
        { id: 3, name: 'Product 3', price: 120, image: 'product3.jpg' }
    ];
    const navigate = useNavigate();
    const addToCart = (productId) => {
        const productToAdd = products.find(product => product.id === productId);
        if (productToAdd) {
            setCart([...cart, productToAdd]);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(product => product.id !== productId);
        setCart(updatedCart);
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, product) => total + product.price, 0);
    };
    return (
        <div>
            <h1>{t('productListPage.title')}</h1>
            <Container>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {products.map((product, index) => (
                        <Col key={index}>
                            <Card style={{ backgroundColor: 'darksalmon' }}>
                                <Card.Img variant="top" src={product.image} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        Price: {products.price} USD
                                    </Card.Text>
                                    <Button variant="primary" onClick={()=>navigate(`myOrderForm/${product.id}`)}>Details</Button>
                                    <Button variant="primary" onClick={() => addToCart(product.id)}>Add to cart </Button>
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

/**
 * 
 *     const addToCart = (myid) => {
        // מציאת המוצר ברשימת המוצרים על פי ה-ID
        let item = products.find(x => x.id === myid);
        // if (item) {
        //     // העברת המוצר לפונקציה המועברת מקומפוננטת האב (OrderForm) להוספה לסל
        //     onAddProduct(item);
        // }
    };

    const infom = (id) => {
        // חיפוש המוצר ברשימת המוצרים ושמירתו ב-sessionStorage לצורך העברה לדף פרטים נוספים
        for (let i = 0; i < products.length; i++) {
          if (products[i].id === id) {
            sessionStorage.setItem('items', JSON.stringify(products[i]));
          }
        }
        // מעבר לדף ה-HTML המתאים
        window.location = "./myOrderForm";
      };
 */