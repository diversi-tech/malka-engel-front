import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL+"/api/CommonQuestions/"

export const getCommonQuestions=async(language)=>{
  debugger
try{
let result = await axios.get(`${API_BASE_URL}GetAllCommonQuestions?Language=${language}`)
return result.data
}
catch(ch){
  console.log(ch)
}
}

