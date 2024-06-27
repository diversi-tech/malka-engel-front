import './App.css';
import './bootstrap.css';
import { Provider } from 'react-redux';
import { Store } from './redux/Stor.js';
import { MyRouting } from './components/MyRouting.js';


function App() {
  return (
    <div className="App">
 <Provider store={Store}>
      {/* <header className="App-header"> */}
  <MyRouting></MyRouting>
      {/* </header> */}
      </Provider>
    </div>
  );
}

export default App;
