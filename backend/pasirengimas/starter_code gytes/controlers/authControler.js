const argon2 = require('argon2');
const {
  createUser,
  getUserByEmail,
  getUserById,
} = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utilities/appError');

//token sukurimas
const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

//cookies sukurimas
const sendCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = req.body;
    newUser.password = await argon2.hash(newUser.password);
    newUser.role = 'user';
    const createdUser = await createUser(newUser);

    //PO SIGNUP DAROM ISKART LOGIN
    const token = signToken(createdUser.id);

    //issiunciame cookie su token
    sendCookie(token, res);

    createdUser.id = undefined;
    createdUser.password = undefined;
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
    const { email } = req.body;
    const user = await getUserByEmail(email);

    const token = signToken(user.id);
    sendCookie(token, res);

    user.id = undefined;
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt; // be klaustuko nepraleis tu uzklausu kuriuose nera cookies
    console.log(token);
    
    if (!token) {
     throw new AppError('You are not logged in! Please log in', 401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await getUserById(decoded.id);

    if (!currentUser) {
     throw new AppError ('The user belonging to this token does no longer exist', 401);
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

exports.allowAccessTo = (...roles) => {
  return(req, res, next) => {
   try {
    if(!roles.includes(req.user.role)) throw new AppError('You do not have permission to perform this action', 403);
    next();
    
   } catch (error) {
    next(error);
   } 
  };
};
