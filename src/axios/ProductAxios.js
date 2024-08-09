import axios from "axios"
import { GetAllSubcategoriesByCategoryID } from "./CategoryAxios";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/Product/`;

export const GetAllProducts = async () => {
    try {
        let result = await axios.get(`${API_BASE_URL}GetAllProducts`)
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

//לא בשימוש ניתן למחוק???
// export const GetProById = async (language) => {
   
//     try {
//         let result = await axios.get(`${API_BASE_URL}GetProById?Language=${language}`)
//         return result.data
//     }
//     catch (ch) {
//         console.log(ch)
//     }
// }

export const PutProduct = async (formData) => {
    try {
        const result = await axios.put(`${API_BASE_URL}PutProduct`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};



export const PostProduct = async ({ IsRecommended, image, SalePrice, Price, DescriptionEn, DescriptionHe, NameEn, NameHe, ProductID, ImageURL, CreatedAt }) => {
    try {
    const formData = new FormData();
    formData.append('IsRecommended', IsRecommended || '');
    formData.append('image', image || '');
    formData.append('SalePrice', SalePrice || '');
    formData.append('Price', Price || '');
    formData.append('DescriptionEn', DescriptionEn || '');
    formData.append('DescriptionHe', DescriptionHe || '');
    formData.append('NameEn', NameEn || '');
    formData.append('NameHe', NameHe || '');
    formData.append('ProductID', ProductID || '');
    formData.append('ImageURL', ImageURL || '');
    formData.append('CreatedAt', CreatedAt || '');

    const result = await axios.post(`${API_BASE_URL}PostProduct`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return result.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};



//לא בשימוש ניתן למחוק???
// export const GetRecommendedProducts = async () => {
//     try {
//         let result = await axios.get(`${API_BASE_URL}GetRecommendedProducts`)
//         return result.data
//     }
//     catch (ch) {
//         console.log(ch)
//     }
// }

export const GetProductsByCategory = async (categoryId) => {
    try {
        debugger
        const response = await axios.get(`${API_BASE_URL}GetProductByCategory/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
};

export const deleteProductInCategory = async (idCategory, idProduct) => {
    try {
        await axios.delete(`${API_BASE_URL}DeleteProductCategory/${idProduct}/${idCategory}`);
        return true;
    } catch (error) {
        console.error('Error delete product in category  :', error);
        throw error;
    }
};

export const addProductToCategory = async (idCategory, idProduct) => {
    try {
        debugger
        const response = await axios.post(`${API_BASE_URL}AddProductCategory/${idProduct}/${idCategory}`);
        return response.data;
    } catch (error) {
        console.error('Error adding product in category  :', error);
        throw error;
    }
};

export const CategoriesHierarchyByProductId = async (productId) => {
    debugger
    try {
        debugger
        const response = await axios.get(`${API_BASE_URL}${productId}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error get category by id :', error);
        throw error;
    }
};




// export const GetProductsByAllCategory = async (categoryId) => {
//     debugger
//     try {
//         debugger
//         let products = [];
//         const result = await GetAllSubcategoriesByCategoryID(categoryId);
//         for(let i = 0; i < result.data.length; i++) {
//             const response = await axios.get(`${API_BASE_URL}GetProductByCategory/${result.data[i].categoryId}`);
//             products = products.concat(response.data);
//             alert('success')
//        }
//         return products
//     } catch (error) {
//         alert('Error')
//         console.error('Error fetching products by category:', error);
//         throw error;
//     }
// };

export const GetProductsByAllCategory = async (categoryId) => {
    try {
        // Fetch all subcategories for the given category
        const subcategories = await GetAllSubcategoriesByCategoryID(categoryId);
        console.log('Subcategories data:', subcategories); // Debugging line

        // Ensure that subcategories is an array
        if (!Array.isArray(subcategories)) {
            throw new Error('Subcategories data is not in expected format');
        }

        // Map to hold product promises
        const productPromises = subcategories.map(subcategory => 
            axios.get(`${API_BASE_URL}GetProductByCategory/${subcategory.categoryId}`)
        );

        // Wait for all product promises to resolve
        const productResponses = await Promise.all(productPromises);
        console.log('Product responses:', productResponses); // Debugging line

        // Extract products from responses and combine them into a single array
        const products = productResponses.flatMap(response => response.data);
        console.log('All Products:', products); // Debugging line

        return products;
    } catch (error) {
        // Handle error gracefully
        console.error('Error fetching products by category:', error.message);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
        }
        throw error;
    }
};

export const GetProductsByCategoryAndSubcategories = async (categoryId)=>{
    try {
        const response = await axios.get(`${API_BASE_URL}GetProductsByCategoryAndSubcategories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching subcategories by category ID:', error);
        throw error;
    }
}