import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL + "/api/Review"

let s = "https://localhost:7297/api/Review"
export const GetAllReviews = async () => {
    try {
        debugger
        // to ask what is mean language?? in the query string---
        let result = await axios.get(`${s}`)
        return result;
    }
    catch (ch) {
        console.log(ch)
    }
}

export const AddReview = async (reviewToAdd) => {
    debugger
    try {
        // to ask what is mean language?? in the query string---
        let result = await axios.post(`${API_BASE_URL}/AddReview`, reviewToAdd);
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

export const GetReviewByProd = async (prodId) => {
    try {
        let result = await axios.get(`${s}/GetReviewByProd/${prodId}`)
        return result
    }
    catch (ch) {
        console.log(ch)
    }
}

