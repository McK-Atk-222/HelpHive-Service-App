import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../api/queries';
import { DELETE_USER, UPDATE_USER } from '../api/mutations';
import EditableCard from './userCards/EditableCard';

const userCard = ({userRole}) => {
const {loading, data} = useQuery(GET_ALL_USERS)

if (loading) {
    return (<h1>loading users...</h1>)
}

const userData = data.getAllUsers || {}

    
return (
    <div className="user-card-container">
        {userData.map((user) => (
            userRole==="Admin" && <EditableCard data={user}/> 
        ))}
    </div>
    );
};

export default userCard;