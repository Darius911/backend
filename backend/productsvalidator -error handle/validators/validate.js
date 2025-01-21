const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);

    //atsispausdiname erorus
    //   console.log(errors);

    const errorString = errors
      .array()
      .map((error) => error.msg)
      .join("; ");

    if (!errors.isEmpty()) {
      // return res.status(400).json({
      //   status: 'fail',
      //   errors: errors.array(),
      // });

      //blogas reqvestas
      throw new AppError(errorString, 400);
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = validate;
