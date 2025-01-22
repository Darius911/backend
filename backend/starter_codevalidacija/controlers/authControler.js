//importuojame argon2 hasheri
const argon2 = require('argon2');
const {createUser} = require('../models/userModel');
// const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    const token = jwt.sign({ id }, process.env. JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    });
    
    return token;
};

const sendCookie = (token, res) => {
    const cookieOptions = {
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true, //cokio nesimatys narsykleje ir bus pasleptas ir ji matys tik uzklausa
    };
    res.cookie('jwt', cookieOptions, token,);
};



exports.singup = async (req, res, next) => {
    try {
        //susikuriame kintamaji ir priskiriame request body
        const newUser = req.body;

        const hash = await argon2.hash(newUser.password);
        //pasvorda pakeiciame i hash
        newUser.password = hash;
        //modelis kuri pskui susiimportuosime
        const createdUser = await createUser(newUser);

        

        // if(!createdUser) throw new AppError('User not created', 500);

        //po singup iskarto login

        const token = signToken(createdUser.id);

        //issiunciame cookie su tokenu

        sendCookie(token, res);

        //paslepiame slaptazodi
        createdUser.password = undefined;
        createdUser.id = undefined;

        res.status(201).json({
            status: 'success',
            data: createdUser,
        });
        

    } catch (error) {
        next(error);
    }
};