const { param } = require('express-validator');

const validateId = [
    param('id')
      .isInt({ min: 1 }) // Use this if 'id' is a positive integer
      .withMessage('Invalid ID format. Must be a positive integer'),
  ];
  
  module.exports = validateId;