const {body} = require('express-validator');


const signupValidator = [

   

    body('username')
    .notEmpty()
    .withMessage('name is required')
    .isLength({min: 3})
    .withMessage('Username must be at least 3 characters long'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min: 8})
    .withMessage('Password must be at least 8 characters long')
    // .isStrongPassword()
    // .withMessage('Password must be at least 8 characters long, one lowercase, one uppercase, one number and one special character')
    .custom((value, {req}) => {
        if (value !== req.body.confirmPassword) {
            throw new Error('Passwords do not match');
        }
        return true;
    })
];
module.exports = signupValidator;