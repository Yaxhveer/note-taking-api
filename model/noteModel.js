import mongoose from 'mongoose'

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

NoteSchema.set('timestamps', true);

export default mongoose.model('Note', NoteSchema)