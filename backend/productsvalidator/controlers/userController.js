const {createUser, getUserById} = require('../models/userModel');

exports.createUser = async (req, res) => {
  //sitas eina i routus
  try {
    const newUser = req.body;

    if (!newUser || !newUser.email || !newUser.password || !newUser.age) {
      res.status(400).json({
        status: 'fail',
        message:
          'Missing  information, or its required fields: email, password, or age',
      });
      return;
    }

    const createdUser = await createUser(newUser);
    //sitas ateina is model
    res.status(201).json({
      status: 'success',
      data: createdUser,
      message: 'User registered successfully', 
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;


    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid id, user not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: user,
      message: 'User details retrieved successfully',
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};