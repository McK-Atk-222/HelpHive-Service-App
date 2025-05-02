import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../config/roles';

const Dashboard = () => {
    // Function to get the current user from auth context
    const { authData } = useAuth();
    const user = authData?.user;

    // Incase user doesn't load, don't render anything..
    if (!user) return <p>Loading user data...</p>;
    

    return (
        <div classname="dashboard">
            <h1>Welcome, {user.username || 'User'}!</h1>
            <p>Your Role: <strong>{user.role}</strong></p>

            {/* Employee Dashboard View */}
            {user.role === ROLES.Employee && (
                <section>
                    <h2>My Tasks</h2>
                    <p>Here you'll see the tasks assigned to you.</p>
                    {/*A map through user's tasks*/}
                </section>
            )}

            {/* Manager Dashboard View */}
            {user.role === ROLES.Manager && (
                <section>
                    <h2>Manager Dashboard</h2>
                    <p>You can assign tasks and monitor progress here.</p>
                </section>
            )}

            {/* Admin Dashboard View */}
            {user.role === ROLES.Admin && (
                <section>
                    <h2>Admin</h2>
                    <p>You have full access to manage users</p>
                </section>
            )}
        </div>
    );
};

export default Dashboard;