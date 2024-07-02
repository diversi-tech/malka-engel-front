import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);


  const handleLogin = async () => {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      if (rememberMe) {
        Cookies.set('token', data.token, { expires: 7 }); // שמירת טוקן ל-7 ימים
      } else {
        Cookies.set('token', data.token); // שמירת טוקן בלי תפוגה
      }
      setIsAuthenticated(true);
    } else {
      setError('התחברות נכשלה');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('כתובת המייל אינה תקינה');
      return;
    }

    if (password.length < 6) {
      setError('הסיסמה חייבת להיות לפחות 6 תווים');
      return;
    }

    setError('');
    handleLogin();
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <h1>ברוך הבא!</h1>
          <button onClick={handleLogout}>התנתק</button>
        </div>
      ) : (
        <div>
          <h1>טופס התחברות</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                אימייל:
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="הכנס אימייל"
                />
              </label>
            </div>
            <div>
              <label>
                סיסמה:
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="הכנס סיסמה"
                />
              </label>
            </div>
            <div>
              <label>
                זכור אותי:
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              </label>
            </div>
            <button type="submit">התחבר</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
