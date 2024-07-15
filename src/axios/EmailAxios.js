import axios from "axios"

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/Email`

export const SendEmail = async (emailRequest) => {
    try {
        debugger
        let result = await axios.post(`${API_BASE_URL}/send`, emailRequest)
        return result
    }
    catch (ch) {
        debugger
        console.log(ch)
    }
}

export const addEmail = async (newEmail) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/add-data`, newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};

export const SendEmails = async (newEmail) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/send-emails`, newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};