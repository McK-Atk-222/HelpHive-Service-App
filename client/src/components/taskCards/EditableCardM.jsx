import { useState } from "react"
import TaskCard from "../TaskCard"
import { useMutation } from "@apollo/client"
import { DELETE_NOTE, UPDATE_NOTE } from "../../api/mutations"

const EditableCardM = ({data}) => {

    const completionText = data.completed?"Completed":"Incomplete"

    const timeStamp = new Date(data.createdAt)
    const options = {month: "long", year: "numeric", day: "2-digit"}
    const formattedTimeStamp = timeStamp.toLocaleDateString("en-US",options)

    const [cardInfo, setCardInfo] = useState({
        text: data.text,
        title: data.title,
        customerName: data.customerName,
        customerContact: data.customerContact,
        user: data.user
    })

    // //these below isn't correct...
    // const [cardCompleted, setCardCompleted] = useState()
    
    const handleChange = (e) => {
        const{name,value} = e.target
        setCardInfo(existingData => ({...existingData, [name]:value}))
    }

    const [updateNote, {updateError}] = useMutation(UPDATE_NOTE);

    const handleUpdateTask = async () => {
        try { await updateNote({
            variables:{
            _id: data._id,  
            ...cardInfo
            }
        })
        } catch (updateError) {
        console.log(updateError)
        }
    }

    const [deleteNote, {error}] = useMutation(DELETE_NOTE);

    const handleDeleteTask = async () => {
        try { await deleteNote({
            variables:{
            _id: data._id,  
            }
        })
        } catch (error) {
        console.log(error)
        }
    }

        return (
            <div>
                <h1>
                    <div>
                        <textarea rows={2} value={cardInfo.title} name="title" onChange={handleChange}/>
                    </div>
                </h1>
                <p>Assigned Employee: 
                    <div>
                        <textarea rows={1} value={cardInfo.user} name="user" onChange={handleChange}/>
                    </div>
                </p>
                <p>
                    <textarea rows={1} value={cardInfo.customerName} name="customerName" onChange={handleChange}/>
                </p>
                <p>
                    <textarea rows={1} value={cardInfo.customerContact} name="customerContact" onChange={handleChange}/>
                </p>
                    <textarea rows={5} value={cardInfo.text} name="text" onChange={handleChange}/>
                <p>
                    {completionText}
                </p>
                <p>
                    {formattedTimeStamp}
                </p>
                <button onClick={handleUpdateTask}>
                    Save
                </button>
                <button onClick={handleDeleteTask}>
                    Delete Task (Completed or Voided)
                </button>
            </div>
        )
}

export default EditableCardM