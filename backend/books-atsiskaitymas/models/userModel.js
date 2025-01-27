const { sql }  = require('../dbConnection');

exports.createUser = async (newUser) => {
  const users = await sql`
  INSERT INTO users ${sql(newUser, 'username', 'password', 'role')} 
  RETURNING *;
  `;
  return users[0];
};

exports.getUserById = async (id) => {
  const [users] = await sql`
  SELECT users.*
    FROM users
    WHERE users.id = ${id};
    `;
  return users; 
};

exports.getUserByUsername = async (username) => {
  const users = await sql`
    SELECT * FROM users WHERE username = ${username}
  `;
  return users[0];
};

