import axios from "axios"

const API_BASE_URL = "https://localhost:7297/api/User"


export const GetAllUsers= async()=>{
    try{
        debugger
let result = await axios.get("https://localhost:7297/api/User/GetUsers")
      
debugger
return result
    }
    catch(ch){
        debugger
        console.log(ch)
    }
}
export const LoginUser= async(mail, pas)=>{
    try{
        debugger
// let result = await axios.get(`${API_BASE_URL}/Login/${mail}/${pas}`)
let result = await axios.get(`${API_BASE_URL}/Login?mail=${mail}&pas=${pas}`)

debugger
return result
    }
    catch(ch){
        debugger
        console.log(ch)
    }
}
