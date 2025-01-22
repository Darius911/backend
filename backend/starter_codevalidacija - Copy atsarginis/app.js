//viskas, kas susiję su express yra viename faile, šis failas labiau yra skirtas middlewares, kurios prieinamos visiems requests

const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/appError');
// create server
const app = express();

// Middleware, that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

//our custom middlewares, working for any request
app.use((req, res, next) => {
  console.log('Hello from the middleware for any route');

  //jei nerarašysime next(), request response cycle sustos ir mes neprieisime prie router handlerio ir response neišsisiųs
  next();
});

//we add request time on every request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
//naudojame tourRouter, procesas vadinasi "mounting the router"
app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
  // const error = new Error("Not found");
  // error.status = "fail";
  // error.statusCode = 404;
  // next(error);

  const error = new AppError(
    "not found", 404);

  next(error);
});

//eina po routu
app.use(errorHandler);



module.exports = app;
