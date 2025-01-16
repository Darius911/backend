const express = require("express");

const bookRouter = require("./routers/bookRouter");

// create server
const app = express();
//body parser
app.use(express.json());



app.use("/api/v1/books", bookRouter);

module.exports = app;
