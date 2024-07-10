import './App.css';
import './bootstrap.css';
import { Provider } from 'react-redux';
import { Store } from './redux/Stor.js';
import MyRouting from './components/Layout Components/MyRouting.js';
import Home from './components/Layout Components/Home.js';

import { Subscriber } from 'rxjs';
import { Review } from './components/product/productDetail/Review.js';
import { RecommendedProducts } from './components/product/RecommendedProducts.js';


function App() {
  
  return (
    <div className="App">
      <Provider store={Store}>
        <MyRouting></MyRouting>
        {/* <RecommendedProducts></RecommendedProducts> */}
      </Provider>
    </div> 
  );
}

export default App;
