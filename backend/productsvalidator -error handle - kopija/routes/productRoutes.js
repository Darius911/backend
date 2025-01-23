const express = require('express');
const productControler = require('../controlers/productController');
const productValidator = require("../validators/validateProducts")


const validate = require("../validators/validate");
const {  getFilteredProducts} =
  productControler;



// sukuriame ir pervardiname tourRouter tiesiog į router
const router = express.Router();

// deklaruojame, aprašome tour routes, svarbi routs eilės tvarka
router.route('/').get(productValidator, validate,getFilteredProducts);


module.exports = router;