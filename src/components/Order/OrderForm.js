import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { PageTitle } from '../Layout Components/PageTitle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UnconnectedUserModal } from '../User Forms/NotConnected';
import { getCart } from '../product/cookies/SetCart';
import { GetAllOrders, PostOrder } from '../../axios/OrderAxios';
import { PostOrderItem } from '../../axios/OrderItemAxios';

export const OrderForm = () => {
    const { t, i18n } = useTranslation();


    // const [products, setProducts] = useState([]);
    // const [name, setName] = useState('');
    // const [address, setAddress] = useState('');
    // const [phone, setPhone] = useState('');
    // const [email, setEmail] = useState('');
    // const [logoFile, setLogoFile] = useState(null); // משתנה לאחסון הקובץ שנבחר
    const { currentUser, connected } = useSelector(u => u.DataReducer_Users);
    const navigate = useNavigate();
    const [currentCart, setCurrentCart] = useState(getCart());


    // const handleAddProduct = (product) => {
    //     setProducts([...products, product]);
    // };

    // const handleLogoChange = (e) => {
    //     const file = e.target.files[0]; // בחירת הקובץ הראשון במקרה שיש מספר של הם
    //     if (file) {
    //         setLogoFile(file);
    //     }
    // };

    //function to create order
    const addOrder = async () => {
        debugger
        const order = {
            "OrderID": 0,
            "UserID": currentUser.userID,
            "TotalAmount": 0,
            "Status": "Processing",
            "CreatedAt": null
        }
        debugger
        const result = await PostOrder(order);
        return result;
    }

    //function to create item order - for the general order
    const addOrderItem = async (product, orderidToAdd) => {
        const itemOrder = {
            "OrderItemID": 0,
            "OrderID": orderidToAdd,
            "ProductID": product.productID,
            "Quantity": product.quantity,
            "Price": product.price
        }
        const result = await PostOrderItem(itemOrder);
        //TODO
        //update the order item - orderId to be match to the current order
    }

    //
    const func_submit = async () => {
        debugger
        if (!connected)
            navigate('/myUnconnectedUser')
        else {
            const order = {
                "OrderID": 0,
                "UserID": currentUser.userID,
                "TotalAmount": 0,
                "Status": "Processing",
                "CreatedAt": "2024-07-07T09:31:32.38"
            }
            debugger
            const result = await PostOrder(order);
            const orderidToAdd = result
            if (!orderidToAdd) {
                alert("Failed to create order, please try again later");
                return;
            }
            else {
                debugger
                alert(orderidToAdd)
                currentCart.map(async (product, index) => {
                    //it is not do the map
                    //TODO
                    //to return from procedure the order id to set the order id in the item order!!
                    //IMPORTANAT
                        const itemOrder = {
                            "OrderItemID": 0,
                            "OrderID": orderidToAdd,
                            "ProductID": product.productID,
                            "Quantity": product.salePrice,
                            "Price": product.price
                        }
                        const result = await PostOrderItem(itemOrder);
                        alert(result);
                    
                })
            }
        }
    };

    const func_submit_1 = async () => {
        const order = await GetAllOrders();
        debugger
    }
    return (
        <div className="container mt-5">
            <div className="mb-4">
                <PageTitle title={t('orderFormPage.title')} />
            </div>
            <h3>פרטי אשראי!</h3>
            {/* <form >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">{t('orderFormPage.name')}</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">{t('orderFormPage.address')}</label>
                    <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">{t('orderFormPage.phone')}</label>
                    <input type="tel" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">{t('orderFormPage.email')}</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="logoOption" onChange={(e) => setLogoFile(e.target.checked ? e.target.files[0] : null)} />
                    <label className="form-check-label" htmlFor="logoOption">{t('orderFormPage.addLogo')}</label>
                </div>

                {logoFile && <p>{t('orderFormPage.selectLogo')}{logoFile.name}</p>}
                <div className="mb-3">
                    <label htmlFor="logoFile" className="form-label">{t('orderFormPage.fileLogo')}</label>
                    <input type="file" className="form-control" id="logoFile"/>
                </div>
            </form> */}
            <button onClick={func_submit} className="btn btn-primary">{t('orderFormPage.buttonSubmitOrder')}</button>
            <button onClick={func_submit_1} className="btn btn-primary">hhhhhh</button>

        </div>
    )
}
