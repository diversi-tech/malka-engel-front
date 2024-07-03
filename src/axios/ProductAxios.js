import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL + "/api/myProduct/id"
//to see what is this!!!!!!!!!!!!
let s = "https://localhost:7297/api/Product/"
export const GetAllProducts = async () => {
    try {
        debugger
        // to ask what is mean language?? in the query string---
        let result = await axios.get(`${s}GetAllProduct`)
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


export const PostProduct = async (productForm) => {
    try {
        let result = await axios.post("https://localhost:7297/api/Product/PostProduct", productForm)
        debugger
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}
