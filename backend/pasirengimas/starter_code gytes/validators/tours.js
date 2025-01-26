const {body} = require('express-validator');
const { getTourByName } = require('../models/tourModel');

const tourValidator = [
    body('name')
    .optional()
    .isString()
    .custom(async(value)=>{
        const tour= await getTourByName(value);
        if(tour){
            throw new Error('This tour already exists');
        }
        return true;
    }),
];
module.exports = tourValidator;