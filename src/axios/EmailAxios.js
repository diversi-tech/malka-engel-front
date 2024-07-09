import axios from "axios"
const API_BASE_URL = "https://localhost:7297/api/Email"
export const SendEmail = async (emailRequest) => {
    try {
        debugger
        let result = await axios.post("https://localhost:7297/api/Email/send", emailRequest)
        return result
    }
    catch (ch) {
        debugger
        console.log(ch)
    }
}

export const addEmail = async (newEmail) => {
    try {
        const response = await axios.put("https://localhost:7297/api/Email/add-data", newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};

export const SendEmails = async (newEmail) => {
    try {
        const response = await axios.post("https://localhost:7297/api/Email/send-emails", newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};