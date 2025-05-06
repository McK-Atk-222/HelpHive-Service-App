import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_NOTES } from '../api/queries';
import { DELETE_NOTE, UPDATE_NOTE } from '../api/mutations';
import EditableCardE from './taskCards/EditableCardE';
import EditableCardM from './taskCards/EditableCardM';

const TaskCard = ({userRole}) => {
const {loading, data} = useQuery(GET_ALL_NOTES)

   if (loading) {
    return (<h1>loading tasks...</h1>)
   }
   
   const noteData = data.getAllNotes

   const managerRole = () => {
    if (userRole==="Manager" || userRole==="Admin") return true
   return false
    }

    return (
        <>
            {noteData.map((note) => {
                return (
                    <>
                    {
                        userRole==="Employee" && <EditableCardE data={note}/> 
                    }
                    {
                        managerRole() && <EditableCardM data={note}/> 
                    }
                    </>
                )
            })}
        </>
    )
};

export default TaskCard;