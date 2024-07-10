import axios from "axios"

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/Review/`

export const GetAllReviews = async () => {
    try {
        debugger
        // to ask what is mean language?? in the query string---
        let result = await axios.get(`${API_BASE_URL}GetReviews`)
        return result;
    }
    catch (ch) {
        console.log(ch)
    }
}

export const AddReview = async (reviewToAdd) => {
    debugger
    try {
        //TODO//
        //THIS IS THE PATH:
        //https://localhost:7297/api/Review?prodId=1&userId=2&rating=2&comment=32
        let result = await axios.post(`${API_BASE_URL}AddReview`, reviewToAdd);
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

export const GetReviewByProd = async (prodId) => {
    debugger
    try {
        let result = await axios.get(`${API_BASE_URL}/GetReviewByProd/${prodId}`)
        return result
    }
    catch (ch) {
        console.log(ch)
    }
}

