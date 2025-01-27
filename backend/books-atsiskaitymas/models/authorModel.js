const { sql } = require('../dbConnection');

exports.getAllAuthors = async () => {
    const authors = await sql`
    SELECT authors.*, books.*
      FROM authors
       JOIN books ON  authors.id = books.authorid 
      
      `;
    return authors;
  };

  exports.getAuthorById = async (id) => {
    const authors = await sql`
    SELECT authors.*, books.*
      FROM authors
      JOIN books ON  authors.id = books.authorid
      WHERE authors.id = ${id};
      `;
    return authors[0]; 
  };

  exports.createAuthor = async (newAuthor) => {
    const authors = await sql`
      INSERT INTO authors ${sql(
        newAuthor,
        'name',
        'birthdate',
        'biography',
        
      )}
         RETURNING *;
      `;
    return authors[0];
  };

  exports.updateAuthor = async (id, updatedAuthor) => {
    const authors = await sql`
    update authors set ${sql(
      updatedAuthor,
      
      
    )}
    where id = ${id}
    returning *;
  `;
    return authors[0];
  };

  exports.deleteAuthor = async (id) => {
  const authors = await sql`
    DELETE FROM authors
    WHERE id = ${id}
    RETURNING *;
  `;
  
  return authors[0];
};