const { query } = require('express-validator');

const filterValidator = [
  // Validate and sanitize 'duration'
  query('duration')
    .optional() // Allow it to be optional
    .isNumeric()
    .withMessage('Duration must be a numeric value')
    .isInt({ min: 0 }) // Convert to integer and ensure it's >= 0
    .withMessage('Duration must be a positive integer number')
    .toInt(),

  // Validate and sanitize 'price'
  query('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a numeric value')
    .isFloat({ min: 0 }) // Ensure it's a float >= 0
    .withMessage('Price must be a positive number')
    .toFloat(), // Convert to float and ensure it's >= 0

  // Validate 'difficulty'
  query('difficulty')
    .optional()
    .isString()
    .withMessage('Difficulty must be a string')
    .isIn(['easy', 'medium', 'difficult'])
    .withMessage('Difficulty must be one of: easy, medium, difficult'),

  // Validate 'sort'
  query('sort')
    .optional()
    .isString()
    .withMessage('Sort must be a string')
    .custom((value) => {
      const allowedSortFields = ['asc', 'desc'];
      const sortField = value.startsWith('-') ? value.slice(1) : value;
      if (!allowedSortFields.includes(sortField)) {
        throw new Error(
          `Invalid sort field: '${sortField}'. Allowed fields are: ${allowedSortFields.join(
            ', '
          )}`
        );
      }
      return true;
    }),
];

module.exports = filterValidator;
