import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ children, allowedRoles }) => {
    const { authData } = useAuth();     // Gets current user from AuthContext
    const user = authData?.user;

    // If there is no user or user's role isn't allowed, redirect to unauthoried page
    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // If user role is allowed, return.
    return children;
};

export default RoleRoute;