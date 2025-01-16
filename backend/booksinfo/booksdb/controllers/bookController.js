const {getAllBooks, filterBooks} = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
    try {
       
        
        
      const books = await getAllBooks();
      res.status(200).json({
        status: "success",
        data: books,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: error.message,
      });
    }
  };

  //2. filter books using query string
exports.getFilteredBooks = async (req, res) => {
    try {
      const filter = req.query;
      
    let page = parseInt(filter.page);
    let limit = parseInt(filter.limit);

    const offSet = (page -1) * limit;

        if (page <1 || limit <1){
            return res.status(400).json({
                status: "fail",
                message : "Invalid page or limit value"
            });
        }
  
        filter.offSet = offSet;        
      // If no query string, return all bookss
      if (Object.keys(filter).length !== 0) {
        const books = await filterBooks(filter);
        res.status(200).json({
          status: 'success',
          data: books,
        });
        return;
      }
  
      // Validate filter fields
      const allowedFields = ["author","year", "genre", "sort", "limit", "page"];
      for (const key of Object.keys(filter)) {
        if (!allowedFields.includes(key)) {
          return res.status(400).json({
            status: 'fail',
            message: `Invalid filter field: '${key}'. Allowed fields are: ${allowedFields.join(
              ', '
            )}`,
          });
        }
      }
  
      // Validate numeric parameters
      if (!Number(filter.year) || filter.year < 0) {
        throw new Error('Invalid year');
      }
     
  
      // Validate difficulty against allowed values
      const validGenre = ['Fiction', 'Fantasy', 'Dystopian'];
      if (!validGenre.includes(filter.genre)) {
        throw new Error('Invalid Genre');
      }
  
      // If query string, return filtered books
      const filteredBooks = await filterBooks(filter);
  
      res.status(200).json({
        status: 'success',
        data: filteredBooks,
        total: filteredBooks.count
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };