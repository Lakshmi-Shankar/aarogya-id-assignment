const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const fileRoute = require("./routes/fileRoute");

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use("/api", fileRoute);

const URI = process.env.URI;
const PORT = process.env.PORT;

mongoose.connect(URI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    console.log("Database is running");
})
.catch((err) => {
    console.log("Failed to start database");
    console.error(err.message);
})