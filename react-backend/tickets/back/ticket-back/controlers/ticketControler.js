const { createTicket, generateUniqueCode } = require('../models/ticketModel');

exports.createTicket = async (req, res, next) => {
    try {
//generate unique code
      

      const newTicket = req.body;
      const uniqueCode = generateUniqueCode();
      newTicket.unique_code = uniqueCode;
      const createdTicket = await createTicket(newTicket);
        console.log(createdTicket);
        
 
  
      res.status(201).json({
        status: 'success',
        data: createdTicket,
      });
    } catch (error) {
      next(error);
    }
  };