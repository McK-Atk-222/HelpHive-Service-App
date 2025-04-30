import { Schema, model, type Document } from 'mongoose';

export interface NoteDocument extends Document {
  id: string;
  customerName: string;
  customerContact: string;
  user: string;
  title: string;
  text: string;
  completed: boolean;
}

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    }
},
{
    timestamps: true
}
)

noteSchema.plugin(AutoIncrement, {
inc_field: 'ticket',
id: 'ticketNums',
start_seq: 500
})


const Note = model<NoteDocument>('Note', noteSchema);

export default Note;