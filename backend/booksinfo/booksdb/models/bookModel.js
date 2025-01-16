const { sql } = require("../dbConnection");
//per parametrus priimame limit ir offset
exports.getAllBooks = async () => {
      const bookList = await sql`
   SELECT *
   FROM books
   
   `;
  
    return bookList;
  };

//sort by A to Z`
  exports.filterBooks = async (filter) => {

    const validDirection = ["ASC, DESC"];
    
    const sortValue = filter.sort.toUpperCase();
    const sortDirection = validDirection.includes(sortValue) ? sortValue :"ASC";
    const books =
      await sql`SELECT books.*
    FROM books
   
    WHERE
    books.year <= ${filter.year} AND books.genre = ${filter.genre} AND books.author = ${filter.author} 
    
    ORDER BY books.title ${sql.unsafe(sortDirection)} 
    ${
      filter.limit !==undefined && filter.offSet !==undefined ? sql `limit ${filter.limit} offSet ${filter.offSet}`: sql`` 
    }
     
       `;
    const total = await sql `
    select COUNT(*)
    FROM books
    `;   
      //  return books; 
       return {books, totalCount: total[0]};
  };