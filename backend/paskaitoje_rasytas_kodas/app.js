const express = require("express");
const {sayHello, addRequestedDate} = require("./middlewares/appMiddlewares");
const tourRouter = require("./routers/tourRouters");







const app = express();

app.use(express.json());




app.use(sayHello, addRequestedDate);




app.use("/api/v1/tours", tourRouter);
//exportuojam app
module.exports = app;


