import { useState } from "react"
import TaskCard from "../TaskCard"
import { useMutation } from "@apollo/client"
import { UPDATE_NOTE } from "../../api/mutations"

const EditableCardE = ({data}) => {

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

    const [cardInfo, setCardInfo] = useState(
        data.text
    )

    const handleChange = (e) => {
        const{value} = e.target
        setCardInfo(existingData => (value))
    }
    const [updateNote, {error}] = useMutation(UPDATE_NOTE);
    const handleUpdateTask = async () => {
        try { await updateNote({
            variables:{
            _id: data._id,
            text: cardInfo
            }
        })
        alert(`Task Updated`);
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
        color: "white", // White text
    };

    return (
        <div style={cardStyle()}>
            {/* Left Column */}
            <div style={leftColumnStyle}>
                <p>Assigned Employee:</p>
                    <div>
                   {data.user}
                    </div>
                <p>Customer Info:</p>
                <p>
                {data.customerName}
                </p>
                <p>
                {data.customerContact}
                </p>
                <p>Case Notes:</p>
                <textarea rows={5} value={cardInfo} onChange={handleChange} />
            </div>

            {/* Right Column */}
            <div style={rightColumnStyle}>
                <h2>{data.title}</h2>

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
            </div>
        </div>
    )
}

export default EditableCardE