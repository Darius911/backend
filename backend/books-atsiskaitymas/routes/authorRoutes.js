const express = require('express');
const { getAllAuthors, getAuthorById, createAuthor,updateAuthor, deleteAuthor } = require('../controlers/authorControler');
const { protect, allowAccessTo } = require('../controlers/authControler');


const router = express.Router();

router.route('/').get(getAllAuthors).post(createAuthor);
router.route('/:id')
.get(getAuthorById)
.patch(protect,allowAccessTo('admin'),updateAuthor)
.delete(protect,allowAccessTo('admin'),deleteAuthor);



module.exports = router;