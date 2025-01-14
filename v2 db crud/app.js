const express = require("express");
const { sayHello, addRequestedDate } = require("./middlewares/appMiddlewares");
const tourRouter = require("./routers/tourRouter");

// create server
const app = express();

app.use(express.json());

app.use(sayHello, addRequestedDate);

app.use("/api/v1/tours", tourRouter);

module.exports = app;
