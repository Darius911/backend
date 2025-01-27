

const express = require('express');

const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utilities/appError');
const userRouter = require('./routes/userRoutes');
const authorRouter = require('./routes/authorRoutes');
const bookRouter = require('./routes/bookRoutes');
const cookieParser = require('cookie-parser');

// create server
const app = express();

// Middleware, that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());


//Middleware for cookies parsing
app.use(cookieParser());




// ROUTES
//naudojame tourRouter, procesas vadinasi "mounting the router"

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/authors', authorRouter);
app.use('/api/v1/books', bookRouter);

app.all('*', (req, res, next) => {
  
  const error = new AppError(`Not found - ${req.originalUrl}`, 404);
  next(error);
});


app.use(errorHandler);

module.exports = app;


