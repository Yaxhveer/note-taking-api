import express from  "express";
import dotenv from "dotenv";
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import NoteRouter from "./routes/noteRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

// configuring .env file
dotenv.config();

// connecting to the database
connectDB();


const app = express();


// middlewares
app.use(helmet());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

// routing
app.use("/note", NoteRouter);
app.use("/user", UserRouter);

export default app;