import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/CommonQuestions/`

export const getCommonQuestions = async () => {

  try {
    let result = await axios.get(`${API_BASE_URL}GetAllFAQ`)
    return result
  }
  catch (ch) {
    console.log(ch)
  }
}

export const updateQuestion = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}PutFAQ/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
};

export const deleteQuestion = async (cqId) => {
    debugger
  try {
    const result = await axios.delete(`${API_BASE_URL}DeleteFAQ/${cqId}`)
  
    return result.data;
  }
  catch (ch) {
    debugger
    console.log(ch)
  }
}

export const addQuestion = async (newQuestion) => {
  try {
    const response = await axios.post(`${API_BASE_URL}PostFAQ`, newQuestion);
    return response.data;
  } catch (error) {
    console.error('Error adding question:', error);
    throw error;
  }
};