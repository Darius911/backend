const {body} = require('express-validator');
const {getUserByEmail} = require('../models/userModel');
const validateNewUser = [
    //chek body is not emty
    // body()
    // .notEmpty()
    // .withMessage("user body must contain data"),
    
    body('email')
    .notEmpty()
    .withMessage("email must not be empty")
    .isEmail()
    .withMessage("email is invalid")
    .normalizeEmail()
    //custom validatorius patikriname ar yra toks useris
    .custom(async (email) => {
        const user = await getUserByEmail(email);
        if (user) 
            throw new Error("user with this email already exists");
        
        return true; //validation passed
    }),
    
    

    body('password')
    .notEmpty()
    .withMessage("password requred")
    .isLength({min: 8})
    .withMessage("password must be at least 8 characters long")
    .custom((value, {req})=>{
        if (value !== req.body.passwordcomfirm) throw new Error("passwords and pasword comfirm not match");
        return true;
    }),

    body('age')
    .trim()
    .notEmpty()
    .withMessage("username must not be empty")
    .isNumeric()
    .withMessage("age must be number")
];

module.exports = validateNewUser;