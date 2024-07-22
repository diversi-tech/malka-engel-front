import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Grid, Typography, Button, Box, Snackbar, Alert } from '@mui/material';
import { Wording } from './Wording';
import { addToCart, getCart, removeFromCart } from '../cookies/SetCart';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AdditionalComments } from './AdditionalComments';
import GoBackButton from '../../Layout Components/GoBackButton';
import { Review } from './review/Review';
import { setCookie } from '../cookies/CookieUtils';

export const Product = () => {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const currentLanguage = i18n.language === 'en' ? 'En' : 'He';
    const productsList = useSelector(s => s.DataReducer_Products?.Prodlist || []);
    const [products, setProducts] = useState(productsList);
    const imageRef = useRef(null);
    const scrollToRef = useRef(null);
    const [cart, setCart] = useState(getCart());
    const [wording, setWording] = useState(cart.findIndex(item => item.productID == id) !== -1 ? cart[cart.findIndex(item => item.productID == id)].wording : '');
    const [additionalComments, setAdditionalComments] = useState(cart.findIndex(item => item.productID == id) !== -1 ? cart[cart.findIndex(item => item.productID == id)].additionalComments : '');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const product = products.find(product => product.productID == id);

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

    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={2}>
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
                        <img
                            ref={imageRef}
                            src={`${process.env.REACT_APP_API_URL}${product.imageURL}`}
                            alt={product[`name${currentLanguage}`]}
                            style={{
                                width: '100%',
                                height: 'auto',
                                transition: 'transform 0.2s ease-out',
                                cursor: 'pointer'
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>{product[`name${currentLanguage}`]}</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.6 }} gutterBottom>
                        {product[`description${currentLanguage}`]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        מחיר: {product.price} ש"ח
                    </Typography>
                    <Wording setWording={setWording} initialValue={decodedWording} />
                    <AdditionalComments setAdditionalComments={setAdditionalComments} initialValue={initialComments} />
                    <Box mt={2}>
                        {productInCart ? (
                            <>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Typography variant="body2" color="error" gutterBottom>
                                            {t('הזמנת ממוצר זה! ')}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleRemoveFromCart(product.productID)}
                                        >
                                            <DeleteIcon /> {t('הסר מהסל ')}
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleUpdateFromCart(product.productID)}
                                        >
                                            <EditIcon /> {t(' ערוך מוצר ')}
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Box mt={2}>
                                    <Snackbar
                                        open={openSnackbar}
                                        autoHideDuration={6000}
                                        onClose={handleCloseSnackbar}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                    >
                                        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                                            {snackbarMessage}
                                        </Alert>
                                    </Snackbar>
                                </Box>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleAddToCart(product)}
                            >
                                {t('הוסף לסל ')}
                            </Button>
                        )}
                    </Box>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 10 }}>
                <Grid item xs={12}>
                    <Box ref={scrollToRef}>
                        <Review productId={id} />
                    </Box>
                </Grid>
            </Grid>
            <GoBackButton />
        </Container>
    );
};
