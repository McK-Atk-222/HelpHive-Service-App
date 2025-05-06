import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../config/roles';
import TaskCard from '../components/TaskCard';
import { useQuery } from '@apollo/client';
import { ME } from '../api/queries';
import auth from '../utils/auth';

const adminButtonStyle = {
    backgroundColor: 'white',
    color: '#333',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.2s, transform 0.1s'
  };
  const buttonContainerStyle = {
    display: 'flex', // Use flexbox to align buttons side by side
    justifyContent: 'flex-end', // Align buttons to the right
    gap: '10px', // Add spacing between buttons
    padding: '10px'
};
const welcome = {
    color: '#ffffff',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6), 0 0 20px rgba(240, 204, 0, 0.7)',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    letterSpacing: '1px'
  };

const Dashboard = () => {
    // Function to get the current user from auth context
    const { authData } = useAuth() || {};
    const user = authData?.user;
    
    if (!auth.loggedIn()){
        window.location.href = "/login"
    }

    const { data, loading } = useQuery(ME)

    const userData = data?.me || {}
    // Incase user doesn't load, don't render anything..
    if (loading) return <p>Loading data...🐝</p>;

    if (userData.role === "Admin") {
        return (
        <div>
            <div style={buttonContainerStyle}>
                    <button style={adminButtonStyle} onClick={() => { auth.logout() }}>Logout 🔐</button>
                    <a href="/admin">
                        <button style={adminButtonStyle}>Admin Controls 🔧</button>
                    </a>
            </div>
            <div classname="dashboard">
                <h1 style={welcome}>Welcome, {userData.username || 'User'}! 🍯</h1>
                <p>Your Role: <strong>{userData.role}</strong></p>
                
                <TaskCard userRole={userData.role}/>
            
            </div>
        </div>)
    } else {
    

    return (
        <div classname="dashboard">
            <div style={buttonContainerStyle}>
                <button style={adminButtonStyle} onClick={() => {auth.logout()}}>Logout 🔐</button>
            </div>
            <h1 style={welcome}>Welcome, {userData.username || 'User'}! 🍯</h1>
            <p>Your Role: <strong>{userData.role}</strong></p>
            
            <TaskCard userRole={userData.role}/>
            
        </div>
    );
    }
};

export default Dashboard;