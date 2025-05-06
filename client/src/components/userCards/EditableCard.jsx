import { useState } from "react"
import userCard from "../UserCard"
import { useMutation } from "@apollo/client"
import { DELETE_USER, UPDATE_USER } from "../../api/mutations"

const EditableCard = ({data}) => {


    const [cardInfo, setCardInfo] = useState({
        username: data.username,
        email: data.email,
        role: data.role
    })


    const handleChange = (e) => {
        const{name,value} = e.target
        setCardInfo(existingData => ({...existingData, [name]:value}))
    }
    const [updateUser, {updateError}] = useMutation(UPDATE_USER);
    const handleUpdateUser = async () => {
        try { await updateUser({
            variables:{
            _id: data._id,
            ...cardInfo
            }
        })
        } catch (updateError) {
        console.log(updateError)
        }
    }

    const [deleteUser, {error}] = useMutation(DELETE_USER);
    const handleDeleteUser = async () => {
        try { await deleteUser({
            variables:{
            _id: data._id,  
            }
        }); 
        location.reload()
        } catch (error) {
        console.log(error)
        }
    }


        return (
            <div className="user-card">
                <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={cardInfo.username}
                        onChange={handleChange}
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={cardInfo.email}
                        onChange={handleChange}
                    />
                    <label>Role:</label>
                    <input 
                        type="text"
                        name="role"
                        value={cardInfo.role}
                        onChange={handleChange}
                    />

                    <button className="save-btn" onClick={handleUpdateUser}>
                        Save Changes
                    </button>
                    <button className="remove-btn" onClick={handleUpdateUser}>
                        Remove User
                    </button>
            </div>
        );
    };

    export default EditableCard;