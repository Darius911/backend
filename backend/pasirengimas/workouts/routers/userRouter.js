const express = require("express")
const userController = require("../controllers/userController");


const { postNewUser, logInUser, getAllUsers, getUserById, getUserByUsername, getUserWorkoutsById, addWorkoutToUser, getAllWorkouts, getWorkoutById, editWorkout, deleteWorkoutById, addExerciseToWorkout, deleteExerciseFromWorkout } = userController;
// ROUTES
const userRouter = express.Router();

userRouter.route("/").get(getAllUsers)
userRouter.route("/register").post(postNewUser)
userRouter.route("/login").post(logInUser)
userRouter.route("/workouts").get(getAllWorkouts)
userRouter.route("/workouts/:id").get(getWorkoutById).put(editWorkout).delete(deleteWorkoutById)
userRouter.route("/workouts/:id/exercises").post(addExerciseToWorkout)
userRouter.route("/workouts/exercises/:id").delete(deleteExerciseFromWorkout)
userRouter.route("/id/:id").get(getUserById)
userRouter.route("/:id/workouts").get(getUserWorkoutsById).post(addWorkoutToUser)
userRouter.route("/:username").get(getUserByUsername)


module.exports = userRouter;