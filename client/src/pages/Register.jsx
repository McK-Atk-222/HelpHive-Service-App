import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../api/mutations';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@apollo/client';
import { ME } from '../api/queries';
import auth from '../utils/auth';
import { Link } from 'react-router-dom';

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
    borderRadius: '5px',
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
    transition: 'background-color 0.2s, transform 0.1s'
  };
  const containerStyle = {
    textAlign: 'right'
  };

  const h1Style = {
    color: '#ffffff',
    padding: '10px',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6), 0 0 20px rgba(240, 204, 0, 0.7)',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    letterSpacing: '1px'
  };

const Register = () => {
    // const { authData } = useAuth() || {};
    //     const user = authData?.user;
    
    //     const { data } = useQuery(ME)
    
    //     // Incase user doesn't load, don't render anything..
    //     if (!data) return <p>Loading data...</p>;
    if (!auth.loggedIn()){
                window.location.href = "/login"
            } else if (auth.getProfile().data.role !== "Admin"){
                return <>
                <div className="unauthorized">
                            <h1>Access Denied</h1>
                            <p>You do not have permission to view this page</p>
                
                            <Link to="/dashboard">Go back to Dashboard</Link>
                        </div>
                </>
            }

    // Track form input values
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'Employee'});

    // Get login function from AuthContext
    // const { login } = useAuth();

    // Set up GraphQL mutation
    const [register, { error }] = useMutation(REGISTER_USER);

    const [isSubmitted, setIsSubmitted] = useState(false);
    // Handle form input changes
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await register({
                variables: { ...formData },
            });
           
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
              }, 0);
              setFormData({ username: '', email: '', password: '', role: 'Employee'})
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    return ( 
        <div>
            <div style={containerStyle}>
            <a href="/admin">
            <button style={backButtonStyle}>Back to Admin Panel</button>
            </a>
            </div>
            <h2 style={h1Style}>Register</h2>
            <form style={formStyle} onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    style={inputStyle}
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                </div>
                <div style={formGroupStyle}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    style={inputStyle}
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                </div>
                <div style={formGroupStyle}>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    style={inputStyle}
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                </div>
                <div style={formGroupStyle}>
                <select name="role" value={formData.role} style={inputStyle} onChange={handleChange}>
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
                </div>
                <button type="submit" style={buttonStyle}>Register</button>
            </form>
            {error && <p>Registration failed! Try again...</p>}
            {isSubmitted && alert(`New User Registered`)}
        </div>
    );
};

export default Register;