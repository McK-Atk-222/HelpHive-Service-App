import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../config/roles';
import UserCard from '../components/UserCard';
import { useQuery } from '@apollo/client';
import { ME } from '../api/queries';
import auth from '../utils/auth';
import { Link } from 'react-router-dom';
import Unauthorized from './Unauthorized';

const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)'
  };
  
  const formGroupStyle = {
    marginBottom: '20px'
  };
  
  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  };
  
  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '150px'
  };
  
  const submitContainerStyle = {
    textAlign: 'right'
  };
  
  const buttonStyle = {
    backgroundColor: '#f0cc00',
    color: '#333',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.2s, transform 0.1s'
  };

  const backButtonStyle = {
    backgroundColor: 'white',
    color: '#333',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.2s, transform 0.1s',
    textAlign: 'right'
  };
  const containerStyle = {
    textAlign: 'right',
    padding: '10px'
  };

  const h1Style = {
    color: '#ffffff',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6), 0 0 20px rgba(240, 204, 0, 0.7)',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    letterSpacing: '1px'
  };
  const h2Style = {
    color: '#ffffff',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6), 0 0 20px rgba(240, 204, 0, 0.7)',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    padding: '10px'
  };

const AdminPanel = (userRole) => {
    const { authData } = useAuth() || {};
    const user = authData?.user;

    if (!auth.loggedIn()){
            window.location.href = "/login"
        } else if (auth.getProfile().data.role !== "Admin"){
            return Unauthorized()
        }

    console.log(auth.getProfile())

    const { data } = useQuery(ME)

    // if (data.me.role !== "Admin") {
    //     return <>You are not Authorized to view this page, please return to Dashboard. Thank you.</>
    // } else {
    
        // Incase user doesn't load, don't render anything..
        if (!data) return <p>Loading data...</p>; 


    return (
        <div className="AdminPanel">
            <div style={containerStyle}>
                <a href="/dashboard">
              <button style={backButtonStyle}>Back to Dashboard</button>
              </a>
                <a href="/admin/register" style={{marginLeft: '10px' }}>
              <button style={backButtonStyle}>Register New User</button>
                  </a>
              </div>
            <div style={{padding: "30px 0px 30px 0px"}}>
              <h1 style={h1Style}>🔧 Admin Controls</h1>
              <p style={{padding: "0px 0px 0px 80px"}}>Welcome, {data.me.username || 'Admin'}! Here you can manage all users.</p>
            </div>
              <section style={{ width: '100%' }}>
                  <h2 style={h2Style}>User Management:</h2>
                  <UserCard userRole={data.me.role}/>
              </section>
          </div>
      );
    // }
};

export default AdminPanel;