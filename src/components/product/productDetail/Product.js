import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Button, Box, Snackbar, Alert, Breadcrumbs } from '@mui/material';
import { Wording } from './Wording';
import { addToCart, getCart, removeFromCart } from '../cookies/SetCart';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AdditionalComments } from './AdditionalComments';
import GoBackButton from '../../Layout Components/GoBackButton';
import { Review } from './review/Review';
import { setCookie } from '../cookies/CookieUtils';
import WatermarkedImage from './WatermarkedImage';
import { CategoriesHierarchyByProductId, GetAllProducts } from '../../../axios/ProductAxios';
import { setProductList } from '../../../redux/DataActions/DataAction.Product';

const getCategoryHierarchy = (categories, categoryID) => {
    const categoryMap = new Map();
    categories.forEach(cat => categoryMap.set(cat.categoryID, cat));

    const getHierarchy = (id) => {
        const category = categoryMap.get(id);
        if (!category) return [];
        return [category, ...getHierarchy(category.upCategory)];
    };

    return getHierarchy(categoryID).reverse();
};

const generateBreadcrumbs = (categories = [], product = {}, currentLanguage) => {
    if (!categories || categories.length === 0) return [{ name: 'Home Page', link: '/' }];

    const hierarchy = getCategoryHierarchy(categories, categories[categories.length - 1]?.categoryID);

    return [
        { name: 'Home Page', link: '/' },
        ...hierarchy.map(cat => {
            if (!cat) {
                console.error('Category is undefined:', cat);
                return { name: 'Unknown', link: '/' };
            }
            return { name: cat[`name${currentLanguage}`] || 'Unknown', link: `/myProductByCategory/${cat.categoryID || 'unknown'}` };
        }),
        { name: product[`name${currentLanguage}`] || 'Product Name' }
    ];
};

export const Product = () => {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const currentLanguage = i18n.language === 'en' ? 'En' : 'He';
    const productsList = useSelector(s => s.DataReducer_Products.Prodlist || []);
    const [products, setProducts] = useState(productsList);
    const [cart, setCart] = useState(getCart());
    const [wording, setWording] = useState(cart.find(item => item.productID == id)?.wording || '');
    const [additionalComments, setAdditionalComments] = useState(cart.find(item => item.productID == id)?.additionalComments || '');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const scrollToRef = useRef(null);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const product = products.find(product => product.productID == id);

    useEffect(() => {
        const fetchData = async () => {
            if (!product) {
                const productsResponse = await GetAllProducts();
                setProducts(productsResponse);
                dispatch(setProductList(productsResponse));
            }
            const categoriesResponse = await CategoriesHierarchyByProductId(id);

            // Verify categoriesResponse is valid
            console.log('Categories Response:', categoriesResponse);

            const breadcrumbs = generateBreadcrumbs(categoriesResponse, product, currentLanguage);
            setBreadcrumbs(breadcrumbs);
        };

        fetchData();
    }, [id, product, dispatch, currentLanguage]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const productInCart = cart.find(item => item.productID === product.productID);
    const decodedWording = productInCart ? JSON.parse(productInCart.wording) : '';
    const initialComments = productInCart ? productInCart.additionalComments : '';

    const handleAddToCart = product => {
        const productWithDetails = {
            ...product,
            wording: JSON.stringify(wording),
            additionalComments: additionalComments
        };
        addToCart(productWithDetails);
        setCart(getCart());
        setSnackbarMessage('הוסף בהצלחה');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleRemoveFromCart = productId => {
        removeFromCart(productId);
        setCart(getCart());
        setSnackbarMessage('הוסר מהסל');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleUpdateFromCart = productId => {
        const newCart = [...cart];
        const productIndex = newCart.findIndex(item => item.productID === productId);
        if (productIndex !== -1) {
            if (newCart[productIndex].wording !== JSON.stringify(wording)) {
                newCart[productIndex].wording = JSON.stringify(wording);
            }
            if (newCart[productIndex].additionalComments !== additionalComments) {
                newCart[productIndex].additionalComments = additionalComments;
            }
            setCart(newCart);
            setCookie("cart", JSON.stringify(newCart), 7);
            setSnackbarMessage('עודכן בהצלחה');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const scrollToReview = () => {
        if (scrollToRef.current) {
            scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
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

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                            width: '100%',
                            height: 'auto'
                        }}
                    >
                                                {console.log(product)}

                        <WatermarkedImage
                            imageUrl={`${product.imageURL}`}
                            watermarkText='malka engel'
                            style={{
                                width: '100%',
                                height: 'auto',
                                transition: 'transform 0.2s ease-out',
                                cursor: 'pointer'
                            }}
                        />
                    </Box>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={scrollToReview}
                        >
                            {t('productPage.seeReviews')}
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    {console.log("product:", product)}
                    <Typography variant="h4" gutterBottom>{product[`name${currentLanguage}`]}</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.6 }} gutterBottom>
                        {product[`description${currentLanguage}`]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        {product.salePrice == 0?(
                         <>  מחיר: {  product.price } ₪</> 
                        ):(
                            <>   מחיר: <s>{  product.price } </s >  <b>     {product.salePrice }</b>   ₪ </> 

                        )}
                    </Typography>
                    <Wording setWording={setWording} initialValue={decodedWording} />
                    <AdditionalComments setAdditionalComments={setAdditionalComments} initialValue={initialComments} />
                    <Box mt={2}>
                        {productInCart ? (
                            <>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleRemoveFromCart(product.productID)}
                                        >
                                            <DeleteIcon /> {t('productPage.deleteFromCart')}
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleUpdateFromCart(product.productID)}
                                        >
                                            <EditIcon /> {t('productPage.updateCart')}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleAddToCart(product)}
                            >
                                {t('productPage.addToCart')}
                            </Button>
                        )}
                    </Box>
                </Grid>
            </Grid>
                    <Box ref={scrollToRef}>
                        <Review productId={id} />
                    </Box>
            <GoBackButton />
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};
