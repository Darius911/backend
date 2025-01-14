exports.sayHello = (req, res, next) => {
  console.log("Hello from middleware!");
  next();
};

exports.addRequestedDate = (req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
};
