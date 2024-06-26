import axios from "axios";


// const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/CommonQuestions/`
const API_BASE_URL = "https://localhost:7297/api/CommonQuestions/"

export const getCommonQuestions=async(language)=>{
  
try{
let result = await axios.get(`${API_BASE_URL}GetAllFAQ/${language}`)       
//(`${API_BASE_URL}GetAllFAQ/${language}`)

return result.data
}
catch(ch){
  console.log(ch)
}
}

