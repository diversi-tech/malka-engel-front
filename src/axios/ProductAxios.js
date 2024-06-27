import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL + "/api/myProduct/id"
//to see what is this!!!!!!!!!!!!
let s = "https://localhost:7297/api/Product/"
export const GetAllProducts = async (language) => {
    
    try {
        debugger
        // to ask what is mean language?? in the query string---
        let result = await axios.get(`${s}GetAllProducts/langId?langId=${language}`)
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

export const GetProById = async (language) => {
    debugger
    try {
        // to ask what is mean language?? in the query string---
        let result = await axios.get(`${API_BASE_URL}GetProById?Language=${language}`)
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}
