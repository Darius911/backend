const { check } = require('express-validator');

const productValidator = 

[
  check('price')
  .optional()
  .isFloat({ gt: 0 })//gt0 turi buti didesnis uz  nuli
  .withMessage('Price must be a positive number with up to 2 decimal places.'),


  check('category')
  .notEmpty()
  .withMessage('Category is required and must be a non-empty string.')
  .isIn(['Elektronika', 'Apranga', 'Žaidimai', 'Įrankiai', 'Grožis'])
  .withMessage('Category must be one of: Elektronika, Apranga, Žaidimai, Įrankiai, Grožis.')
  .isString()
  .withMessage('Category must be a string.'),
];

module.exports = productValidator; 