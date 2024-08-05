import axios from 'axios';

//Set the default Authorization header if a token is present in localStorage
const setAuthHeader = () => {
 const token = localStorage.getItem('token');
 if (token) {
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
 }
};

// Call setAuthHeader on initial load
setAuthHeader();

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/token/`;

// Function to validate the access token
export const ValidToken = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}ValidateToken`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response  //.data.IsValid; // Assuming backend returns { IsValid: true/false }
  } catch (err) {
    console.error('Token validation failed:', err);
    return false;
  }
};
