import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import {sendEmailsPdfFile} from '../../axios/EmailAxios';
import { useSelector } from 'react-redux';
import { getCart } from '../product/cookies/SetCart';
import { ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ReactDOMServer from 'react-dom/server';
import { Box, Typography, Container, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

const PdfGenerator = (orderidToAdd) => {
    const { t, i18n } = useTranslation();
const navigate = useNavigate()

const currentLanguage = 'He';

const { currentUser, connected } = useSelector(u => u.DataReducer_Users);
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
    // Function to generate PDF from HTML content
    const generatePDFHtml = async (orderidToAdd, order) => {
        const htmlContent =(
            <Container sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 3 }} >
                <Typography variant="h4" gutterBottom>
                <h3>הזמנה חדשה</h3>
                <h4>הזמנה חדשה מס'  {orderidToAdd} </h4>
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary={<strong> פרטי לקוח:</strong>}
                            secondary={
                                <span>
                                    <b>{t('orderFormPage.name')}: </b>{currentUser.name} <br />
                                    <b>{t('orderFormPage.email')}: </b>{currentUser.email} <br />
                                    <b>{t('orderFormPage.phoneNumber')}: </b>{currentUser.phoneNumber}
                                </span>
                            }
                        />
                    </ListItem >              
                    <strong>המוצרים שהוזמנו- - </strong>   
                                  
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
                        <ListItemText
                            primary={<strong>הערות לקוח:</strong>}
                            secondary={order.Comment}
                        />
                    </ListItem>
                </List>
            </Paper>
        </Container>
        )
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.top = '-9999px';
        tempDiv.innerHTML = htmlContent;
        document.body.appendChild(tempDiv);

        const canvas = await html2canvas(tempDiv); // Convert HTML content to canvas
        const imgData = canvas.toDataURL('image/png'); // Convert canvas to PNG image

        const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new jsPDF instance
        const pdfWidth = pdf.internal.pageSize.getWidth(); // Get the width of the PDF page
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Calculate the height of the PDF page

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); // Add the image to the PDF
   

       const pdfBlob = pdf.output('blob')
      sendEmailsToAdmin( pdfBlob, orderidToAdd, htmlContent, order) 
    }
 


    const sendEmailsToAdmin = async(pdf, orderidToAdd, htmlContent, order) => {
        const emailToAdmin = {
            Greeting: '',
            ToAddress: "d32193412@gmail.com",
            Subject:`הזמנה חדשה התקבלה # ${orderidToAdd} מתאריך: ${new Date().toLocaleDateString()} `,
             Body: ReactDOMServer.renderToStaticMarkup(htmlContent),
            IsBodyHtml: true,
            Attachments: [pdf],
        };
        const { Greeting, ToAddress, Subject, Body,IsBodyHtml, Attachments } = emailToAdmin;
            const result = await sendEmailsPdfFile( { Greeting, ToAddress, Subject, Body,IsBodyHtml, Attachments } )
            if (!result || result.status != 200)
                navigate(`/myErrorPage/${204}/${"שגיאה בעת שליחת מייל"}/${"back"}`)            
    }
    
    return {
        generatePDFHtml
    }
};

export default PdfGenerator;