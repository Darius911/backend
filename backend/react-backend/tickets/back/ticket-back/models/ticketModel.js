const { sql } = require('../dbConnection');

exports.createTicket = async (newTicket) => {
    const ticket = await sql`
      INSERT INTO tickets ${sql(
        newTicket,
        'fullname',
        'email',
        'github_username',
        'unique_code'
        
      )}
         RETURNING *;
      `;
    return ticket[0];
  };

  exports.getTicketByEmail = async (email) => {
    const tickets = await sql`
    SELECT tickets.* 
    FROM tickets 
    WHERE tickets.email = ${email};
    `;
    return tickets[0];
  };

  //code generate random uniqe code
  exports.generateUniqueCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    return code;
  };