import { jwtDecode } from 'jwt-decode';
import authService from '../../../axios/AuthenticationAxios'; 

const setupRefreshToken = () => {
  const accessToken = authService.getAccessToken();
  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);
    const expiryTime = decodedToken.exp * 1000 - 60000; // 1 minute before expiry
    const timeout = expiryTime - Date.now();

    if (timeout > 0) {
      setTimeout(async () => {
       try {
          await authService.refreshToken();
        } catch (error) {
          console.error('Failed to refresh token:', error);
          authService.logout();
      } 
       setupRefreshToken(); // Re-setup refresh
      }, timeout);
    }
  }
};

export default setupRefreshToken;
