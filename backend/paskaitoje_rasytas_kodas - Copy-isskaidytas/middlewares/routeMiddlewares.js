exports.deleteMidleware = (req, res, next) => {
    console.log("Post middleware fired");
    next();
  };