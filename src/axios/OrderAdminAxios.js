import axios from "axios"
const API_BASE_URL = process.env.REACT_APP_API_URL + "/api/orders"
//to see what is this!!!!!!!!!!!!
let s = "https://localhost:7297/api/orders/"
export const GetAllOrders = async () => {
    try{
        // to ask what is mean language?? in the query string---
        let result = await axios.get(`${s}GetAllOrders`)
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}
export const PutOrder = async (order) => {
    debugger
    try {
        
        let result = await axios.put(`${s}PutOrder`, order);
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}
