import app from "./app.js";

const PORT = process.env.PORT || 8080;

// starting the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})