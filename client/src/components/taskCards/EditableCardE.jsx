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
        )
}

export default EditableCardE