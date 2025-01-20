const {validationResult} = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
//atsispausdiname erorus
    console.log(errors);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
    status: "fail",
    errors: errors.array(),
        });
    }  
    next();
};
module.exports = validate;
