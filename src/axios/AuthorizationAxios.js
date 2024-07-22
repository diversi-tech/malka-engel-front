import axios from 'axios';
import Cookies from 'js-cookie';
import { ValidToken } from './TokenAxios'; 

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/auth/`;

let accessToken = null;

const setAccessToken = (token) => {
  accessToken = token;
};

const getAccessToken = () => accessToken;

const login = async (email, password) => {
    try {
        const response = await axios.post(API_BASE_URL + 'login', { email, password });
        if (response.data.AccessToken) {
            setAccessToken(response.data.AccessToken);
            Cookies.set('refreshToken', response.data.RefreshToken, { secure: true });

        // Validate the token after setting it
        const isValid = await ValidToken(response.data.AccessToken);
        if (!isValid) {
          throw new Error('Invalid access token');
        }
        return response.data;
      }
    } catch (error) {
        // Handle login error
        console.error('Login failed:', error);
        throw error; // Propagate the error to handle in UI components
    }
};


const refreshToken = async () => {
    try {
        const refreshToken = Cookies.get('refreshToken');
        const response = await axios.post(API_BASE_URL + 'refresh', { AccessToken: getAccessToken(), RefreshToken: refreshToken });
        if (response.data.AccessToken) {
            setAccessToken(response.data.AccessToken);

        // Validate the new access token
        const isValid = await ValidToken(response.data.AccessToken);
        if (!isValid) {
          throw new Error('Invalid access token');
        }
        return response.data;
      }
    } catch (error) {
        // Handle token refresh error
        console.error('Token refresh failed:', error);
        throw error; // Propagate the error to handle in UI components
    }
};

const logout = () => {
  setAccessToken(null);
  Cookies.remove('refreshToken');
};

export default {
  login,
  refreshToken,
  logout,
  getAccessToken,
};
