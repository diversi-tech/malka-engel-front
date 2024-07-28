import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../../axios/ProductAxios';
import { setProductList } from '../../redux/DataActions/DataAction.Product';
import { addToCart, removeFromCart, getCart } from './cookies/SetCart';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    TextField,
    Box,
    Tooltip,
    Button,
    Paper
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import WatermarkedImage from './productDetail/WatermarkedImage';

export const ProductList = () => {
    const { t } = useTranslation();
    const productsList = useSelector(s => s.DataReducer_Products?.Prodlist || []);
    const [products, setProducts] = useState(productsList);
    const [error, setError] = useState(false);
    const myDispatch = useDispatch();
    const navigate = useNavigate();

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [cart, setCart] = useState(getCart());

    const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);

    async function fetchProducts() {
        try {
            if (productsList.length == 0) {
                debugger
                const response = await GetAllProducts();
                if (!response) {
                    setProducts([]);
                } else {
                    setProducts(response);
                    myDispatch(setProductList(response));
                }
            } else {
                setProducts(productsList);
            }
        } catch (error) {
            setError(true);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        navigate(`/myProduct/${product.productID}`)
        // product.wording = "no wording";
        // product.additionalComments = "no comments";
        // addToCart(product);
        // setCart(getCart());
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        setCart(getCart());
    };

    return (
        <Container sx={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {error || filteredProducts.length === 0 ? (
                        <Box textAlign="center" mt={5}>
                            <Typography variant="h5">{t('productListPage.noProducts')}</Typography>
                            <Typography>{t('productListPage.technicalIssue')}</Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {filteredProducts.map((product, index) => {
                                const productInCart = cart.find((item) => item.productID === product.productID);

                                return (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            sx={{
                                                position: 'relative',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                transition: 'transform 0.2s, box-shadow 0.2s',
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                ':hover': {
                                                    transform: 'scale(1.02)',
                                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                                }
                                            }}
                                        >
                                            <WatermarkedImage
                                                alt={product.name}
                                                onClick={() => navigate(`/myProduct/${product.productID}`)}
                                                sx={{
                                                    cursor: 'pointer',
                                                    transition: 'transform 0.3s',
                                                    ':hover': { transform: 'scale(1.1)' }
                                                }}
                                                imageUrl={`${process.env.REACT_APP_API_URL}${product.imageURL}`}
                                                watermarkText='malka engel'

                                                style={{
                                                    width: '100%',
                                                    height: '250px',
                                                    transition: 'transform 0.2s ease-out',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                            <CardContent sx={{ padding: '16px' }}>
                                                <Typography variant="h6" component="div" gutterBottom>
                                                    {product.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="div">
                                                    {product.price} ₪
                                                </Typography>
                                                <Box mt={2} textAlign="center">
                                                    <Tooltip
                                                        title={
                                                            productInCart
                                                                ? t('הסר מסל')
                                                                : t('הוסף לסל')
                                                        }
                                                    >
                                                        <IconButton
                                                            color={productInCart ? 'secondary' : 'primary'}
                                                            onClick={() =>
                                                                productInCart
                                                                    ? handleRemoveFromCart(product.productID)
                                                                    : handleAddToCart(product)
                                                            }
                                                        >
                                                            {productInCart ? (
                                                                <RemoveShoppingCartIcon />
                                                            ) : (
                                                                <ShoppingCartIcon />
                                                            )}
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={t('פרטים נוספים')}>
                                                        <IconButton
                                                            color="info"
                                                            onClick={() => navigate(`/myProduct/${product.productID}`)}
                                                            sx={{ mt: 1 }}
                                                        >
                                                            <InfoIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};
