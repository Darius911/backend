const express = require ("express");
const userController = require("../controllers/userController");
const {getAllUsers, postUser, updateUser} = userController;


// ROUTES
const userRouter = express.Router();

// aprasome routes
userRouter.route("/").get(getAllUsers);
userRouter.route("/:id").patch(updateUser)
userRouter.route("/registration").post(postUser);

userRouter.route("/login").post(postUser);

module.exports = userRouter;

