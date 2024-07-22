import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PageTitle } from '../Layout Components/PageTitle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, getCart } from '../product/cookies/SetCart';
import { GetOrderByOrderId, PostOrder, PutAllPropOfOrder, } from '../../axios/OrderAxios';
import { PostOrderItemList } from '../../axios/OrderItemAxios';
import { PopUp } from '../Cart/popUp';
import { ListGroup } from 'react-bootstrap';

export const OrderForm = () => {
    const { t, i18n } = useTranslation();
    const { currentUser, connected } = useSelector(u => u.DataReducer_Users);
    const navigate = useNavigate();
    const [currentCart, setCurrentCart] = useState(getCart())

    const calculateTotalPrice = (products) => {
        debugger
        return products.reduce((total, product) => total + (product.salePrice != 0 ? product.salePrice : product.price), 0);
    }
    debugger
    return (<>

        <div className="container mt-5" >
            <div className="card">

                <h3>{t('orderFormPage.title')}</h3>
                <ListGroup>
                    <ListGroup.Item>
                        <p> <b>Name: </b>{currentUser.name} <b>Email:</b> {currentUser.email} <b>PhoneNumber: </b>{currentUser.phoneNumber} </p>
                    </ListGroup.Item>
                </ListGroup>
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
            <h5>{t('orderFormPage.TotalPayment')} {calculateTotalPrice(currentCart)}</h5>

        </div>

    </>
    )
}
