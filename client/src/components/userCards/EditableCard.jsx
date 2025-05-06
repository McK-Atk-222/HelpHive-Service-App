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
            <div>
                <h1>
                    <div>
                        <textarea rows={1} value={cardInfo.username} name="username" onChange={handleChange}/>
                    </div>
                </h1>
                <p>
                    <textarea rows={1} value={cardInfo.email} name="email" onChange={handleChange}/>
                </p>
                <p>
                    <textarea rows={1} value={cardInfo.role} name="role" onChange={handleChange}/>
                </p>
                <button onClick={handleUpdateUser}>
                    Save
                </button>
                <button onClick={handleDeleteUser}>
                    Remove User
                </button>
            </div>
        )
}

export default EditableCard