const express = require('express');
const { signup, login} = require('../controlers/authControler');
const signupValidator = require("../validators/signup");
const loginValidator = require("../validators/login")
const validate = require('../validators/validate');





const router = express.Router();

router.route('/register').post(signupValidator, validate, signup);


router.route('/login').post( loginValidator, validate, login);


module.exports = router;