const express = require('express');
const {getAllTours, getFilteredTours, getTourById, createTour, updateTour } = require('../controlers/tourControler');
const paginationValidator = require('../validators/pagination');
const validate = require('../validators/validate');
const filterValidator = require('../validators/filter');
const tourValidator = require('../validators/tours');
const {protect }  = require('../controlers/authControler');
const { allowAccessTo } = require('../controlers/authControler');

//middleware for specific route, only for delete
const midlewareForDeleteRoute = (req, res, next) => {
  console.log('Hello from the middleware for delete route');
  next();
};

// sukuriame ir pervardiname tourRouter tiesiog į router
const router = express.Router();

// deklaruojame, aprašome tour routes, svarbi routs eilės tvarka
router.route('/').get(protect,allowAccessTo('admin','editor'), paginationValidator, validate, getAllTours).post(protect, tourValidator, validate, createTour); // General base route
router.route('/filter').get(filterValidator, validate, getFilteredTours);

router.route('/category/:category/difficulty/:difficulty'); // Specific route for category and difficulty

router
  .route('/:id') // General dynamic route for tour by ID
  .get(getTourById)
  .put(updateTour);


module.exports = router;
