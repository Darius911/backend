const { validationResult } = require('express-validator');
const AppError = require('../utils/appError');

// Middleware to handle validation errors, reusable in each route
const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);

    // create errors string, kad suvienodinti klaidų pranešimus
    const errorsString = errors
      .array()
      .map((error) => error.msg)
      .join('; ');

    if (!errors.isEmpty()) {
      // return res.status(400).json({
      //   status: 'fail',
      //   errors: errors.array(),
      // });

      throw new AppError(errorsString, 400);
    }
    next(); // Proceed to the next middleware or controller, validation passed
  } catch (error) {
    next(error);
  }
};

module.exports = validate;
