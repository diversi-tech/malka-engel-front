import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL + "/api/orders"
//to see what is this!!!!!!!!!!!!
let s = "https://localhost:44314/api/orders/"

export const GetAllProducts = async () => {
    try{
        // to ask what is mean language?? in the query string---
        let result = await axios.get(`${s}GetAllOrders`)
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}


export const PutOrder = async (id, status) => {
    try {
        let result = await axios.post(`${s}PostProduct/${id}`, status);
        debugger
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}
