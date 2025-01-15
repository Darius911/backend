const express = require("express");
const tourController = require("../controllers/tourControllers");
const {deleteMidleware} = require("../middlewares/routeMiddlewares");
const { getAllTours, getTour, postTour, updateTour, getToursByCategotyId, getToursCountByCategory, getFilteredTours} = tourController;
const tourRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(deleteMidleware, postTour);
tourRouter.route("/filter").get(getFilteredTours)
tourRouter.route("/count").get(getToursCountByCategory);

tourRouter.route("/:id").get(getTour).patch(updateTour);
tourRouter.route("/category/:categoryid").get(getToursByCategotyId);

//importuojam is tour controler


module.exports = tourRouter;