const express = require("express");
const bookController = require("../controllers/bookController");

const {getAllBooks, getFilteredBooks} = bookController ;
const bookRouter = express.Router();

bookRouter.route("/").get(getAllBooks);
bookRouter.route("/filter").get(getFilteredBooks);

module.exports = bookRouter;