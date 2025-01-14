const express = require("express");
const tourController = require("../controllers/tourController");
const { deleteMiddleware } = require("../middlewares/routeMiddlewares");

const {
  getAllTours,
  getTour,
  postTour,
  updateTour,
  deleteTour,
  getToursByCategoryId,
  countToursByCategory,
  showToursByCategoryDifficulty,
  getFilteredTours
} = tourController;

// ROUTES
const tourRouter = express.Router();

// aprasome routes
tourRouter.route("/").get(countToursByCategory).post(postTour);
tourRouter.route("/filter").get(getFilteredTours);
tourRouter
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteMiddleware, deleteTour);
tourRouter.route("/category/:categoryid").get(getToursByCategoryId);
tourRouter.route("/category/:category/difficulty/:difficulty").get(showToursByCategoryDifficulty)
module.exports = tourRouter;
