const express = require("express");
const userController = require("../controllers/userControllers");
const {deleteMidleware} = require("../middlewares/routeMiddlewares");
const { getAllUsers, getUser, postUser, updateUser, deleteUser  } = userController;
const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(deleteMidleware, postUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;