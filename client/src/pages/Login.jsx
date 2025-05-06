import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../api/mutations';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

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
  const buttonContainerStyle = {
    textAlign: 'right',
    padding: '10px'
  };

  const h2Style = {
    color: '#ffffff',
    padding: '10px',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6), 0 0 20px rgba(240, 204, 0, 0.7)',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    letterSpacing: '1px'
  };

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth() || {};
    const navigate = useNavigate();

    const [loginUser, { error }] = useMutation(LOGIN_USER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser({
                variables: { ...formData },
            });
            // login(data.login.token);
            // localStorage.setItem("id_token", data.login.token)
            // window.location.href = "/dashboard"
            auth.login(data.login.token)
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div style={buttonContainerStyle}>
            <a href="/">
            <button style={backButtonStyle}>Back</button>
            </a>
            </div>
            <h2 style={h2Style}>Login 🔐</h2>
            <form style={formStyle}onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                <input 
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    style={inputStyle}
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
                <button style={buttonStyle} type="submit">Login</button>
            </form>
            {error && <p>Login failed! Try again...</p>}
        </div>
    );
};

export default Login;