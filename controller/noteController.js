import Note from "../model/noteModel.js";

const checkNote = (note, res) => {
    if (note === null) {
        res.status(400)
        throw new Error('No note with the given id exists')
    }
}

// @desc    Get all notes
// @route   GET /note
// @access  Public
export const getAllNotes = async (req, res) => {
    try {
        const allNotes = await Note.find();
        res.status(200).json({
            done: true,
            notes: allNotes,
        });
    } catch (error) {
        res.json({ done: false, errors: [error.message] });
    }
}

// @desc    Get a note
// @route   POST /note/:id
// @access  Public
export const getNote = async (req, res) => {
    try {
        const note = await Note.findById(
            {_id: req.params.id}
        );
        
        // if note is not found
        checkNote(note, res)

        res.status(200).json({
            done: true,
            note: note,
        });
    } catch (error) {
        res.json({ done: false, errors: [error.message] });
    }
}

// @desc    Create the note
// @route   POST /note
// @access  Private
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        const newNote = new Note({
            title,
            content
        })

        await newNote.save();

        res.status(200).json({
            done: true,
            note: newNote
        });
    } catch (error) {
        res.json({ done: false, errors: [error.message] });
    }
}

// @desc    Update the note
// @route   PUT /note/:id
// @access  Private
export const updateNote = async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true}
        )

        checkNote(updatedNote, res)

        res.status(200).json({
            done: true,
            note: updatedNote
        });
    } catch (error) {
        res.json({ done: false, errors: [error.message] });
    }
}

// @desc    Delete the note
// @route   DELETE /note/:id
// @access  Private
export const deleteNote = async (req, res) => {
    try {
        const id = req.params.id;
        await Note.findByIdAndDelete(
            { _id: id }
        )

        res.status(200).json({
            done: true
        });
    } catch (error) {
        res.json({ done: false, errors: [error.message] });
    }
}