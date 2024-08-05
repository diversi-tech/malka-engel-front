import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper, List, ListItem, ListItemText, Box } from '@mui/material';
import { OrderForm } from './OrderForm';
import { PayForm } from './PayForm';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, getCart } from '../product/cookies/SetCart';
import { PostOrder } from '../../axios/OrderAxios';
import { sendEmails } from '../../axios/EmailAxios';
import ReactDOMServer from 'react-dom/server';
import PdfGenerator from "./PdfGenerator.js";
import { SendEmailsForOrder, sendEmailsForOrder } from "./sendEmailsForOrder.js";
import { PostOrderItemList } from '../../axios/OrderItemAxios.js';
import { PageTitle } from '../Layout Components/PageTitle.js';
import ErrorPage from '../Layout Components/ErrorPage.js';

export const Checkout = () => {
    const { t, i18n } = useTranslation();
    const { currentUser, connected } = useSelector(u => u.DataReducer_Users);
    const navigate = useNavigate();
    const [currentCart, setCurrentCart] = useState(getCart());
    const [order, setOrder] = useState({
        "OrderID": 0,
        "UserID": currentUser.userID || 0,
        "Status": "Processing",
        "TotalAmount": 0,
        "CreatedAt": new Date().toISOString(),
        "Comment": ""
    })
    const { generatePDFHtml } = PdfGenerator(order.OrderID)
    const { sendEmailsToCustomer } = SendEmailsForOrder()



    // פונקציה לחישוב סך המחירים
    const calculateTotalPrice = (products) => {
        return products.reduce((total, product) => total + (product.salePrice !== 0 ? product.salePrice : product.price), 0);
    };

    const CreateOrder = async () => {
        if (!connected) {
            navigate('/myToConnect');
        } else {
            const result = await PostOrder(order);
            const orderidToAdd = result
            setOrder({ ...order, OrderID: orderidToAdd })
            if (!orderidToAdd || orderidToAdd == -1) {
                navigate(`/myErrorPage/500/${t('errorPage.message')}/back`)
            } else {
                const listItemOrder = [];
                currentCart.map((product) => {
                    const itemOrder = {
                        "OrderItemID": 0,
                        "OrderID": orderidToAdd,
                        "ProductID": product.productID,
                        "Price": product.salePrice != 0 ? product.salePrice : product.price,
                        "Comment": product.additionalComments,
                        "Wording": product.wording
                    }
                    listItemOrder.push(itemOrder);
                });
                const result = await PostOrderItemList(listItemOrder);
                if (result) {
                    debugger
                    generatePDFHtml(orderidToAdd)
                    sendEmailsToCustomer(orderidToAdd)
                    clearCart();
                }
            }
        }
    };


    useEffect(() => {
        setOrder({ ...order, "TotalAmount": calculateTotalPrice(currentCart) })

    }, []);

    return (
        <Container>
            <PageTitle title={t('orderFormPage.pageTitle')} />
            <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    פרטי ההזמנה שלך
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <OrderForm />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PayForm />
                    </Grid>
                </Grid>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label={t('orderFormPage.comments')}
                            variant="outlined"
                            onChange={(e) => setOrder({ ...order, "Comment": e.target.value })}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Button variant="contained" color="primary" onClick={CreateOrder}>
                        {t('orderFormPage.placeOrder')}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};
