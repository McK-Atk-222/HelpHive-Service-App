import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../config/roles';
import {useQuery } from '@apollo/client';
import { GET_ALL_NOTES } from '../api/queries';

const Dashboard = () => {
    // Function to get the current user from auth context
    const { authData } = useAuth();
    const user = authData?.user;

    const { loading, error, data } = useQuery(GET_ALL_NOTES);

    // Incase user doesn't load, don't render anything..
    if (!user) return <p>Loading user data...</p>;
    
    return (
        <div classname="dashboard">
            <h1>Welcome, {user.username || 'User'}!</h1>
            <p>Your Role: <strong>{user.role}</strong></p>

            {/* Admin Panel Button */}
            {user.role === ROLES.Admin && (
                <button onClick={() => Navigate('/admin')} className="admin-btn">
                        Go to Admin Panel
                </button>
            )}

            {/* All logged in Users will have the same view of Dashboard */}
            <section>
                <h2>Help Hive Board</h2>
                <ul>
                    {data.getAllNotes.map((note) => (
                        <li key={note.id} className="note-card">
                            <h4>{note.title || 'Untitled Task'}</h4>
                            <p>{note.text}</p>
                            <p>From: {note.customerName || 'Annonymous'} ({note.customerContact || 'N/A'})</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;