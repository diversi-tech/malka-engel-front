import './App.css';
import './bootstrap.css';

import { Provider } from 'react-redux';
import { Store } from './redux/Stor.js';
import MyRouting from './components/Layout Components/MyRouting.js';
import Home from './components/Layout Components/Home.js';
import { Subscriber } from 'rxjs';
import React, { useEffect } from 'react';
import setupRefreshToken from './components/User Forms/Tokens/RefreshToken.js'; 
import AccessibilityButton from './components/accessibility/AccessibilityButton';
import authService from './axios/AuthenticationAxios.js';
import FileUpload from './components/FileUpload.js';


function App() {
  useEffect(() => {
    const token = authService.getAccessToken();
    if (token) {
      setupRefreshToken();
    }
  }, []);

  return (
    <div className="App">

      <Provider store={Store}>

      
        <MyRouting>     
        </MyRouting>
        <AccessibilityButton />


        {/* <FileUpload></FileUpload> */}
        {/* <img src='https://designery.s3.eu-north-1.amazonaws.com/A.jpg'></img> */}

        {/* <RecommendedProducts></RecommendedProducts> */}
      </Provider>
    </div> 
  );
}

export default App;
