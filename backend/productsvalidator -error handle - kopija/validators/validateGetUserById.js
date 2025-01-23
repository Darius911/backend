const { param } = require('express-validator');

const getUserByIdValidate = [
  param('id')
  .isNumeric()
  .withMessage('ID must be a numeric value.')
];

module.exports = getUserByIdValidate;
