const express = require("express");
const {addRequestedDate} = require("./middlewares/appMiddlewares");


const userRouter = require("./routers/userRouters");

const app = express();

app.use(express.json());

app.use(addRequestedDate);

app.use("/api/v1/users", userRouter);
//exportuojam app
module.exports = app;