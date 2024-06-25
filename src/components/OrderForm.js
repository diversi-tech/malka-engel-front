import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import ProductList from './ProductList';
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
        // מילוי של פרטי משתמש, אופציה לוגו ומוצרים שנבחרו
        console.log('Form submitted:', { name, address, phone, email, logoFile, products });
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
            <div>
            <PageTitle title="Order Form" />
           </div>  
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone:</label>
                    <input type="tel" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="logoOption" onChange={(e) => setLogoFile(e.target.checked ? e.target.files[0] : null)} />
                    <label className="form-check-label" htmlFor="logoOption">Add Logo</label>
                </div>

                {/* השדה לבחירת קובץ הלוגו */}
                {logoFile && <p>Selected Logo File: {logoFile.name}</p>}
                <div className="mb-3">
                    <label htmlFor="logoFile" className="form-label">Logo File:</label>
                    <input type="file" className="form-control" id="logoFile" onChange={handleLogoChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit Order</button>
            </form>
            <hr className="mt-5" />
            <h3>Products:</h3>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>{product}</li>
                ))}
            </ul>
            <h4 className="mt-4">Add Products:</h4>
            <div className="mb-3">
                <button className="btn btn-outline-secondary me-3" onClick={() => handleAddProduct('Product 1')}>Add Product 1</button>
                <button className="btn btn-outline-secondary" onClick={() => handleAddProduct('Product 2')}>Add Product 2</button>
            </div>
            {/* Additional buttons or inputs for adding more products */}
        </div>
    )

}


/* const [arrChoose, setArrChoose] = useState([]);

    // טעינת רשימת המוצרים שנוספו לסל מ-sessionStorage בעת טעינת הקומפוננטה
    useEffect(() => {
        const sessionStorageItems = JSON.parse(sessionStorage.getItem('arrChoose') || '[]');
        setArrChoose(sessionStorageItems);
    }, []);
    
     <div>
                <h2>סל הקניות</h2>
                <ul>
                    {arrChoose.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.price} ש"ח
                        </li>
                    ))}
                </ul>
            </div>
    */