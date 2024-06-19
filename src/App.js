import './App.css';
import { MyRouting } from './components/MyRouting.js';
import Login from './components/Login';
import { PopUp } from './components/popUp.js';
function App() {
  return (
    <div className="App">
 
      <header className="App-header">
        <PopUp></PopUp>
      </header>
    </div>
  );
}

export default App;
