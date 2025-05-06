import { useState } from "react"
import TaskCard from "../TaskCard"
import { useMutation } from "@apollo/client"
import { DELETE_NOTE, UPDATE_NOTE } from "../../api/mutations"

const EditableCardM = ({data}) => {

    const completionText = data.completed?"Status: ✅Completed":"Status: 🟥Incomplete"

    const timeStamp = new Date(data.createdAt)
    const options = {month: "long", year: "numeric", day: "2-digit"}
    const formattedStartTimeStamp = timeStamp.toLocaleDateString("en-US",options)

    const updateTimeStamp = new Date(data.updatedAt)
    const options2 = {month: "long", year: "numeric", day: "2-digit"}
    const formattedUpdateTimeStamp = updateTimeStamp.toDateString("en-US", options2)

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
        }); 
        location.reload()
        } catch (error) {
        console.log(error)
        }
    }

    const cardStyle = {
        border: "1px solid #ccc", // Light gray border
        borderRadius: "8px", // Rounded corners
        padding: "16px", // Space inside the box
        margin: "16px", // Space between cards
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
        backgroundColor: "#fff8e1", // White background
        display: "flex", // Flexbox layout for two columns
        flexDirection: "row", // Arrange children in a row
        gap: "16px", // Gap between left and right sections
    }

    const leftColumnStyle = {
        flex: "1", // Take up equal space
        display: "flex",
        flexDirection: "column", // Stack elements vertically
        gap: "8px", // Gap between elements
    }

    const rightColumnStyle = {
        flex: "1", // Take up equal space
        display: "flex",
        flexDirection: "column", // Stack elements vertically
        gap: "8px", // Gap between elements
    }

    const buttonStyle = {
        padding: "10px 20px", // Add padding for a better click area
        fontSize: "16px", // Increase font size for readability
        borderRadius: "4px", // Rounded corners
        border: "none", // Remove default border
        cursor: "pointer", // Pointer cursor on hover
        transition: "background-color 0.3s, transform 0.2s", // Smooth transitions
    };
    
    const saveButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#4CAF50", // Green background for Save
        color: "white", // White text
    };
    
    const deleteButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#f44336", // Red background for Delete
        color: "white", // White text
    };

    const title = {
        fontSize: "18px", // Increase font size for readability
        fontWeight: 'bold'
    }


    return (
        <div style={cardStyle}>
            {/* Left Column */}
            <div style={leftColumnStyle}>
                <div>
                <p>Assigned Employee:</p>
                <pre><textarea rows={1} value={cardInfo.user} name="user" onChange={handleChange} /></pre>
                    </div>
                <p>Customer Info:</p>
                <p>
                <pre><textarea rows={1} value={cardInfo.customerName} name="customerName" onChange={handleChange} /></pre>
                </p>

                <p>
                <pre><textarea rows={1} value={cardInfo.customerContact} name="customerContact" onChange={handleChange}/></pre>
                </p>
                <p>Case Notes:</p>
                <textarea rows={5} value={cardInfo.text} name="text" onChange={handleChange} />
            </div>

            {/* Right Column */}
            <div style={rightColumnStyle}>
                <p>Task Title:</p>
                <h1>
                    <textarea rows={2} style={title} value={cardInfo.title} name="title" onChange={handleChange} />
                </h1>
                <p>
                    {completionText}
                </p>
                <p>Date Received:</p>
                <p>
                    {formattedStartTimeStamp}
                </p>
                <p>Date Last Updated:</p>
                <p>
                    {formattedUpdateTimeStamp}
                </p>
                <button style={saveButtonStyle} onClick={handleUpdateTask}>
                    Save 💾
                </button>
                <button onClick={handleDeleteTask} style={deleteButtonStyle}>
                    Delete Task (Completed or Voided)
                </button>
            </div>
        </div>
    )
}

export default EditableCardM