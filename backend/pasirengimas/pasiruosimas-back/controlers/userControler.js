const {getAllUsers, getUserById, updateUser, deleteUser} = require("../models/userModel");
const AppError = require('../utilities/appError');
const argon2 = require('argon2');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    
    
    res.status(200).json({
      //statusai gali būti success, fail arba error
      status: 'success',
      data: users,
      
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      throw new AppError('Invalid id, tour not found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    // id nurodo kurį tour keičiame
    const id = req.params.id;

    //request body nurodo į ką keičiame, kadangi metodas put, tai body atsineša visą objektą
    const newUser = req.body;
    newUser.password = await argon2.hash(newUser.password);

    const updatedUser = await updateUser(id, newUser);

    if (!updatedUser) {
      throw new AppError('Invalid id, tour not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch(error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await deleteUser(id);
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    res.status(200).json({
      status: 'success',
      data: user,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};