import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL + "/api/myProduct/id"

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