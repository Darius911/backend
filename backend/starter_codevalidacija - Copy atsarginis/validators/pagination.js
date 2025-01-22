const { query } = require("express-validator");

//masyvas kur  surasysime  chainus
const paginationValidator = [ 
    query("page")
    .optional()
    .isInt({min: 1}) // must be integer >= 1
    .withMessage("page must be positive integer") //error message
    .toInt(), //convert to integer

    query("limit")
    .optional()
    .isInt({min: 1, max: 100}) // must be integer between 1 and 100
    .withMessage("page must be positive integer between 1 and 100") //error message
    .toInt() //convert to integer
    //custom validator
    .custom((value, req) => {
        if (value %3 !== 0) {
            throw new Error("limit must be a multiple of 3");
        }
        return true; //validation passed
    })
//**************************************************************** */
    //testas pas mane nera lenteles sujunktos
    .custom(async(value) => {
        const difficulty = await getDifificultyById(value);
        if (!difficulty) {
            throw new Error("difficulty not found");
        }
        return true;
    }),
];

module.exports = paginationValidator;

