const { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../models/authorModel'); 
const AppError = require('../utilities/appError');

exports.getAllAuthors = async (req, res, next) => {
    try {
     
      const authors = await getAllAuthors();
      res.status(200).json({
       
        status: 'success',
        data: authors,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.getAuthorById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const author = await getAuthorById(id);
  
      if (!author) {
        
        throw new AppError('author not found', 404);
      }
  
      res.status(200).json({
        status: 'success',
        data: author,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.createAuthor = async (req, res, next) => {
    try {
      const newAuthor = req.body;
  
      const createdAuthor = await createAuthor(newAuthor);
  
      res.status(201).json({
        status: 'success',
        data: createdAuthor,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.updateAuthor = async (req, res, next) => {
    try {
     
      const id = req.params.id;
  
      
      const newAuthor = req.body;
  
    //  
  
      const updatedAuthor = await updateAuthor(id, newAuthor);
  
      if (!updatedAuthor) {
        
  
        throw new AppError('Invalid id, author not found and not updated', 404);
      }
  
      res.status(200).json({
        status: 'success',
        data: updatedAuthor,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.deleteAuthor = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const author = await deleteAuthor(id);
      
      if (!author) {
        throw new AppError('User not found', 404);
      }
      
      res.status(200).json({
        status: 'success',
        data: author,
        message: 'Author deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

