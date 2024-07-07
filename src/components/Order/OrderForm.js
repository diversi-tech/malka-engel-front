import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { PageTitle } from '../Layout Components/PageTitle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UnconnectedUserModal } from '../User Forms/NotConnected';
import { getCart } from '../product/cookies/SetCart';
import { PostOrder } from '../../axios/OrderAxios';
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
    const currentCart = useState(getCart());


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
        const order = {
            "OrderID": 0,
            "UserID": currentUser.UserID,
            "TotalAmount": 0,
            "Status": "Processing",
            "CreatedAt": null
        }
        const result = await PostOrder(order);
        if (result == true) {
            alert("Order added successfully");
        }
    }

    //function to create item order - for the general order
    const addOrderItem = async (product) => {
        // const itemOrder = {
        //     "OrderItemID":0,
        //     "OrderID":0,
        //     "ProductID":product.productID,
        //     "Quantity":product.quantity,
        //     "Price":product.price
        // }
        // const result = await PostOrderItem(itemOrder);
        const result = await PostOrderItem(product);
        if (result == true) {
            alert("Item added successfully");
        }
    }

    //
    const func_submit = () => {
        debugger
        if (!connected)
            navigate('/myUnconnectedUser')
        else {
            addOrder();
            currentCart.map((product, index) => {
                //TODO
                //to return from procedure the order id to set the order id in the item order!!
                //IMPORTANAT
                addOrderItem(product);
            })
        }
    };
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
        </div>
    )
}
