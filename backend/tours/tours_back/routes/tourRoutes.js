const express = require('express');
const { getAllTours, createTour, updateTour,deleteTour } = require('../controlers/tourControler');
const { protect, allowAccessTo } = require('../controlers/authControler');
const validate = require('../validators/validate');
const router = express.Router();

router.route('/')
.get(getAllTours)
.post(protect, allowAccessTo('admin'), validate, createTour);

router.route('/:id')
.put(protect, allowAccessTo('admin'), validate, updateTour)
.delete(deleteTour);

module.exports = router;