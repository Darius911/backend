const express = require("express");



const exchangeRouter = require("./routers/exchangeRoute");

const app = express();

app.use(express.json());



app.use("/api/v1/", exchangeRouter);
//exportuojam app
module.exports = app;