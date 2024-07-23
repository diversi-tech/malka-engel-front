import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getCart } from "../product/cookies/SetCart";
import { useNavigate } from "react-router-dom";
import { PopUp } from "../Cart/popUp.js";
import { sendEmails } from "../../axios/EmailAxios.js";
import ReactDOMServer from 'react-dom/server';
import { Container, Form, ListGroup } from "react-bootstrap"

export const SendEmailsForOrder = ()=>{

    const { t, i18n } = useTranslation();
    const { currentUser, connected } = useSelector(u => u.DataReducer_Users);
    const navigate = useNavigate();
    const [currentCart, setCurrentCart] = useState(getCart());


    const sendEmailsToCustomer = async(orderidToAdd) => {
        const myHTML = (<div >
        <h1>תודה על הזמנתך # {orderidToAdd}</h1>
         <ListGroup>
        {currentCart.map(product => (
            <ListGroup.Item key={product.productID}>
                <p> <strong>{t('orderFormPage.nameTitle')} </strong> {product[t('orderFormPage.nameProduct')]}
                <strong> {t('orderFormPage.descriptionTitle')} </strong>{product[t('orderFormPage.descriptionProduct')]}
                    <strong> {t('orderFormPage.wording')} </strong>{product.wording}
                    <strong> {t('orderFormPage.comments')} </strong>{product.comment}
        
                    <strong>{t('orderFormPage.price')} </strong> {product.salePrice != 0 ? product.salePrice : product.price}</p>
            </ListGroup.Item>
        ))}
        </ListGroup> 
        </div>
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