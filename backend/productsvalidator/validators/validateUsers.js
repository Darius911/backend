const { check } = require('express-validator');

const registerUserValidate = [

  check('email')
  .isEmail()
  .withMessage('Must be a valid email address.'),

  check('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long.'),

  check('age')
  .optional()
  .isInt({ gt: 0 })
  .withMessage('Age must be a positive integer.')
];

module.exports = registerUserValidate;