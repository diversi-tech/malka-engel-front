import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import ErrorPage from '../Layout Components/ErrorPage'
import { useTranslation } from 'react-i18next';
import { GetAllProducts, GetProductsByCategoryAndSubcategories } from '../../axios/ProductAxios';
import { Box, Breadcrumbs, Button, Card, CardContent, CircularProgress, Container, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import WatermarkedImage from './productDetail/WatermarkedImage';
import { getCart, removeFromCart } from './cookies/SetCart';
import { GetAllSubcategoriesByCategoryID, GetCategoryByCategoryId, GetUpCategoriesByCategoryID } from '../../axios/CategoryAxios';
import { useDispatch, useSelector } from 'react-redux';
import { setProductList, setProductListByCategory } from '../../redux/DataActions/DataAction.Product';

const ProductByCategory = () => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language === 'en' ? 'En' : 'He';
    const { idCategory } = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useState(getCart());
    const [category, setCategory] = useState({});
    const productsFrmRedux = useSelector(p => p.DataReducer_Products.Prodlist)
    const [products, setProducts] = useState(productsFrmRedux);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subcategories, setSubCategories] = useState([]);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            if (productsFrmRedux.length == 0) {
                const [productsResponse, categoryProductsResponse, categoryResponse, subcategoriesResponse] = await Promise.all([
                    GetAllProducts(),
                    GetProductsByCategoryAndSubcategories(idCategory),
                    GetCategoryByCategoryId(idCategory),
                    GetAllSubcategoriesByCategoryID(idCategory),
                ]);
                //dispatch(setProductListByCategory([]));
                setCategory(categoryResponse);
                setSubCategories(subcategoriesResponse);
                setCategoryProducts(categoryProductsResponse);
                dispatch(setProductList(productsResponse));
            } else {
                const [categoryProductsResponse, categoryResponse, subcategoriesResponse] = await Promise.all([
                    GetProductsByCategoryAndSubcategories(idCategory),
                    GetCategoryByCategoryId(idCategory),
                    GetAllSubcategoriesByCategoryID(idCategory),
                ]);
                //dispatch(setProductListByCategory([]));
                setCategory(categoryResponse);
                setSubCategories(subcategoriesResponse);
                setCategoryProducts(categoryProductsResponse);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError({ code: 500, message: "An error occurred while fetching data." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [idCategory]);

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        setCart(getCart());
    };

    const handleAddToCart = (product) => {
        navigate(`/myProduct/${product.productID}`);
    };

    const breadcrumbs = [
        { name: 'Home Page', link: '/' },
        { name: category[`name${currentLanguage}`] }
    ];

    if (error) {
        return (
            <ErrorPage code={error.code} message={error.message} back="back" />
        );
    }

    return (
        <Container sx={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Box textAlign="center" mb={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {category[`name${currentLanguage}`]}
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    {breadcrumbs.map((crumb, index) => (
                        index < breadcrumbs.length - 1 ? (
                            <Link key={index} to={crumb.link} style={{ textDecoration: 'none', color: '#1976d2' }}>
                                {crumb.name}
                            </Link>
                        ) : (
                            <Typography key={index} color="text.primary">
                                {crumb.name}
                            </Typography>
                        )
                    ))}
                </Breadcrumbs>
            </Box>

            {loading ? (
                <Box textAlign="center" mt={5}>
                    <CircularProgress />
                    <Typography variant="h5" mt={2}>{t('Loading...')}</Typography>
                </Box>
            ) : (
                <>
                    {subcategories.length > 0 && (
                        <Box mb={4}>
                            <Grid container spacing={2}>
                                {subcategories.map((subcategory, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Link
                                            to={`/myProductByCategory/${subcategory.categoryID}`}  // Adjust the path as needed
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{ width: '100%', textAlign: 'center' }}
                                            >
                                                {subcategory[`name${currentLanguage}`]}
                                            </Button>
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    <Grid container spacing={3}>
                        {categoryProducts.map((product, index) => {
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
                                            imageUrl={`${product.imageURL}`}
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
                                                {product[`name${currentLanguage}`]}                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="div">
                                                {product.salePrice == 0 ? (
                                                    <>  מחיר: {product.price} ₪</>
                                                ) : (
                                                    <>   מחיר: <s>{product.price} </s >  <b>     {product.salePrice}</b>   ₪ </>

                                                )}
                                            </Typography>

                                            <Box mt={2} textAlign="center">
                                                <Tooltip
                                                    title={
                                                        productInCart
                                                            ? t('Remove from Cart')
                                                            : t('Add to Cart')
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
                                                <Tooltip title={t('More Details')}>
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
                </>
            )}
        </Container>
    );
};

export default ProductByCategory;
