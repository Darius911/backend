const { getAllBooks, getBookById, createBook, updateBook, deleteBook, filterBooks } = require('../models/bookModel'); 
const AppError = require('../utilities/appError');

exports.getAllBooks = async (req, res, next) => {
    try {
      let { page, limit } = req.query;
  
      
      page = parseInt(page); 
      limit = parseInt(limit); 
  
      
      const offset = (page - 1) * limit;
  
     
      const { books, totalCount } = await getAllBooks(limit, offset);
  
      if (!books.length === 0) {
        throw new AppError('No tours found', 404);
      }
  
      // response format is JSend
      res.status(200).json({
        //statusai gali būti success, fail arba error
        status: 'success',
        data: books,
        meta: {
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  exports.getBookById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const book = await getBookById(id);
  
      if (!book) {
        
        throw new AppError('book not found', 404);
      }
  
      res.status(200).json({
        status: 'success',
        data: book,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.getFilteredBooks = async (req, res, next) => {
    try {
      const filter = req.query;
      
      if (Object.keys(filter).length === 0) {
        const books = await getAllBooks();
        res.status(200).json({
          status: 'success',
          data: books,
        });
        return;
      }
  
      // If query string, return filtered tours
      const filteredBooks = await filterBooks(filter);
  
      res.status(200).json({
        status: 'success',
        data: filteredBooks,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.createBook = async (req, res, next) => {
    try {
      const newBook = req.body;
  
      const createdBook = await createBook(newBook);

      if (!newBook.authorid) {
        res.status(400).json({
          status: 'fail',
          message:
            'Missing author information,',
        });
        return;
      }

      
      res.status(201).json({
        status: 'success',
        data: createdBook,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.updateBook = async (req, res, next) => {
    try {
     
      const id = req.params.id;
  
      
      const newBook = req.body;
  
    //  
  
      const updatedBook = await updateBook(id, newBook);
  
      if (!updatedBook) {
        
  
        throw new AppError('Invalid id, book not found and not updated', 404);
      }
  
      res.status(200).json({
        status: 'success',
        data: updatedBook,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.deleteBook = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const book = await deleteBook(id);
      
      if (!book) {
        throw new AppError('book not found', 404);
      }
      
      res.status(200).json({
        status: 'success',
        data: book,
        message: 'book deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

