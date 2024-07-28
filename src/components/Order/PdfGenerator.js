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

const PdfGenerator = (orderidToAdd) => {
    const { t, i18n } = useTranslation();
const navigate = useNavigate()

const { currentUser, connected } = useSelector(u => u.DataReducer_Users);
const [currentCart, setCurrentCart] = useState(getCart());
    

    // Function to generate PDF from HTML content
    const generatePDFHtml = async (orderidToAdd) => {
        const htmlContent = `
        <div style="padding: 20px; background-color: #F249CB;">
            <h1>${orderidToAdd} הזמנה מספר:</h1>
            <h4>פרטי לקוח:</h4>
                 
                 <p> <b>Name: </b>${currentUser.name} <b>Email:</b> ${currentUser.email} <b>PhoneNumber: </b>${currentUser.phoneNumber} </p>
              
            <ul>
                ${currentCart.map(product => `
                    <li key="${product.productID}">
                        <p>
                            <strong>${t('orderFormPage.nameTitle')}</strong> ${product[t('orderFormPage.nameProduct')]}
                            <strong>${t('orderFormPage.descriptionTitle')}</strong> ${product[t('orderFormPage.descriptionProduct')]}
                            <strong>${t('orderFormPage.wording')}</strong> ${product.wording}
                            <strong>${t('orderFormPage.comments')}</strong> ${product.comment}
                            <strong>${t('orderFormPage.price')}</strong> ${product.salePrice !== 0 ? product.salePrice : product.price}
                        </p>
                    </li>`).join('')}
            </ul>
        </div>`;

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
      sendEmailsToAdmin( pdfBlob, orderidToAdd, htmlContent) 
    }
 


    const sendEmailsToAdmin = async(pdf, orderidToAdd, htmlContent) => {
        const emailToAdmin = {
            Greeting: '',
            ToAddress: "d32193412@gmail.com",
            Subject: 'הזמנה חדשה התקבלה #' +orderidToAdd,
             Body:  htmlContent,         
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
