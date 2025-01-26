const { sql }  = require('../dbConnection');

exports.createUser = async (newUser) => {
  // Insert into users table
  const users = await sql`
    INSERT INTO users (name, email,address)
    VALUES (${newUser.name}, ${newUser.email},${newUser.address})
    RETURNING *;
  `;
  
  const user = users[0];

  // Insert into user_secrets table
  await sql`
    INSERT INTO user_secrets (user_id, password)
    VALUES (${user.id}, ${newUser.password})
    RETURNING *;
  `;

  // Insert into user_roles table
  await sql`
    INSERT INTO user_roles (user_id, role_id)
    VALUES (${user.id}, ${newUser.role_id})
    RETURNING *;
  `;

  return user;
};

exports.getUserByEmail = async (email) => {
  const users = await sql`
    SELECT users.*, user_secrets.password
    FROM users
    LEFT JOIN user_secrets ON users.id = user_secrets.user_id
    WHERE users.email = ${email};
  `;
  return users[0];
};

exports.getUserById = async (id) => {
  const users = await sql`
    SELECT users.*, user_secrets.password
    FROM users
    LEFT JOIN user_secrets ON users.id = user_secrets.user_id
    WHERE users.id = ${id};
  `;
  return users[0];
};

exports.getAllUsers = async () => {
  const usersList = await sql`
    SELECT 
      users.id,
      users.name, 
      users.email, 
      users.phone_number,
      users.address,
      user_secrets.password,
      roles.role_name,
      users.created_at, 
      users.updated_at
    FROM 
      users
    JOIN 
      user_secrets ON users.id = user_secrets.user_id
    JOIN 
      user_roles ON users.id = user_roles.user_id
    JOIN 
      roles ON user_roles.role_id = roles.id;
  `;

  return usersList;
};

exports.updateUser = async (id, updatedUser) => {
  // Update users table
  const users = await sql`
    UPDATE users SET ${sql(
      updatedUser,
      'name',
      'email',
      'phone_number',
      'address'
    )}
    WHERE id = ${id}
    RETURNING *;
  `;
  
  const user = users[0];

  // If password is being updated, update the user_secrets table
  if (updatedUser.password) {
    await sql`
      UPDATE user_secrets SET password = ${updatedUser.password}, updated_at = NOW()
      WHERE user_id = ${id}
      RETURNING *;
    `;
  }

  return user;
};

exports.deleteUser = async (id) => {
  // Delete from user_secrets table
  await sql`
    DELETE FROM user_secrets
    WHERE user_id = ${id};
  `;

  // Delete from user_roles table
  await sql`
    DELETE FROM user_roles
    WHERE user_id = ${id};
  `;

  // Delete from users table
  const users = await sql`
    DELETE FROM users
    WHERE id = ${id}
    RETURNING *;
  `;
  
  return users[0];
};