import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLES, hasRole } from '../config/roles';

const RoleRoute = ({ children, allowedRules }) => {
    const { user } = useAuth();     // Gets current user from AuthContext

    // If there is no user or user's role isn't allowed, redirect to unauthoried page
    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthoried" replace />;
    }

    // If user role is allowed, return.
    return children;
};

export default RoleRoute;