import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PostProduct } from '../axios/ProductAxios';

const ProductForm = () => {
    const [nameHe, setNameHe] = useState('');
    const [descriptionHe, setDescriptionHe] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [price, setPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        debugger
        const formData = new FormData();
        formData.append('ProductID', 0);
        formData.append('NameHe', nameHe);
        formData.append('DescriptionHe', descriptionHe);
        formData.append('Price', price);
        formData.append('SalePrice', salePrice);
        formData.append('NameEn', nameEn);
        formData.append('DescriptionEn', descriptionEn);
        if (image) {
            formData.append('ImageURL', image);
            formData.append('Image', image)
        }

        try {
            const response = await PostProduct(formData);
            if (response) {
                alert('Product added successfully');
            }
        } catch (error) {
            console.error('Error adding product:', error.response || error.message);
            alert('Failed to add product');
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name (Hebrew)</label>
                    <input type="text" className="form-control" value={nameHe} onChange={(e) => setNameHe(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description (Hebrew)</label>
                    <textarea className="form-control" value={descriptionHe} onChange={(e) => setDescriptionHe(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Sale Price</label>
                    <input type="number" className="form-control" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Name (English)</label>
                    <input type="text" className="form-control" value={nameEn} onChange={(e) => setNameEn(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description (English)</label>
                    <textarea className="form-control" value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>

            </form>
        </div>
    );
};

export default ProductForm;
