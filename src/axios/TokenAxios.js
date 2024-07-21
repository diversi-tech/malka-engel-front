import axios from "axios"

if(localStorage.getItem("token")) {
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
}

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/Token/`

export const ValidToken =async (token) =>{
try{
    let result = axios.get(`${API_BASE_URL}ValidateToken`
        ,{
            headers: {
                'Authorization': `Bearer ${token}` 
              }
        }
    )
      return result
}
 catch(err){return false}   
}