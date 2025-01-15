const express = require("express");
const userRouter = require("./routers/userRouter");
const {addRequestedDate } = require("./middlewares/appMiddlewares");

// create server
const app = express();

app.use(express.json());
app.use(addRequestedDate);


app.use("/api/v1/users", userRouter);

module.exports = app;