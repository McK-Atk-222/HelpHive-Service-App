import { useState } from "react"
import TaskCard from "../TaskCard"
import { useMutation } from "@apollo/client"
import { UPDATE_NOTE } from "../../api/mutations"

const EditableCardE = ({data}) => {
    console.log(data)
    const completionText = data.completed?"Completed":"Incomplete"

    const timeStamp = new Date(data.createdAt)
    const options = {month: "long", year: "numeric", day: "2-digit"}
    const formattedTimeStamp = timeStamp.toDateString("en-US", options)

    const [cardText, setCardText ] = useState(data.text)

    const handleChange = (e) => {
        setCardText(e.target.value)
    }
    const [updateNote, {error}] = useMutation(UPDATE_NOTE);
    const handleUpdateTask = async () => {
        try { await updateNote({
            variables:{
            text
            }
        })
        } catch (error) {
        console.log(error)
        }
    }

        return (
            <div>
                <h1>{data.title}</h1>
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
                    <textarea rows={5} value={cardText} onChange={handleChange}/>
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
        )
}

export default EditableCardE