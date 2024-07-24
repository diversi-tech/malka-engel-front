import axios from 'axios';
import Cookies from 'js-cookie';
import { ValidToken } from './TokenAxios'; 

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/auth/`;

let accessToken = null;

const setAccessToken = (token) => {
  accessToken = token;
  localStorage.setItem('token', token); // Store in localStorage for persistent use
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set default header
};

const getAccessToken = () => accessToken;

const login = async (email, password) => {
    try {
        const response = await axios.post(API_BASE_URL + 'login', { email, password });
        if (response.data.accessToken && response.data.refreshToken) {
          setAccessToken(response.data.accessToken);
            Cookies.set('refreshToken', response.data.refreshToken, { secure: true });

        // Validate the token after setting it
        const isValid = await ValidToken(response.data.accessToken);
        if (!isValid) {
          throw new Error('Invalid access token');
        }
         return response.data;
      } else {
        throw new Error('Login failed: No tokens received');
      }
    } catch (error) {
        // Handle login error
        console.error('Login failed:', error);
        throw error;
    }
};


const refreshToken = async () => {
    try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token found');
        }
    
        const response = await axios.post(API_BASE_URL + 'refresh', { accessToken: getAccessToken(), refreshToken: refreshToken });
        if (response.data.accessToken) {
            setAccessToken(response.data.accessToken);

        // Validate the new access token
        const isValid = await ValidToken(response.data.accessToken);
        if (!isValid) {
          throw new Error('Invalid access token');
        }
        return response.data;
      } else {
        throw new Error('Refresh failed: No new access token received');
      }
    } catch (error) {
        // Handle token refresh error
        console.error('Token refresh failed:', error);
        throw error; 
    }
};

const logout = () => {
  setAccessToken(null);
  Cookies.remove('refreshToken');
  localStorage.removeItem('token'); // Remove from localStorage
};

export default {
  login,
  refreshToken,
  logout,
  getAccessToken,
};
