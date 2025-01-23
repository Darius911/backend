const express = require('express');
const { singup, login } = require('../controlers/authControler');
const validateNewUser  = require('../validators/singup');
const validateLogin = require('../validators/login')
const router = express.Router();
const validate = require("../validators/validate");


router.route("/singup").post( validateNewUser,validate, singup);
router.route("/login").post(validateLogin, validate, login);

module.exports = router;