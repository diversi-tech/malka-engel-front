import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL + "/api/Reviews/"

export const GetAllReviews = async (language) => {
    debugger
    try {
        // to ask what is mean language?? in the query string---
        let result = await axios.get(`${API_BASE_URL}GetAllReviews?Language=${language}`)
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}
export const AddReview = async (language, reviewToAdd) => {
    debugger
    try {
        // to ask what is mean language?? in the query string---
        let result = await axios.post(`${API_BASE_URL}AddReview?Language=${language}`, reviewToAdd);
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

