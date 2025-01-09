const express = require("express");
const tourController = require("../controllers/tourControllers");
const {deleteMidleware} = require("../middlewares/routeMiddlewares");
const { getAllTours, getTour, postTour, updateTour } = tourController;
const tourRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(deleteMidleware, postTour);
tourRouter.route("/:id").get(getTour).patch(updateTour);

module.exports = tourRouter;