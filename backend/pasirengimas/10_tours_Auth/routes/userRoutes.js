const express = require('express');
const { getAllUsers } = require('../controlers/userControler');
const { signup, login, protect} = require('../controlers/authControler');
const validateNewUser = require('../validators/signup');
const validateLogin = require('../validators/login');
const validate = require('../validators/validate');

// sukuriame ir pervardiname tourRouter tiesiog į router
const router = express.Router();

// deklaruojame, aprašome user routes
router.route('/').get(protect, getAllUsers);

router.route('/signup').post(validateNewUser, validate, signup);
router.route("/login").post(validateLogin, validate, login);

module.exports = router;
