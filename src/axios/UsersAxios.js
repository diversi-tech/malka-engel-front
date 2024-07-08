import axios from "axios"

const API_BASE_URL = "https://localhost:7297/api/User"


export const GetAllUsers = async () => {
    try {
        let result = await axios.get("https://localhost:7297/api/User/GetUsers")
        return result
    }
    catch (ch) {
        console.log(ch)
    }
}

export const GetOrderByUserId = async (userId) => {
    try {
        let result = await axios.get(`https://localhost:7297/api/orders/GetOrderByUserId/${userId}`)
        return result
    }
    catch (ch) {
        console.log(ch)
    }
}

export const LoginUser = async (mail, pas) => {
    debugger
    try {

        let result = await axios.get(`${API_BASE_URL}/Login?mail=${mail}&pas=${pas}`)
        debugger
        return result
    }
    
    catch (ch) {debugger; console.log(ch) }
}
export const PostUser = async (user)=>{
    debugger
    try{
let result = await axios.post(`${API_BASE_URL}/PostUser`, user)
return result
    }
    catch(ch){      
        console.log(ch)
    }
}
export const PutUser = async (user)=>{
    debugger
    try{
let result = await axios.put(`${API_BASE_URL}/PutUser?id=${user.userID}`, user)
return result
    }
    catch(ch){      
        console.log(ch)
    }
}
