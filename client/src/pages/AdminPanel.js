import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../config/roles';

const AdminPanel = () => {
    const { user } = useAuth();

    // 'Loading...' if user isn't ready yet
    if (!user) return <p>Loading...</p>;

    return (
        <div className="AdminPanel">
            <h1>Admin Controls</h1>
            <p>Welcome, {user.username || 'Admin'}! Here you can manage all users.</p>

            <section>
                <h2>User Management</h2>
                <p>add/edit and remove users will go here later</p>
            </section>
        </div>
    );
};

export default AdminPanel;