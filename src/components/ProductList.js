
import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { PageTitle } from './PageTitle';
import { itemsSubject } from './ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../axios/ProductAxios';
import { setProductList } from '../redux/DataActions/DataAction.Product';


export const ProductList = () => {
    const { t, i18n } = useTranslation();
    const [cart, setCart] = useState([]);
    const productsList = useSelector(s => s.DataReducer_Products.Prodlist);
    const [products, setProducts] = useState(productsList);
    const myDispatch = useDispatch();
    const navigate = useNavigate();

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

    
    const goToProductDetails = (productId) => {
        debugger
        navigate(`/myProduct/${productId-1}`);  // Navigate to product details page with product ID
    };



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
                                    <Button variant="primary" onClick={() => {debugger;goToProductDetails(product.productID)}}>Details</Button>
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