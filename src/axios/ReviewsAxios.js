import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL + "/api/Reviews/"

export const GetAllReviews = async () => {
    debugger
    try {
        // to ask what is mean language?? in the query string---
        let result = await axios.get(`${API_BASE_URL}GetAllReviews`)
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}
export const AddReview = async (reviewToAdd) => {
    debugger
    try {
        // to ask what is mean language?? in the query string---
        let result = await axios.post(`${API_BASE_URL}AddReview`, reviewToAdd);
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

