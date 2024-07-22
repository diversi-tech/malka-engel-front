import { Container, Form, ListGroup } from "react-bootstrap"
import { OrderForm } from "./OrderForm"
import { PayForm } from "./PayForm.js"
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { PageTitle } from '../Layout Components/PageTitle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, getCart } from '../product/cookies/SetCart';
import { GetOrderByOrderId, PostOrder, PutAllPropOfOrder, } from '../../axios/OrderAxios';
import { PostOrderItemList } from '../../axios/OrderItemAxios';
import { PopUp } from "../Cart/popUp.js";
import { SendEmail } from "../../axios/EmailAxios.js";

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
    const [myHTML, setMyHTML] = useState()

    // פונקציה לחישוב סך המחירים
    const calculateTotalPrice = (products) => {
        debugger
        return products.reduce((total, product) => total + (product.salePrice != 0 ? product.salePrice : product.price), 0);
    }
    const CreateOrder = async () => {
        if (!connected)
            navigate('/myToConnect')
        //--אחרי שהתקבל אישור מחברת באשראי---
        else {
            debugger
            //Add order// 
            // let t =calculateTotalPrice(currentCart)
            //alert(t)
            const result = await PostOrder(order);
            const orderidToAdd = result
            // end //
            if (!orderidToAdd) {
                alert("Failed to create order, please try again later");
                return;
            }
            else {
                // add item order // 
                // currentCart.map(async (product, index) => {
                const listItemOrder = []
                currentCart.map((product, i) => {
                    const itemOrder = {
                        "OrderItemID": 0,
                        "OrderID": orderidToAdd,
                        "ProductID": product.productID,
                        "Wording": product.wording,
                        "Comment": product.additionalComments,
                        "Price": product.salePrice != 0 ? product.salePrice : product.price,
                        "Comment":"",// product.comment,
                        "Wording": ""//product.wording
                    }
                    listItemOrder.push(itemOrder);
                })
                debugger
                const result = await PostOrderItemList(listItemOrder);
                // end //
                //delete all data from cookies
                if (result) {
setMyHTML(
   " <div> <h1>Thank you for your order</h1></div>"

/* <h1>Thank you for your order</h1>
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
</div>" */
)
                    // sendEmails();
                    clearCart();

                    alert("Thanks for Ordering in our site!")
                }


                // })
            }
        }
    };
    const sendEmails = async() => {
        // setEmailToCust({...emailToCust, ToAddress:"sr6737543@gmail.com"})

        const emailToCust = {
            Greeting: '',
            ToAddress: currentUser.email,
            Subject: 'Your Deginery order receipt from ' ,
            Body: "myHTML",
            IsBodyHtml: false,
            Attachments: [],
            // EmailList:null
        };
        debugger
        const { Greeting, ToAddress, Subject, Body } = emailToCust;
try{
            const result = await SendEmail( { Greeting, ToAddress, Subject, Body } )
            if (result && result.status == 200)
                alert("Email sent successfully")
}
catch(error){
   alert(error.message)
 
}
       
       
        
    }
    useEffect(() => {
        setOrder({ ...order, "TotalAmount": calculateTotalPrice(currentCart) })
    }, []);  

    return (<>
        <h3>--Payment page--</h3>
        <Container className="d-flex justify-content-center align-items-center vh-50">
            <OrderForm></OrderForm>

            <Form.Group className="d-flex justify-content-center align-items-center vh-50">
                <Form.Label> הערות חשובות שתרצה להוסיף</Form.Label>
                <Form.Control type="data"
                    onChange={(e) => { { setOrder({ ...order, "Comment": e.target.value }) } }} />
            </Form.Group>
            {/* </Container>
 <Container className="d-flex justify-content-center align-items-center vh-50"> */}
            <PayForm></PayForm> </Container>

        <butten class="btn btn-primary"
            onClick={CreateOrder}

        // onClick={(e)=>{ setOrder({...order, "totalAmount" : calculateTotalPrice(currentCart)});CreateOrder(e)}}
        >בצע הזמנה-place order</butten>


    </>)
}