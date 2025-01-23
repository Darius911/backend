const express = require('express');
const userControler = require('../controlers/userController');

const validateNewUser = require("../validators/validateUsers");
const getUserByIdValidate = require("../validators/validateGetUserById")
const validate = require("../validators/validate");
const {getUserById, singup} =
  userControler;



// sukuriame ir pervardiname tourRouter tiesiog į router
const router = express.Router();

// deklaruojame, aprašome tour routes, svarbi routs eilės tvarka
router.route('/register').post(validateNewUser, validate,singup); 

router.route('/:id').get(getUserByIdValidate, validate,getUserById);

module.exports = router;