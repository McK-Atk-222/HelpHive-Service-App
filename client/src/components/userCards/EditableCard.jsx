import { useState } from "react"
import userCard from "../UserCard"
import { useMutation } from "@apollo/client"
import { DELETE_USER, UPDATE_USER } from "../../api/mutations"



const EditableCard = ({data}) => {

    const inputStyle = {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      };

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
        }); 
        alert(`User Updated`);
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
                    <select
                        name="role"
                        style={inputStyle}
                        value={cardInfo.role}
                        onChange={handleChange}
                    >
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                    </select>

                    <button className="save-btn" onClick={handleUpdateUser}>
                        Save Changes 💾
                    </button>
                    <button className="remove-btn" onClick={handleDeleteUser}>
                        Remove User
                    </button>
            </div>
        );
    };

    export default EditableCard;