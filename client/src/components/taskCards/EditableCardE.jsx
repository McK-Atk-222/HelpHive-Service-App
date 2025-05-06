import { useState } from "react"
import TaskCard from "../TaskCard"
import { useMutation } from "@apollo/client"
import { UPDATE_NOTE } from "../../api/mutations"

const EditableCardE = ({data}) => {
    const completionText = data.completed?"Completed":"Incomplete"

    const timeStamp = new Date(data.createdAt)
    const options = {month: "long", year: "numeric", day: "2-digit"}
    const formattedTimeStamp = timeStamp.toDateString("en-US", options)

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
        backgroundColor: "#fff", // White background
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

    return (
        <div style={cardStyle}>
            {/* Left Column */}
            <div style={leftColumnStyle}>
                <p>Assigned Employee:
                    <div>
                        {data.user}
                    </div>
                </p>
                <p>
                    {data.customerName}
                </p>
                <p>
                    {data.customerContact}
                </p>

                <textarea rows={5} value={cardText} onChange={handleChange} />
            </div>

            {/* Right Column */}
            <div style={rightColumnStyle}>
                <h1>{data.title}</h1>

                    <textarea rows={5} value={cardInfo} onChange={handleChange}/>

                <p>
                    {completionText}
                </p>
                <p>
                    {formattedTimeStamp}
                </p>
                <button onClick={handleUpdateTask}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditableCardE