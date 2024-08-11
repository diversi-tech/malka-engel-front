// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Box, Typography, Container, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
// import { clearCart, getCart } from '../product/cookies/SetCart';
// import { GetOrderByOrderId, PostOrder, PutAllPropOfOrder } from '../../axios/OrderAxios';
// import { PostOrderItemList } from '../../axios/OrderItemAxios';
// import { PopUp } from '../Cart/popUp';
// import { PageTitle } from '../Layout Components/PageTitle';

// export const OrderForm = () => {
//     const { t, i18n } = useTranslation();
//     const { currentUser, connected } = useSelector(u => u.DataReducer_Users);
//     const currentLanguage = i18n.language === 'en' ? 'En' : 'He';
//     const navigate = useNavigate();
//     const [currentCart, setCurrentCart] = useState(getCart());

//     const calculateTotalPrice = (products) => {
//         return products.reduce((total, product) => total + (product.salePrice !== 0 ? product.salePrice : product.price), 0);
//     };
//     const showByHtmlTags = (htmlString) => {
//         if (htmlString.startsWith('"') && htmlString.endsWith('"')) 
//             htmlString = htmlString.slice(1, -1);
//         return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
//     };

//     return (
//         <Container sx={{ mt: 5 }}>
//             <Paper elevation={3} sx={{ p: 3 }}>
//                 <Typography variant="h4" gutterBottom>
//                     {t('orderFormPage.title')}
//                 </Typography>
//                 <List>
//                     <ListItem>
//                         <ListItemText
//                             primary={<strong>{t('orderFormPage.customerInfo')}</strong>}
//                             secondary={
//                                 <span>
//                                     <b>{t('orderFormPage.name')}: </b>{currentUser.name} <br />
//                                     <b>{t('orderFormPage.email')}: </b>{currentUser.email} <br />
//                                     <b>{t('orderFormPage.phoneNumber')}: </b>{currentUser.phoneNumber}
//                                 </span>
//                             }
//                         />
//                     </ListItem>
//                     <Divider />
//                     {currentCart.map(product => (
//                         <ListItem key={product.productID}>
//                             <ListItemText
//                                 primary={
//                                     <span style={{ whiteSpace: 'nowrap' }}>
//                                         <b>{t('orderFormPage.nameTitle')}: </b> {product[`name${currentLanguage}`]} <br />
//                                         <b>{t('orderFormPage.descriptionTitle')}: </b>{product[`description${currentLanguage}`]}<br />
//                                         <b>{t('orderFormPage.wording')}:</b> {showByHtmlTags(product.wording)}
//                                         <b>{t('orderFormPage.comments')}: </b>{product.additionalComments} <br />
//                                         <b>{t('orderFormPage.price')}: </b>{product.salePrice !== 0 ? product.salePrice : product.price}
//                                     </span>
//                                 }
//                             />
//                         </ListItem>
//                     ))}
//                     <Divider />
//                     <ListItem>
//                         <ListItemText
//                             primary={<strong>{t('orderFormPage.totalPayment')}</strong>}
//                             secondary={calculateTotalPrice(currentCart)}
//                         />
//                     </ListItem>
//                 </List>
//             </Paper>
//         </Container>
//     );
// };


import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Container, Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getCart } from '../product/cookies/SetCart';

export const OrderForm = () => {
    const { t, i18n } = useTranslation();
    const { currentUser } = useSelector(u => u.DataReducer_Users);
    const currentLanguage = i18n.language === 'en' ? 'En' : 'He';
    const currentCart = getCart();

    const calculateTotalPrice = (products) => {
        return products.reduce((total, product) => total + (product.salePrice !== 0 ? product.salePrice : product.price), 0);
    };

    const showByHtmlTags = (htmlString) => {
        if (htmlString.startsWith('"') && htmlString.endsWith('"'))
            htmlString = htmlString.slice(1, -1);
        return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    {t('orderFormPage.title')}
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary={<strong>{t('orderFormPage.customerInfo')}</strong>}
                            secondary={
                                <div>
                                    <b>{t('orderFormPage.name')}: </b>{currentUser.name} <br />
                                    <b>{t('orderFormPage.email')}: </b>{currentUser.email} <br />
                                    <b>{t('orderFormPage.phoneNumber')}: </b>{currentUser.phoneNumber}
                                </div>
                            }
                        />
                    </ListItem>
                    <Divider />
                    {currentCart.map(product => (
                        <ListItem key={product.productID}>
                            <ListItemText
                                primary={
                                    <div>
                                        <b>{t('orderFormPage.nameTitle')}: </b> {product[`name${currentLanguage}`]} <br />
                                        <b>{t('orderFormPage.descriptionTitle')}: </b>{product[`description${currentLanguage}`]}<br />
                                        <b>{t('orderFormPage.wording')}:</b> {showByHtmlTags(product.wording)}
                                        <br />
                                        <b>{t('orderFormPage.comments')}: </b>{product.additionalComments} <br />
                                        <b>{t('orderFormPage.price')}: </b>{product.salePrice !== 0 ? product.salePrice : product.price}
                                    </div>
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
    );
};

export default OrderForm;
