import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../config/roles';
import TaskCard from '../components/TaskCard';
import { useQuery } from '@apollo/client';
import { ME } from '../api/queries';

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
    textAlign: 'right',
    padding: '10px'
  };

const Dashboard = () => {
    // Function to get the current user from auth context
    const { authData } = useAuth() || {};
    const user = authData?.user;

    const { data } = useQuery(ME)

    // Incase user doesn't load, don't render anything..
    if (!data) return <p>Loading data...</p>;

    if (data.me.role === "Admin") {
        return (
        <div>
            <div style={buttonContainerStyle}>
                <button style={adminButtonStyle}>Logout</button>
            </div>
            <div style={buttonContainerStyle}>
                <button style={adminButtonStyle}>Admin Panel</button>
            </div>
            <div classname="dashboard">
                <h1>Welcome, {data.me.username || 'User'}!</h1>
                <p>Your Role: <strong>{data.me.role}</strong></p>
                
                <TaskCard userRole={data.me.role}/>
            
            </div>
        </div>)
    } else {
    

    return (
        <div classname="dashboard">
            <div style={buttonContainerStyle}>
                <button style={adminButtonStyle}>Logout</button>
            </div>
            <h1>Welcome, {data.me.username || 'User'}!</h1>
            <p>Your Role: <strong>{data.me.role}</strong></p>
            
            <TaskCard userRole={data.me.role}/>
            
        </div>
    );
    }
};

export default Dashboard;