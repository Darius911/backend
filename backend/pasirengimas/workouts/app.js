const express = require("express");
const userRouter = require("./routers/userRouter");




// create server
const app = express();


// Middleware - parsed data to req.body.
app.use(express.json());

app.use("/api/v1/users", userRouter)

module.exports = app;








