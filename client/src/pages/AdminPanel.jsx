import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS } from '../api/queries';
import { DELETE_USER, UPDATE_USER } from '../api/mutations';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
    const { authData } = useAuth();
    const user = AuthData?.user;

    const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);
    const [deleteUser] = userMutation(DELETE_USER);
    const [updateUser] = userMutation(UPDATE_USER);

    const [editingId, setEditingId] = userState(null);
    const [form, setForm] = setState({ username: '', email: '', role: ''});

    if (!user) return <p>Loading...</p>
    if (loading) return <p>Loading users...</p>
    if (error) return <p>Error loading users.</p>

    const handleDelete = async (_id) => {
        await deleteUser({ variables: { _id } });
        refetch();
    };

    const startEdit = async () => {
        setEditingId(user._id);
        setForm({ username: user.username, email: user.email, role: user.role });
    };

    const handleUpdate = async () => {
        await updateUser({ variables: { _id: editingId, ...form } });
        setEditingId(null);
        refetch();
    };

    return (
        <div className="AdminPanel">
            <h1>Admin Controls</h1>
            <p>Welcome, {user.username || 'Admin'}! Here you can manage all users.</p>

            <section>
                <h2>All Users</h2>
                <ul>
                    {data.getAllUsers.map((u) => (
                        <li key={u._id} className="user-card">
                            {editingId === u._id ? (
                                <div>
                                    <input
                                        value={form.username}
                                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                                        placeholder="Username"
                                    />
                                    <input
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placehodler="Email"
                                    />
                                    <select
                                        value={form.role}
                                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    >
                                        <option value="Employee">Employee</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                    <button onClick={handleUpdate}>Save</button>
                                </div>
                            ) : (
                                <div>
                                    <strong>{u.username}</strong> ({u.email}) - <em>{u.role}</em>
                                    <button onClick={() => startEdit(u)}>Edit</button>
                                    <button onClick={() => handleDelete(u._id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminPanel;