import express from "express";
import { validateCreateUser } from "../middleware/validateMiddleware.js";
import { loginUser, registerUser, logoutUser } from "../controller/userController.js";

// create router for /user
const router = express.Router();

router.post('/register', validateCreateUser, registerUser)
    .post('/login', validateCreateUser, loginUser)
    .post('/logout', logoutUser)

export default router;