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
import { sendEmails } from "../../axios/EmailAxios.js";
import ReactDOMServer from 'react-dom/server';
import PdfGenerator from "./PdfGenerator.js";
import { SendEmailsForOrder, sendEmailsForOrder } from "./sendEmailsForOrder.js";

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
            setOrder({...order,  OrderID: orderidToAdd})
            // end //
            if (!orderidToAdd || orderidToAdd  == -1) {
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
                       // "Quantity": product.quantity,
                        "Price": product.salePrice != 0 ? product.salePrice : product.price,
                        "Comment": "",//product.comment,
                        "Wording":"" //product.wording
                    }
                    listItemOrder.push(itemOrder);
                })
                debugger
                const result = await PostOrderItemList(listItemOrder);
                // end //
                //delete all data from cookies
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