//importuojame argon2 hasheri
const argon2 = require('argon2');
const {createUser, getUserByEmail, getUserById} = require('../models/userModel');
// const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

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
    //jwt cookie vardas
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

exports.login = async (req, res, next) => {
    try {
        const {email} = req.body;    
        const user = await getUserByEmail(email);
        const token = signToken(user.id);
        sendCookie(token, res);
        
        
        user.password = undefined;
        user.id = undefined;

        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        next(error);
    }
    };

    //neregistruotiems useriam neleis daryti kazko daryti protect middleware

    exports.protect = async (req, res, next) => {
        try {
           //cokies parseris
           const token = req.cookies?.jwt;

           if (!token) {
            throw new AppError('You are not logged in, Please login to get access', 401);
           }

           //verifikuojame tokenu su process.env.JWT_SECRET
           const decoded = jwt.verify(token, process.env.JWT_SECRET);
           const currentUser = await getUserById(decoded.id);

           if(!currentUser) throw new AppError('User belongingt to this token no longer exist');
           
           req.user = currentUser;
           next();
        } catch (error) {
            next(error);
        }
    }