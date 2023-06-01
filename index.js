const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.router");
const { weatherRouter } = require("./routes/weather.router");

app.get("/", (req, res) => {
    res.send("Basic API endpoint for Weather");
})

app.use("/", userRouter);
app.use("/",weatherRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to MongoDB");
        console.log(`Server is connected to http://localhost:${process.env.port}`);
    } catch (error) {
        console.log(error.message);
        console.log("Connection failed");
    }
})
