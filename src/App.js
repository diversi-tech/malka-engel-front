import './App.css';
import './bootstrap.css';
import { Provider } from 'react-redux';
import { Store } from './redux/Stor.js';
import MyRouting from './components/Layout Components/MyRouting.js';

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <MyRouting></MyRouting>
      </Provider>
    </div>
  );
}

export default App;
