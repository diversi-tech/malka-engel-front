
import React, { createContext, useReducer, useContext } from 'react';

// יצירת Context
const AuthContext = createContext();

// פונקציית ה-Reducer לניהול המצב
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

// AuthProvider - רכיב ה-Provider שישמור על מצב האוטנטיקציה והטוקן
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    token: null,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// פונקציה לשימוש ב-AuthContext ברכיבים
export const useAuth = () => useContext(AuthContext);
