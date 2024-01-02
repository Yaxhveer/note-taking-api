import express from "express";
import { validateCreateUser } from "../middleware/validateMiddleware.js";
import { loginUser, registerUser, logoutUser } from "../controller/userController.js";

const router = express.Router();

router.post('/register', validateCreateUser, registerUser)
    .post('/login', loginUser)
    .post('/logout', logoutUser)

export default router;