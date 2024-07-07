import axios from "axios"

const API_BASE_URL = "https://localhost:7297/api/Email"




export const SendEmail = async (emailRequest) => {
    try {
        debugger
        let result = await axios.post("https://localhost:7297/api/Email/send", emailRequest)

        debugger
        return result
    }
    catch (ch) {
        debugger
        console.log(ch)
    }
}
