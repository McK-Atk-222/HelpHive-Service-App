import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../api/mutations';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const { login } = useAuth();

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
            login(data.login.token);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
            {error && <p>Login failed! Try again...</p>}
        </div>
    );
};

export default Login;