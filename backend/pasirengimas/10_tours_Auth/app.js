//viskas, kas susiję su express yra viename faile, šis failas labiau yra skirtas middlewares, kurios prieinamos visiems requests

const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const cookieParser = require('cookie-parser');

// create server
const app = express();

// Middleware, that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

//middleware for parsing cookies
app.use(cookieParser());

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
app.use('/api/v1/users', userRouter);

//route for all other requests that are not defined
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  //we will use centralized error handling middleware, we are creating error object and passing it to next()
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.statusCode = 404;
  // err.status = 'fail';

  // we now use our custom error class
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );

  //express automatically knows that this is error, because next() argument is error
  next(err);
});

// Centralized Error Handling Middleware, if first functions argument is error, express will know that this is error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no status is set
  const errStatus = err.status || 'error'; // Default to 'error' if no status is set
  const errMessage = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: errStatus,
    message: errMessage,
  });
});

module.exports = app;
