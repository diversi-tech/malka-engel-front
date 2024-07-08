import axios from "axios"

// const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/User/`
const API_BASE_URL = `https://localhost:7297/api/User/`

export const GetAllUsers = async () => {
    try {
        debugger
        let result = await axios.get(`${API_BASE_URL}GetUsers`)

        debugger
        return result
    }
    catch (ch) {
        debugger
        console.log(ch)
    }
}

export const LoginUser = async (mail, pas) => {
    debugger
    try {

        let result = await axios.get(`${API_BASE_URL}Login/${mail}/${pas}`)
        debugger
        return result
    }

    catch (ch) { debugger; console.log(ch) }
}

export const PostUser = async (user) => {
    debugger
    try {
        let result = await axios.post(`${API_BASE_URL}PostUser`, user)
        return result
    }
    catch (ch) {
        console.log(ch)
    }
}

export const PutUser = async (user) => {
    debugger
    try {
        let result = await axios.put(`${API_BASE_URL}PutUser/${user.userID}`, user)
        return result
    }
    catch (ch) {
        console.log(ch)
    }
}
