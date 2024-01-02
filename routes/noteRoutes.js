import express from "express";
import { getAllNotes, getNote, createNote, updateNote, deleteNote } from "../controller/noteController.js";
import { validateCreateNote, validateUpdateNote } from "../middleware/validateMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', getAllNotes)
        .get('/:id', getNote)
        .post('/', verifyToken, validateCreateNote, createNote)
        .put('/:id', verifyToken, validateUpdateNote, updateNote)
        .delete('/:id', verifyToken, deleteNote);

export default router;