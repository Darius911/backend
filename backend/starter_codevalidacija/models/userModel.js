const { sql } = require('../dbConnection');

exports.createUser = async (newUser) => {
const users = await sql`
INSERT INTO users ${sql(newUser, 'username', 'email', 'password')}
RETURNING *
`;
return users[0];
};

exports.getUserByEmail = async (email) => {
const users = await sql`
SELECT users.* 
FROM users 
WHERE users.email = ${email}
`;
return users[0];
};
