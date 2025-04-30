import { useState } from 'react';
import { useMutation } from '@apollo/cleint';
import { REGISTER_USER } from '../api/mutations';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    // Track form input values
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'EMPLOYEE'});

    // Get login function from AuthContext
    const { login } = useAuth();

    // Set up GraphQL mutation
    const [register, { error }] = useMutation(REGISTER_USER);

    // Handle form input changes
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const { data } = await register({
                variables: { ...formData },
            });
            login(data.register.token);   // Saves token in localStorage
        } catch (err) {
            console.error(err);
        }
    };

    return ( 
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="EMPLOYEE">Employee</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
            {error && <p>Registration failed! Try again...</p>}
        </div>
    );
};

export default Register;