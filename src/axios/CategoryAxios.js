import axios from 'axios';


// const API_BASE_URL = process.env.REACT_APP_API_URL + "/api/myProduct/id"
//to see what is this!!!!!!!!!!!!
let p = "https://localhost:7297/api/Product/"
let c = "https://localhost:7297/api/Categories/"

export const GetAllCategories = async () => {
    try {
        const response = await axios.get(`${c}GetAllCategories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
}


//7297/adebugger
export const GetProductsByCategory = async (categoryId) => {
    try {
        debugger
        const response = await axios.get(`${p}GetProductByCategory/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
};

// פעולה להוספת קטגוריה
export const addCategory = async (category) => {
    try {
        const response = await axios.post(`${c}AddCategory`, category);
        return response;//.data;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};

// פעולה לעדכון קטגוריה
export const updateCategory = async (idCategory, category) => {
    try {
        debugger
        const response = await axios.put(`${c}UpdateCategory/${idCategory}`, category);
        return response.data;
    } catch (error) {
        console.error('Error update category :', error);
        throw error;
    }
};

// פעולה למחיקת מוצר בקטגוריה לפי ID
export const deleteProductInCategory = async (idCategory, idProduct) => {
    try {
        await axios.delete(`${p}DeleteProductCategory/${idProduct}/${idCategory}`);
        return true;
    } catch (error) {
        console.error('Error delete product in category  :', error);
        throw error;
    }
};

// פעולה להוספת מוצר לקטגוריה לפי ID
export const addProductToCategory = async (idCategory, idProduct) => {
    try {
        debugger
        const response = await axios.post(`${p}AddProductCategory/${idProduct}/${idCategory}`);
        return response.data;
    } catch (error) {
        console.error('Error adding product in category  :', error);
        throw error;
    }
};


