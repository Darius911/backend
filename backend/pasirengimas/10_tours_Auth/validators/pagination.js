const { query } = require('express-validator');

const paginationValidator = [
  // Validate 'page'
  query('page')
    .optional() // 'page' is optional
    .isInt({ min: 1 }) // Must be an integer and >= 1
    .withMessage('Page must be an integer greater than or equal to 1')
    .toInt(), // Convert to integer

  // Validate 'limit'
  query('limit')
    .optional() // 'limit' is optional
    .isInt({ min: 1, max: 100 }) // Must be an integer between 1 and 100
    .withMessage('Limit must be an integer between 1 and 100')
    .toInt() // Convert to integer
    // .custom(value => {
    //   if (value % 5 !== 0) {
    //     throw new Error('Limit must be a multiple of 5');
    //   }
    //   return true;
    // })

  // Default values (if not provided)
  // query('page').default(1),
  // query('limit').default(10),
];

module.exports = paginationValidator;