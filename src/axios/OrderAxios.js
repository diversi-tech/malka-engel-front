import axios from "axios"

// const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/orders/`
const API_BASE_URL = `https://localhost:7297/api/orders/`


export const GetAllOrders = async () => {
    try {
        // to ask what is mean language?? in the query string---
        let result = await axios.get(`${API_BASE_URL}GetAllOrders`)
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

export const GetOrderByOrderId = async (orderId) => {
    try {
        let result = await axios.get(`${API_BASE_URL}GetOrderByOrderId/${orderId}`)
        debugger
        return result
    }
    catch (ch) {
        debugger
        console.log(ch)
    }
}

export const GetOrderByUserId = async (userId) => {
    try {
        let result = await axios.get(`${API_BASE_URL}GetOrderByUserId/${userId}`)
        debugger
        return result
    }
    catch (ch) {
        debugger
        console.log(ch)
    }
}

export const PutOrder = async (id, status) => {
    try {
        let result = await axios.put(`${API_BASE_URL}PutOrder/${id}`, status);
        debugger
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

export const PostOrder = async (order) => {
    try {
        let result = await axios.post(`${API_BASE_URL}PostOrder`, order);
        debugger
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}