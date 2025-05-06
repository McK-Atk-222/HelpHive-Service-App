import { useState } from "react"
import TaskCard from "../TaskCard"
import { useMutation } from "@apollo/client"
import { DELETE_NOTE, UPDATE_NOTE } from "../../api/mutations"

const EditableCardM = ({data}) => {

    const inputStyle = {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      };

    const completionText = data.completed?"Status: ✅Completed":"Status: 🟥Incomplete"

    const startTimeStamp = new Date(data.createdAt)
    const formattedStartTimeStamp = startTimeStamp.toLocaleString("en-US", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

    const updateTimeStamp = new Date(data.updatedAt)
    const formattedUpdateTimeStamp = updateTimeStamp.toLocaleString("en-US", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

    const [cardInfo, setCardInfo] = useState({
        text: data.text,
        title: data.title,
        customerName: data.customerName,
        customerContact: data.customerContact,
        user: data.user,
        completed: data.completed,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    })

    // //these below isn't correct...
    // const [cardCompleted, setCardCompleted] = useState()
    
    const handleChange = (e) => {
        const{name,value} = e.target

        // for updating status, edge case. updates can only be strings but boolean is needed
        let complete
        if (name==="completed") {
            complete = (value==="true")
            return setCardInfo(existingData => ({...existingData, [name]:complete}))
        } 

        setCardInfo(existingData => ({...existingData, [name]:value}))
    }

    const [updateNote, {updateError}] = useMutation(UPDATE_NOTE);

    const handleUpdateTask = async () => {
        try { await updateNote({
            variables:{
            _id: data._id,  
            ...cardInfo
            }
        }); 
        alert(`Task Updated`);
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

    const cardStyle = () => { 
        let cardStyle;
    
        if (data.title === "Manager Review Needed") {
            cardStyle = {
                border: "4px solid #FF0000", // Red border
                borderRadius: "8px", // Rounded corners
                padding: "16px", // Space inside the box
                margin: "16px", // Space between cards
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
                backgroundColor: "#fff8e1", // Light yellow background
                display: "flex", // Flexbox layout for two columns
                flexDirection: "row", // Arrange children in a row
                gap: "16px", // Gap between left and right sections
            };
        } else {
            cardStyle = {
                border: "1px solid #ccc", // Light gray border
                borderRadius: "8px", // Rounded corners
                padding: "16px", // Space inside the box
                margin: "16px", // Space between cards
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
                backgroundColor: "#fff8e1", // Light yellow background
                display: "flex", // Flexbox layout for two columns
                flexDirection: "row", // Arrange children in a row
                gap: "16px", // Gap between left and right sections
            };
        }
    
        return (
            cardStyle
        );
    };

    // const cardStyle = {
    //     border: "1px solid #ccc", // Light gray border
    //     borderRadius: "8px", // Rounded corners
    //     padding: "16px", // Space inside the box
    //     margin: "16px", // Space between cards
    //     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
    //     backgroundColor: "#fff8e1", // White background
    //     display: "flex", // Flexbox layout for two columns
    //     flexDirection: "row", // Arrange children in a row
    //     gap: "16px", // Gap between left and right sections
    // }

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
        color: "black", // black text
        fontWeight: "bold"
    };
    
    const deleteButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#ffd600", // yellow background for Delete
        color: "black", // black text
        fontWeight: "bold"
    };

    const title = {
        fontSize: "18px", // Increase font size for readability
        fontWeight: 'bold',
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    }


    return (
        <div style={cardStyle()}>
            {/* Left Column */}
            <div style={leftColumnStyle}>
                <div>
                <p>Assigned Employee:</p>
                <pre><textarea rows={1} style={inputStyle} value={cardInfo.user} name="user" onChange={handleChange} /></pre>
                </div>
                <p>Customer Info:</p>
                <p>
                <pre><textarea rows={1} style={inputStyle} value={cardInfo.customerName} name="customerName" onChange={handleChange} /></pre>
                </p>

                <p>
                <pre><textarea rows={1} style={inputStyle} value={cardInfo.customerContact} name="customerContact" onChange={handleChange}/></pre>
                </p>
                <p>Case Notes:</p>
                <textarea rows={5} style={inputStyle} value={cardInfo.text} name="text" onChange={handleChange} />
            </div>

            {/* Right Column */}
            <div style={rightColumnStyle}>
                <p>Task Title:</p>
                <h1>
                    <textarea rows={2} style={title} value={cardInfo.title} name="title" onChange={handleChange} />
                </h1>
                <p>Status:</p>
                <select
                        name="completed"
                        style={inputStyle}
                        value={cardInfo.completed}
                        onChange={handleChange}
                    >
                    <option value='true'>✅Completed</option>
                    <option value='false'>🟥Incomplete</option>
                    </select>
                {/* <p>
                    {completionText}
                </p> */}
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
                    Remove Task (Completed or Voided)
                </button>
            </div>
        </div>
    )
}

export default EditableCardM