exports.deleteMiddleware = (req, res, next) => {
  console.log("Delete middleware fired");
  next();
};
