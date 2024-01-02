import mongoose from "mongoose";

mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;

// connecting to the database
export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
};

// When successfully connected
mongoose.connection.on('connected', () => {
    console.log('Connected to the database successfully');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
    console.error(`Error connecting to database: ${err}`);
});
