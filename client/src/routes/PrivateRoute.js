import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PrivateRoute component that wraps around other components and ensures the user is logged in
const PrivateRoute = ({ children }) => {
    const { token } = useAuth(); 

    // If token is missing, user isn't authenticated. It will redirect them to login page
    if (!token) {
        return <Navigate to="/login" replace />
    }

    // If token exists, allow access to the requested page
    return children;
};

export default PrivateRoute;