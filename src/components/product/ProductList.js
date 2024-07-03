import { useTranslation } from 'react-i18next';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../../axios/ProductAxios';
import { setProductList } from '../../redux/DataActions/DataAction.Product';

export const ProductList = () => {
    const { t, i18n } = useTranslation();
    const productsList = useSelector(s => s.DataReducer_Products?.Prodlist || []); // טיפול במצב בו productsList הוא undefined או null
    const [products, setProducts] = useState(productsList);
    const [error, setError] = useState(false); // משתנה לבדיקה אם יש תקלה
    const myDispatch = useDispatch();
    const navigate = useNavigate();

    async function fetchProducts() {
        try {
            if (!productsList || productsList.length === 0) { // בדיקה אם הרשימה ריקה או לא מוגדרת
                var response = await GetAllProducts();
                if (!response) {
                    setProducts([]);
                }
                else {
                    setProducts(response);
                    myDispatch(setProductList(response));
                }
            } else {
                setProducts(productsList);
            }
        } catch (error) {
            setError(true); // במידה ויש תקלה, נקבע את המשתנה ל-true
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
            {error || products.length === 0 ? ( // במידה ויש תקלה או אין מוצרים להצגה
                <div style={{backgroundColor: '#'}}>
                    <br></br>
                    <h3>{t('productListPage.noProducts')}</h3> {/* הוספת כותרת למקרה של תקלה */}
                    <p>{t('productListPage.technicalIssue')}</p> {/* הצגת הודעה על תקלה */}
                </div>
            ) : (
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
                                    {/* {product.isNew && <Badge bg="success" style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        zIndex: 10
                                    }}>New</Badge>} */}
                                    <div style={{
                                        overflow: 'hidden',
                                        position: 'relative'
                                    }}>
                                        <Card.Img
                                            variant="top"
                                            src={`https://localhost:44314${product.imageURL}`}
                                            onClick={()=>{navigate(`/myProduct/${product.productID}`)}}
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
            )}
        </div>
    );
};
