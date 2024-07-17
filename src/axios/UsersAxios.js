import axios from "axios"

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/User/`

// const token = localStorage.getItem("token");
// if(token) {
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }
export const GetAllUsers = async () => {
    try {

        let result = await axios.get(`${API_BASE_URL}GetUsers`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}` 
              }
        }
        )
        return result
    }
    catch (ch) {
        console.log(ch)
    }
}

export const LoginUser = async (userLogin) => {
    debugger
    try {
        let result = await axios.post(`${API_BASE_URL}Login`, userLogin)
        debugger
        localStorage.setItem('token', result.data.token);
            
        //return token need to save in cookies
        return result
    }

    catch (ch) { debugger; return ch }
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
        let result = await axios.put(`${API_BASE_URL}PutUser?id=${user.userID}`, user)
        return result
    }
    catch (ch) {
        console.log(ch)
    }
}
export const GetUserDetails = async () => {

    try{
       
        debugger
let result = await axios.get(`${API_BASE_URL}GetUserDeteils`
    ,{
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
}
)
return result
    }
    catch(ch){
        console.log(ch)
    }
}
export const ResetPas = async (tokenFromUrl, pas) => {

    try{
       
        debugger
let result = await axios.put(`${API_BASE_URL}ResetPas?password=${pas}`,{},{
    headers: {
        'Authorization': `Bearer ${tokenFromUrl}` 
      }
}
)
return result
    }
    catch(ch){
        console.log(ch)
    }
}


