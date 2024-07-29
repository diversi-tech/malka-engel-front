
import axios from 'axios';

const setAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

setAuthHeader();

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/token/`;

export const ValidToken = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}ValidateToken`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.IsValid;
  } catch (err) {
    console.error('Token validation failed:', err);
    return false;
  }
};




