const express = require('express');
const tourControler = require('../controlers/tourControler');
const paginationValidator = require("../validators/pagination");
const filterValidator = require("../validators/filtervalidate")
const validate = require("../validators/validate");
const { getAllTours, getTourById, createTour, updateTour, getFilteredTours,postNewTour } =
  tourControler;

//middleware for specific route, only for delete
const midlewareForDeleteRoute = (req, res, next) => {
  console.log('Hello from the middleware for delete route');
  next();
};

// sukuriame ir pervardiname tourRouter tiesiog į router
const router = express.Router();

// deklaruojame, aprašome tour routes, svarbi routs eilės tvarka
router.route('/').get(paginationValidator,validate, getAllTours).post(createTour,postNewTour); // General base route
router.route('/filter').get(filterValidator, validate,getFilteredTours);

router.route('/category/:category/difficulty/:difficulty'); // Specific route for category and difficulty

router
  .route('/:id') // General dynamic route for tour by ID
  .get(getTourById)
  .put(updateTour);

module.exports = router;
