const {getAllUsers, postUser, update} = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
    try {
      const users = await getAllUsers();
      // console.log(users);
      
        
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
  };

  //post user
  

  

exports.postUser = async (req, res) =>{
    const {username, password, email,} = req.body;
   
   
   
    try {
      if (!username || username.length<4){
        return res.status(400).json({
          status: "fail",
          message: "Username is required and must be at least 4 characters"
        })
      }
      if(!password || password.length<4){
        return res.status(400).json({
          status: "fail",
          message: "Password is required and must be at least 4 characters"
        })
      }
 
      const emailRgx = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/
 
      if(!email || !emailRgx.test(email)){
        return res.status(400).json({
          status: "fail",
          message: "Invalid email adress"
        })
      }
        const newUser = await postUser({username,password,email});
       
        res.status(200).json({
          status: "success",
          data: {...newUser,created_at: new Date().toISOString()},
          
        });
      } catch (error) {
        res.status(500).json({
          status: "fail",
          message: error.message,
        });
      }
};

// patch
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    const updateUser = await update(id, user);

    console.log(updateUser);
    res.status(200).json({
      status: "success",
      data: {...updateUser, updated_at: new Date().toISOString()},
      
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};