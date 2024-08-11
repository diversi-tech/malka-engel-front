import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import { sendEmailsPdfFile } from '../../axios/EmailAxios';
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
        const htmlContent = (
            <Container sx={{ mt: 5, direction: 'rtl', textAlign: 'right' }}>
                <Paper elevation={3} sx={{ p: 3, fontFamily: 'Arial, sans-serif', color: '#4A4A4A', direction: 'rtl', textAlign: 'right' }}>
                    <div style={{ textAlign: 'center', backgroundColor: '#8CC9C7', padding: '15px 0', borderRadius: '5px 5px 0 0' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', color: '#555555' }}>בהוקרה</h3>
                    </div>
                    <div style={{ textAlign: 'center', margin: '20px 0', direction: 'rtl' }}>
                        <h2 style={{ fontSize: '24px', color: '#000000' }}> הזמנת לקוח</h2>
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
                </Paper>
            </Container>
        );
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.top = '-9999px';
        tempDiv.innerHTML = ReactDOMServer.renderToStaticMarkup(htmlContent);
        document.body.appendChild(tempDiv);

        const canvas = await html2canvas(tempDiv); // Convert HTML content to canvas
        const imgData = canvas.toDataURL('image/png'); // Convert canvas to PNG image



        // הגדרת משתנים לפדיאף
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width * 0.264583; // converting pixels to mm
        const imgHeight = canvas.height * 0.264583; // converting pixels to mm

        let position = 0;
        let heightLeft = imgHeight;

        while (heightLeft > 0) {
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pdfHeight;
            position -= pdfHeight;

            if (heightLeft > 0) {
                pdf.addPage();
            }
        }

        // הסרת ה-div הזמני מה-DOM
        document.body.removeChild(tempDiv);

        // קבלת הקובץ בפורמט blob ושימוש בפונקציה לשליחת מיילים
        const pdfBlob = pdf.output('blob');
        sendEmailsToAdmin(pdfBlob, orderidToAdd, htmlContent, order);

        //===============================================================

    }

    const sendEmailsToAdmin = async (pdf, orderidToAdd, htmlContent, order) => {
        const emailToAdmin = {
            Greeting: '',
            ToAddress: "d32193412@gmail.com",
            Subject: `הזמנה חדשה התקבלה # ${orderidToAdd} מתאריך: ${new Date().toLocaleString()} `,
            Body: ReactDOMServer.renderToStaticMarkup(htmlContent),
            IsBodyHtml: true,
            Attachments: [pdf],
        };
        const { Greeting, ToAddress, Subject, Body, IsBodyHtml, Attachments } = emailToAdmin;
        const result = await sendEmailsPdfFile({ Greeting, ToAddress, Subject, Body, IsBodyHtml, Attachments })
        if (!result || result.status != 200)
            navigate(`/myErrorPage/${204}/${"שגיאה בעת שליחת מייל"}/${"back"}`)
    }

    return {
        generatePDFHtml
    }
};

export default PdfGenerator;
