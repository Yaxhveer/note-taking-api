import express from "express";
import { getAllNotes, getNote, createNote, updateNote, deleteNote } from "../controller/noteController.js";
import { validateCreateNote, validateUpdateNote } from "../middleware/validator.js";

const router = express.Router();

router.get('/', getAllNotes)
        .get('/:id', getNote)
        .post('/', validateCreateNote, createNote)
        .put('/:id', validateUpdateNote, updateNote)
        .delete('/:id', deleteNote);

export default router;