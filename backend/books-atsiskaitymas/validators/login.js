const {body} = require('express-validator');
const { getUserByUsername } = require('../models/userModel');
const argon2 = require('argon2');

const loginValidator = [
   
    

    body('username')
    .notEmpty()
    .withMessage('name is required'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .custom(async(value, {req}) => {
        const existingUser = await getUserByUsername(req.body.username);
        if(!existingUser) throw new Error("User with this email not exist, please sign up");
        if(!await argon2.verify(existingUser.password, value)){
            throw new Error("Incorrect password");
        }
        return true;
    })
];
module.exports = loginValidator;