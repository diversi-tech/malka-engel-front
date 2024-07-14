import axios from "axios"
import Cookies from 'js-cookie';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/Token/`

export const ValidToken =async (token) =>{
try{
    let result = axios.get(`${API_BASE_URL}ValidateToken`,{
        headers: {
            // 'Content-Type': 'application/json',
            'token': `Bearer ${token}` // שליחת הטוקן בכותרת בשם "token"
        }
      })
      return result
}
 catch(err){return false}   
}