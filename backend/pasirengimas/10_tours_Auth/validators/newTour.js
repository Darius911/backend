const { body } = require('express-validator');
const { getDifficultyById } = require('../models/difficultyModel');

const validateNewTour = [
  // Check if body is not empty
  body().notEmpty().withMessage('Request body must contain data'),

  // Validate 'name'
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters')
    .notEmpty()
    .withMessage('Name is required'),

  // Validate 'price'
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number')
    .notEmpty()
    .withMessage('Price is required')
    .toFloat(),

  // Validate 'duration'
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer')
    .notEmpty()
    .withMessage('Duration is required'),

  // Validate 'difficulty'
  // Validate 'difficulty' as an integer (ID of difficulties table)
  body('difficulty')
    .isInt({ min: 1 })
    .withMessage('Difficulty must be a positive integer (valid ID)')
    .notEmpty()
    .withMessage('Difficulty is required')
    // Custom validation to check if difficulty ID exists in the database
    .custom(async (value) => {
        const difficulty = await getDifficultyById(value); // Query the database
        if (!difficulty) {
          throw new Error('Invalid difficulty ID, not found in difficulties table');
        }
        return true; // Validation passed
      }),

  // Validate 'description'
  body('description')
    .optional() // 'description' is optional
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
];

module.exports = validateNewTour;
