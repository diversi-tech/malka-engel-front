import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { PageTitle } from './PageTitle';

export const OrderForm = () => {
    const { t, i18n } = useTranslation();


    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [logoFile, setLogoFile] = useState(null); // משתנה לאחסון הקובץ שנבחר


    const handleAddProduct = (product) => {
        setProducts([...products, product]);
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0]; // בחירת הקובץ הראשון במקרה שיש מספר של הם
        if (file) {
            setLogoFile(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        debugger
        const userOrder = { name, address, phone, email, logoFile, products }
        // מילוי של פרטי משתמש, אופציה לוגו ומוצרים שנבחרו
        console.log('Form submitted:', { name, address, phone, email, products });
        alert("ההזמנה בוצעה! " + name ) 
        // כאן יצטרכו לשלוח לה מייל
        // איפוס לאחר שליחה
        setName('');
        setAddress('');
        setPhone('');
        setEmail('');
        setLogoFile(null);
        setProducts([]);
    };
    return (
        <div className="container mt-5">
            <div className="mb-4">
            <PageTitle title={t('orderFormPage.title')} />
           </div>  
            <form onSubmit={handleSubmit}>
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

                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="logoOption" onChange={(e) => setLogoFile(e.target.checked ? e.target.files[0] : null)} />
                    <label className="form-check-label" htmlFor="logoOption">{t('orderFormPage.addLogo')}</label>
                </div> */}

                {/* השדה לבחירת קובץ הלוגו */}
                {logoFile && <p>{t('orderFormPage.selectLogo')}{logoFile.name}</p>}
                <div className="mb-3">
                    <label htmlFor="logoFile" className="form-label">{t('orderFormPage.fileLogo')}</label>
                    <input type="file" className="form-control" id="logoFile" onChange={handleLogoChange} />
                </div>
                <button type="submit" className="btn btn-primary">{t('orderFormPage.buttonSubmitOrder')}</button>
            </form>
        </div>
    )

}
