const express = require('express');
const userControler = require('../controlers/userController');

const registerUserValidate = require("../validators/validateUsers");
const getUserByIdValidate = require("../validators/validateGetUserById")
const validate = require("../validators/validate");
const {createUser, getUserById} =
  userControler;



// sukuriame ir pervardiname tourRouter tiesiog į router
const router = express.Router();

// deklaruojame, aprašome tour routes, svarbi routs eilės tvarka
router.route('/register').post(registerUserValidate, validate,createUser); 

router.route('/:id').get(getUserByIdValidate, validate,getUserById);

module.exports = router;