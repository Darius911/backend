const express = require('express');
const { getAllBooks, getBookById, createBook,updateBook, deleteBook,getFilteredBooks } = require('../controlers/bookControler');
const { protect, allowAccessTo } = require('../controlers/authControler');
const paginationValidator = require('../validators/pagination');



const router = express.Router();

router.route('/')
.get(paginationValidator,getAllBooks)
.post(createBook);
router.route('/filter').get(getFilteredBooks);

router.route('/:id')
.get(getBookById)

.patch(protect,allowAccessTo('admin'),updateBook)
.delete(protect,allowAccessTo('admin'),deleteBook);



module.exports = router;