const { sql }  = require('../dbConnection');

exports.createUser = async (newUser) => {
    const users = await sql`
    INSERT INTO users ${sql(newUser, 'username', 'email', 'password', 'role')} 
    RETURNING *;
    `;
    return users[0];
}

exports.getUserByEmail = async (email) => {
    const users = await sql`
    SELECT users.* 
    FROM users 
    WHERE users.email = ${email};
    `;
    return users[0]; //tour is an array, so we need to return the first element
}


exports.getUserById = async (id) => {
    const [tours] = await sql`
    SELECT users.*
      FROM users
      WHERE users.id = ${id};
      `;
    return tours; //tour is an array, so we need to return the first element
  };
  