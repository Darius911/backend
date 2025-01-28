const {body} = require('express-validator');
const { getTicketByEmail } = require('../models/ticketModel');

const ticketValidator = [

    body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail()
    .custom(async(value) =>{
        const user = await getTicketByEmail(value);

        if(user) throw new Error("ticket already exist");
        return true; //validation passed
    }),

    body('fullname')
    .notEmpty()
    .withMessage('Username is required'),

    body('github_username')
    .notEmpty()
    .withMessage('Username is required'),

    body('unique_code')
    
    
    
    
];
module.exports = ticketValidator;