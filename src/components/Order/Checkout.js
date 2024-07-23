import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper, List, ListItem, ListItemText, Box } from '@mui/material';
import { OrderForm } from './OrderForm';
import { PayForm } from './PayForm';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, getCart } from '../product/cookies/SetCart';
import { GetOrderByOrderId, PostOrder, PutAllPropOfOrder } from '../../axios/OrderAxios';
import { PostOrderItemList } from '../../axios/OrderItemAxios';
import { PopUp } from '../Cart/popUp';
import { sendEmails } from '../../axios/EmailAxios';
import ReactDOMServer from 'react-dom/server';
import PdfGenerator from "./PdfGenerator.js";
import { SendEmailsForOrder, sendEmailsForOrder } from "./sendEmailsForOrder.js";
import { PageTitle } from '../Layout Components/PageTitle';

export const Checkout = () => {
    const { t, i18n } = useTranslation();
    const { currentUser, connected } = useSelector(u => u.DataReducer_Users);
    const navigate = useNavigate();
    const [currentCart, setCurrentCart] = useState(getCart());
    const [order, setOrder] = useState({
        "OrderID": 0,
        "UserID": currentUser.userID,
        "Status": "Processing",
        "TotalAmount": 0,
        "CreatedAt": null,
        "Comment": ""
    })
        const {generatePDFHtml} = PdfGenerator(order.OrderID)
        const {sendEmailsToCustomer} = SendEmailsForOrder()



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
            setOrder({...order,  OrderID: orderidToAdd})
            // end //
            if (!orderidToAdd || orderidToAdd  == -1) {
                alert("Failed to create order, please try again later");
                return;
            } else {
                const listItemOrder = [];
                currentCart.map((product) => {
                    const itemOrder = {
                        "OrderItemID": 0,
                        "OrderID": orderidToAdd,
                        "ProductID": product.productID,
                       // "Quantity": product.quantity,
                        "Price": product.salePrice != 0 ? product.salePrice : product.price,
                        "Comment": "",//product.comment,
                        "Wording":"" //product.wording
                    }
                    listItemOrder.push(itemOrder);
                });
                const result = await PostOrderItemList(listItemOrder);
                if (result) {
                    debugger
                    generatePDFHtml(orderidToAdd)
                    sendEmailsToCustomer(orderidToAdd)
                    clearCart()
                }
            }
        }
    };


    useEffect(() => {
        setOrder({ ...order, "TotalAmount": calculateTotalPrice(currentCart) })
       
    }, []);  

    return (
        <Container sx={{ mt: 4 }}>
            <PageTitle title={t('orderFormPage.pageTitle')} />
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <OrderForm />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label={t('orderFormPage.comments')}
                            variant="outlined"
                            onChange={(e) => setOrder({ ...order, "Comment": e.target.value })}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
                    <Grid item>
                        <PayForm />
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
