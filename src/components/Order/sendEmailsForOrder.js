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
    const sendEmailsToCustomer = async(orderidToAdd, order) => {
        const myHTML = (
                <Container sx={{ mt: 5, direction: 'rtl', textAlign: 'right' }}>

                    <Paper elevation={3} sx={{ p: 3, fontFamily: 'Arial, sans-serif', color: '#4A4A4A', direction: 'rtl', textAlign: 'right' }}>
                        <div style={{ textAlign: 'center', backgroundColor: '#8CC9C7', padding: '15px 0', borderRadius: '5px 5px 0 0' }}>
                        <h5 style={{ fontSize: '16px', margin: '10px 0' }}>היי  {currentUser.name} רק רצינו ליידע אותך שההזמנה שלך התקבלה בהצלחה</h5>
                            <h3 style={{ margin: 0, fontSize: '18px', color: '#555555' }}>בהוקרה</h3>
                        </div>
                        <div style={{ textAlign: 'center', margin: '20px 0', direction: 'rtl' }}>
                            <h2 style={{ fontSize: '24px', color: '#000000' }}>פרטי ההזמנה שלך</h2>
                            <p style={{ fontSize: '16px', margin: '10px 0' }}>מספר הזמנה: {orderidToAdd}</p>
                            <p style={{ fontSize: '14px', color: '#888888', margin: '10px 0' }}>תאריך הזמנה: {new Date().toLocaleString()}</p>
                        </div>
                        <Divider sx={{ mb: 2 }} />
                        <div style={{ textAlign: 'right', margin: '20px 0' }}>
                            <p><strong>{t('orderFormPage.name')}:</strong> {currentUser.name}</p>
                            <p><strong>{t('orderFormPage.phoneNumber')}:</strong> {currentUser.phoneNumber}</p>
                            <p><strong>{t('orderFormPage.email')}:</strong> {currentUser.email}</p>
                        </div>
                        <Divider sx={{ my: 2 }} />
                        <div style={{ textAlign: 'center', direction: 'rtl' }}>
                            <h3 style={{ fontSize: '16px', color: '#555555' }}>פירוט מוצרים:</h3>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', direction: 'rtl', textAlign: 'right' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#8CC9C7', textAlign: 'right' }}>
                                    <th style={{ padding: '10px' }}>{t('orderFormPage.nameTitle')}</th>
                                    <th style={{ padding: '10px' }}>{t('orderFormPage.wording')}</th>
                                    <th style={{ padding: '10px' }}>{t('orderFormPage.comments')}</th>
                                    <th style={{ padding: '10px' }}>{t('orderFormPage.price')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCart.map(product => (
                                    <tr key={product.productID} style={{ textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '10px' }}>{product[`name${currentLanguage}`]}</td>
                                        <td style={{ padding: '10px' }}> {showByHtmlTags(product.wording)}</td>
                                        <td style={{ padding: '10px' }}>{product.additionalComments} </td>
                                        <td style={{ padding: '10px' }}>{product.salePrice !== 0 ? product.salePrice : product.price} ₪</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Divider sx={{ my: 2 }} />
                        <div style={{ textAlign: 'right', marginBottom: '20px', direction: 'rtl' }}>
                            <p><strong>סיכום הזמנה:</strong></p>
                            <p><strong>סכום לתשלום:</strong> {calculateTotalPrice(currentCart)} ₪</p>
                            <p><strong>הערות:</strong> {order.Comment}</p>
                        </div>
                        <Divider sx={{ my: 2 }} />
                        <div style={{ textAlign: 'center', direction: 'rtl' }}>
                            <h3 style={{ fontSize: '16px', color: '#555555' }}>פירוט תשלום:</h3>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', direction: 'rtl', textAlign: 'right' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#8CC9C7', textAlign: 'right' }}>
                                    <th style={{ padding: '10px' }}>שיטת תשלום</th>
                                    <th style={{ padding: '10px' }}>תאריך</th>
                                    <th style={{ padding: '10px' }}>סכום</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '10px' }}>כרטיס אשראי</td>
                                    <td style={{ padding: '10px' }}>{new Date().toLocaleString()}</td>
                                    <td style={{ padding: '10px' }}>{calculateTotalPrice(currentCart)} ₪</td>
                                </tr>
                            </tbody>
                        </table>
                        <h5 style={{ margin: 0, fontSize: '18px', color: '#555555' }}>תודה על הזמנתך, נשמח תמיד לעמוד לשירותך </h5>
                        <h4 style={{ margin: 0, fontSize: '18px', color: '#555555' }}>קבלת ההזמנה עד 6 ימי עסקים. אנו נעדכן אותך ברגע שהזמנתך תושלם. </h4>

                    </Paper>
                </Container>
            );
        // setEmailToCust({...emailToCust, ToAddress:"sr6737543@gmail.com"})
        const emailToCust = {
            Greeting: '',
            ToAddress: currentUser.email,
            Subject: `הזמנתך מתאריך ${new Date().toLocaleString()}  בוצעה בהצלחה. הזמנה מספר  ${orderidToAdd}` ,
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
