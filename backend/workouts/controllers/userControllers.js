const {users, dir, fs} = require("../models/userModel");

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    // gali būti fail arba error
    status: "success",
    date: req.requestedTime,
    data: users,
  });
};

exports.getUser = (req, res) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
};

exports.postUser = (req, res) => {
  //   console.log(req.body);

  const newID = users[users.length - 1].id + 1;
  const newUser = {
    id: newID,
    ...req.body,
    created_at: new Date().toISOString()
  };

  users.push(newUser);

  fs.writeFile(dir, JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "Error writing file",
      });
    }

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  const userIndex = users.findIndex(user => user.id === parseInt(userId));

  if (userIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }

  users[userIndex] = { ...users[userIndex], ...updatedData,updated_at: new Date().toISOString() };

  fs.writeFile(dir, JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        message: 'Error writing file',
        
      });
    }

    res.status(200).json({
      status: 'success',
      data: users[userIndex],
      
    });
  });
};
exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users.splice(index, 1);
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
};