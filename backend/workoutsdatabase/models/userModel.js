const {sql} = require("../dbConnection");

exports.getAllUsers = async () => {
    const userList = await sql`
   SELECT *
   FROM users
   `;
  
    return userList;
  };

  exports.postUser = async (user) => {
    const columns = [ 
        'username',
        'password',
        'email'
        
    ]
  const newUser =
    await sql` 
    INSERT INTO users ${sql(user, columns)}
    RETURNING*`;
  return newUser[0];
  };

  exports.update = async (id, user) => {
    const columns = Object.keys(user);
  
    const newUsers = await sql`
    update users set ${sql(user, columns)}
    where users.id = ${id}
    RETURNING *`;
  
    return newUsers[0];
  };

