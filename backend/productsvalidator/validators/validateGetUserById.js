const { check } = require('express-validator');

const getUserByIdValidate = [
  check('id')
  .isNumeric()
  .withMessage('ID must be a numeric value.')
];

module.exports = getUserByIdValidate;
