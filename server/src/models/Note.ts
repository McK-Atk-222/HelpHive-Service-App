import { Schema, model, type Document } from 'mongoose';


export interface NoteDocument extends Document {
  id: string;
  customerName: string;
  customerContact: string;
  user: Schema.Types.ObjectId;
  title: string;
  text: string;
  completed: boolean;
  createdAt: String;
  updatedAt: String;
}


const noteSchema = new Schema<NoteDocument>(
  {
    customerName: {
        type: String,
        default: 'N/A'
    },
    customerContact: {
        type: String,
        default: 'N/A'
    },
    user: {
        type: String,
        default: 'No User Assigned'
    },
    title: {
        type: String,
        default: 'Manager Review Needed'
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String,
    }

},
{
    timestamps: true
}
)


const Note = model<NoteDocument>('Note', noteSchema);

export default Note;