const { sql } = require('../dbConnection');

exports.getAllBooks = async (limit, offset) => {
    const books = await sql`
    SELECT books.*, authors.*
      FROM books
      JOIN authors ON books.authorid = authors.id
    
      
       ${
         !isNaN(limit) && !isNaN(offset)
           ? sql`LIMIT ${limit} OFFSET ${offset}`
           : sql``
       }  
      `;
    
    const total = await sql`
        SELECT COUNT(*)::int AS count 
        FROM books
      `;
  
    return { books, totalCount: total[0].count };
  };

  exports.getBookById = async (id) => {
    const books = await sql`
    SELECT books.*, authors.*
      FROM books
       JOIN authors ON books.authorid = authors.id
      WHERE books.id = ${id}
     
      `;
    return books[0]; 
  };

  exports.filterBooks = async (filter) => {
    
  
    const books = await sql`
    SELECT books.*
      FROM books
      JOIN authors ON books.authorid = authors.id
      
      WHERE 
      books.authorid = ${filter.authorid}   
       
          
     `;
    
    return books;
  };



  exports.createBook = async (newBook) => {
    const books = await sql`
      INSERT INTO books ${sql(
        newBook,
        'title',
        'summary',
        'isbn',
        'authorid',
        
      )}
         RETURNING *;
      `;
    return books[0];
  };

  exports.updateBook = async (id, updatedBook) => {
    const books = await sql`
    update books set ${sql(
      updatedBook,
      
      
    )}
    where id = ${id}
    returning *;
  `;
    return books[0];
  };

  exports.deleteBook = async (id) => {
  const books = await sql`
    DELETE FROM books
    WHERE id = ${id}
    RETURNING *;
  `;
  
  return books[0];
};