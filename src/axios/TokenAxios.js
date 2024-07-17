import axios from "axios"
const token = localStorage.getItem("token");
if(token) {
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/Token/`

export const ValidToken =async (token) =>{
try{
    let result = axios.get(`${API_BASE_URL}ValidateToken`,{
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // שליחת הטוקן בכותרת בשם "token"
        }
      })
      return result
}
 catch(err){return false}   
}