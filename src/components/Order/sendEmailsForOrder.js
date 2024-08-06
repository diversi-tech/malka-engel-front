import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getCart } from "../product/cookies/SetCart";
import { useNavigate } from "react-router-dom";
import { PopUp } from "../Cart/popUp.js";
import { sendEmails } from "../../axios/EmailAxios.js";
import ReactDOMServer from 'react-dom/server';
import {  Form, ListGroup } from "react-bootstrap"
import { Box, Typography, Container, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

export const SendEmailsForOrder = ()=>{
    
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language === 'en' ? 'En' : 'He';
    const { currentUser, connected } = useSelector(u => u.DataReducer_Users);
    const navigate = useNavigate();
    const [currentCart, setCurrentCart] = useState(getCart());
    const calculateTotalPrice = (products) => {
        return products.reduce((total, product) => total + (product.salePrice !== 0 ? product.salePrice : product.price), 0);
    };
    const showByHtmlTags = (htmlString) => {
        debugger
        if (htmlString.startsWith('"') && htmlString.endsWith('"')) 
            htmlString = htmlString.slice(1, -1);
        return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
    };
    const sendEmailsToCustomer = async(orderidToAdd) => {
        const myHTML = ( <Container sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                <h1>תודה על הזמנתך # {orderidToAdd}</h1>
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary={<strong>{t('orderFormPage.customerInfo')}</strong>}
                            secondary={
                                <span>
                                    <b>{t('orderFormPage.name')}: </b>{currentUser.name} <br />
                                    <b>{t('orderFormPage.email')}: </b>{currentUser.email} <br />
                                    <b>{t('orderFormPage.phoneNumber')}: </b>{currentUser.phoneNumber}
                                </span>
                            }
                        />
                    </ListItem>
                    <Divider />
                    {currentCart.map(product => (
                        <ListItem key={product.productID}>
                            <ListItemText
                                primary={
                                    <span style={{ whiteSpace: 'nowrap' }}>
                                        <b>{t('orderFormPage.nameTitle')}: </b> {product[`name${currentLanguage}`]} <br />
                                        <b>{t('orderFormPage.descriptionTitle')}: </b>{product[`description${currentLanguage}`]}<br />
                                        <b>{t('orderFormPage.wording')}:</b> {showByHtmlTags(product.wording)}
                                        <b>{t('orderFormPage.comments')}: </b>{product.additionalComments} <br />
                                        <b>{t('orderFormPage.price')}: </b>{product.salePrice !== 0 ? product.salePrice : product.price}
                                    </span>
                                }
                            />
                        </ListItem>
                    ))}
                    <Divider />
                    <ListItem>
                        <ListItemText
                            primary={<strong>{t('orderFormPage.totalPayment')}</strong>}
                            secondary={calculateTotalPrice(currentCart)}
                        />
                    </ListItem>
                </List>
            </Paper>
        </Container>
        )  
        // setEmailToCust({...emailToCust, ToAddress:"sr6737543@gmail.com"})
        const emailToCust = {
            Greeting: '',
            ToAddress: currentUser.email,
            Subject: `הזמנתך בוצעה בהצלחה הזמנה מספר  ${orderidToAdd}` ,
            Body: ReactDOMServer.renderToStaticMarkup(myHTML),         
            IsBodyHtml: true,
            Attachments: [],
            // EmailList:null
        };
        const { Greeting, ToAddress, Subject, Body,IsBodyHtml, Attachments } = emailToCust;

    debugger
            const result = await sendEmails( { Greeting, ToAddress, Subject, Body,IsBodyHtml, Attachments } )
            if (result && result.status == 200)
                navigate("/myPopUp")

else{
    navigate(`/myErrorPage/${204}/${"שגיאה בעת שליחת מייל"}/${"back"}`)

}
         
    }


   
    return{
        sendEmailsToCustomer,
    }

}