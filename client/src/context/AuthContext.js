import { createContext, useContext, useState } from 'react';

// Context object to store authentication info
const AuthContext = createContext(null);

// Provider component ot wrap around the app and share auth data. 
export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? { token } : null;
    });

    // Function to log in a user and store their token
    const login = (token) => {
        localStorage.setItem('token', token);   // Save token in browser's local storage
        setAuthData({ token });                 // Update React state with new token
    };

    // Function to log out a user and clear their token
    const logout = () => {
        localStorage.removeItem('token');   // Remove token from local storage
        setAuthData(null);                  // Clear React state
    };

    // Provide authDate, login, and logout functions to all children components
    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);