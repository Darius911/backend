const { sql } = require("../dbConnection");

exports.createUser = async (newUser) => {
  const users = await sql`
    INSERT INTO users ${sql(
      newUser,
      'email',
      'password',
      'age',
      
    )}
       RETURNING *;
    `;
  return users[0];
};


exports.getUserById = async (id) => {
  const users = await sql`
  SELECT users.*
    FROM users
   
    WHERE users.id = ${id};
    `;
  return users[0]; //tour is an array, so we need to return the first element
};