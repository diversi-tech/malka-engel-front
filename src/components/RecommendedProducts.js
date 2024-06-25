import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { PageTitle } from './PageTitle';

const RecommendedProducts = () => {
    const { t, i18n } = useTranslation();
    const products = [
        { id: 1, name: 'Product 1', price: 50, image: 'product1.jpg' },
        { id: 2, name: 'Product 2', price: 80, image: 'product2.jpg' },
        { id: 3, name: 'Product 3', price: 120, image: 'product3.jpg' }
    ];

    const navigate = useNavigate();

    return (
        <div>
            <h2 style={{ color: 'black' }}>rrr</h2>
            <h1 style={{ color: 'black' }}>{t('recommendedProducts.title')}</h1>
            <div>
             <PageTitle title={t('recommendedProducts.title')}/>
           </div>  
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
                                <Button variant="primary" onClick={navigate(`myDetails/${product.id}`)}>Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </div>
    )
}
export default RecommendedProducts;