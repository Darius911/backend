const express = require('express');
const { singup } = require('../controlers/authControler');
const validateNewUser  = require('../validators/singup');
const router = express.Router();
const validate = require("../validators/validate");


router.route("/singup").post( validateNewUser,validate, singup);

module.exports = router;