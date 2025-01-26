const express = require('express');
const { signup, login} = require('../controlers/authControler');
const signupValidator = require("../validators/signup");
const loginValidator = require("../validators/login")
const validate = require('../validators/validate');
const { getAllUsers,getUserById,updateUser,deleteUser } = require('../controlers/userControler');




const router = express.Router();

router.route('/').post(signupValidator, validate, signup).get(validate,getAllUsers);


router.route("/:id")
.get(validate, getUserById)
.put(validate, updateUser)
.delete(validate,deleteUser);

router.route('/login').post(loginValidator, validate, login);


module.exports = router;