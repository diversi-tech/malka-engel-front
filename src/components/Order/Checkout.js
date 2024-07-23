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
import { PageTitle } from '../Layout Components/PageTitle';
import { PostOrderItemList } from '../../axios/OrderItemAxios';

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
        "CreatedAt": new Date().toISOString(),
        "Comment": ""
    });
    const [myHTML, setMyHTML] = useState();

    const calculateTotalPrice = (products) => {
        return products.reduce((total, product) => total + (product.salePrice !== 0 ? product.salePrice : product.price), 0);
    };

    const CreateOrder = async () => {
        if (!connected) {
            navigate('/myToConnect');
        } else {
            const result = await PostOrder(order);
            const orderidToAdd = result;
            if (!orderidToAdd) {
                alert("Failed to create order, please try again later");
                return;
            } else {
                const listItemOrder = currentCart.map((product) => ({
                    "OrderItemID": 0,
                    "OrderID": orderidToAdd,
                    "ProductID": product.productID,
                    "Wording": product.wording,
                    "Comment": product.additionalComments,
                    "Price": product.salePrice !== 0 ? product.salePrice : product.price,
                }));
                const result = await PostOrderItemList(listItemOrder);
                if (result) {
                    sendEmailsTo();
                    clearCart();
                }
            }
        }
    };

    const sendEmailsTo = async () => {
        const emailToCust = {
            Greeting: '',
            ToAddress: currentUser.email,
            Subject: 'Your Deginery order receipt from ',
            Body: ReactDOMServer.renderToStaticMarkup(myHTML),
            IsBodyHtml: true,
            Attachments: [],
        };
        const { Greeting, ToAddress, Subject, Body, IsBodyHtml, Attachments } = emailToCust;
        const result = await sendEmails({ Greeting, ToAddress, Subject, Body, IsBodyHtml, Attachments });
        if (result && result.status === 200)
            navigate("/myPopUp");
        else {
            navigate(`/myErrorPage/${204}/${"שגיאה בעת שליחת מייל"}/${"back"}`);
        }
    };

    useEffect(() => {
        setMyHTML(
            <div>
                <Typography variant="h5">Thank you for your order</Typography>
                <List>
                    {currentCart.map(product => (
                        <ListItem key={product.productID}>
                            <ListItemText
                                primary={`${t('orderFormPage.nameTitle')} ${product[t('orderFormPage.nameProduct')]}
                                ${t('orderFormPage.descriptionTitle')} ${product[t('orderFormPage.descriptionProduct')]}
                                ${t('orderFormPage.wording')} ${product.wording}
                                ${t('orderFormPage.comments')} ${product.comment}
                                ${t('orderFormPage.price')} ${product.salePrice !== 0 ? product.salePrice : product.price}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
        setOrder({ ...order, "TotalAmount": calculateTotalPrice(currentCart) });
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
