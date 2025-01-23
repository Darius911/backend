const {body} = require('express-validator');
const argon2 = require('argon2');
const {getUserByEmail} = require('../models/userModel');

const validateLogin = [
body('email')
.notEmpty()
.withMessage('Email is required')
.isEmail()
.withMessage('Email is invalid')
.normalizeEmail(),
// .custom(async(value)=>{
//     const existingUser = await getUserByEmail(value);

//     if(!existingUser) throw new Error('user not found, please singup');
//     return true;
// }),

//patikrinam ar jo pasvordas toks koki atsinese
body('password')
.notEmpty()
.withMessage('password is required')
.custom(async(value, {req})=>{
    const existingUser = await getUserByEmail(req.body.email);

    if (existingUser){
        const match = await argon2.verify(existingUser.password, value);
        if (!match){
            throw new Error ('Password is incorect');

        } 
        return true;
     } else {
            throw new Error('user not found, please sing up ')
        }
    

}),

];

module.exports = validateLogin

