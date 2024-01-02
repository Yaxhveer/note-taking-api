import mongoose from 'mongoose'

// create schema for note
const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Text is required'
    },
    content: {
        type: String,
        required: 'Text is required'
    }
})

// set created and updated timestamps
NoteSchema.set('timestamps', true);

export default mongoose.model('Note', NoteSchema)