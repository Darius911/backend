const { postUser, logIn, getAll, getOne, getUserByName, getUserWorkouts, addWorkout, getAllWork, getOneWorkout, edit, deleteWorkout, addExercise, deleteExercise } = require("../models/userModel");

exports.postNewUser = async (req, res) => {
  const { username, password, email } = req.body;



  try {
    if (!username || username.length < 4) {
      return res.status(400).json({
        status: "fail",
        message: "Username is required and must be at least 4 characters"
      })
    }
    if (!password || password.length < 4) {
      return res.status(400).json({
        status: "fail",
        message: "Password is required and must be at least 4 characters"
      })
    }

    const emailRgx = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/

    if (!email || !emailRgx.test(email)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email adress"
      })
    }
    const newUser = await postUser({ username, password, email });

    res.status(200).json({
      status: "success",
      data: { ...newUser, password: undefined },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}


exports.logInUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await logIn({ username, password });

    if (user) {
      res.status(200).json({
        message: "Success! You are logged in!",
        user: user,
      });
    } else {
      res.status(401).json({
        status: "fail",
        message: "Wrong username or password.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAll();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await getOne(id);
  try {
    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "Invalid ID"
      });
      return
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await getUserByName(username);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Username not found"
      })
    }
    res.status(200).json({
      status: "success",
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getUserWorkoutsById = async (req, res) => {
  const { id } = req.params;
  const user = await getUserWorkouts(id);
  try {
    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "Invalid ID"
      });
      return
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

exports.addWorkoutToUser = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const workout = await addWorkout({ name, id });
    res.status(200).json({
      status: "success",
      data: workout,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await getAllWork();
    res.status(200).json({
      status: "success",
      data: workouts,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

exports.getWorkoutById = async (req, res) => {
  const { id } = req.params;
  const workout = await getOneWorkout(id);
  try {
    if (!workout) {
      res.status(404).json({
        status: "fail",
        message: "Invalid ID"
      });
      return
    }
    res.status(200).json({
      status: "success",
      data: workout,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.editWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = req.body;
  try {
    const editWorkout = await edit(id, workout);


    res.status(200).json({
      status: "success",
      rows_updated: editWorkout,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};


exports.deleteWorkoutById = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await deleteWorkout(id);
    if (!workout) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID"
      });
    }
    res.status(200).json({
      status: "success",
      data: "The selected workout was removed",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.addExerciseToWorkout = async (req, res) => {
  const { name, region, reps, sets } = req.body;
  const { id } = req.params;

  try {

    const workout = await getOneWorkout(id);
    if (!workout) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    const exercise = await addExercise({ name, region, reps, sets, id });
    res.status(200).json({
      status: "success",
      rows_updated: exercise,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

exports.deleteExerciseFromWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const exercise = await deleteExercise(id);
    if (!exercise) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID"
      });
    }
    res.status(200).json({
      status: "success",
      data: "The exercise was successfully removed from the workout",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};