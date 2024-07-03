import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000'; // ניתן לשנות את זה לכתובת השרת הנכון שלך
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};