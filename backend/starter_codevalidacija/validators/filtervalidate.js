const { query } = require("express-validator");

const filterValidator = [
    query("duration")
    .optional()
    .isInt({min: 1, max: 10}) // must be integer >= 1 and max 10
    .withMessage("page must be positive integer") //error message
    .toInt() //convert to integer
    .withMessage("this is not a number"),


    query("difficulty")
    .optional()
    .isIn(['Easy', 'Medium', 'Hard']) //is situ triju reiksmiu
    .withMessage("bad value"),
    
    
    


    query("price")
    .optional()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [2] })
    .withMessage('Price must be a positive decimal'), // error message
]

module.exports = filterValidator;
