//viskas, kas susiję su express yra viename faile, šis failas labiau yra skirtas middlewares, kurios prieinamos visiems requests

const express = require('express');
const productRouter = require('./routes/productRoutes');
const userRouter = require("./routes/userRoutes");

// create server
const app = express();

// Middleware, that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());






// ROUTES
//naudojame Router, procesas vadinasi "mounting the router"
app.use('/api/v1/products', productRouter);

app.use('/api/v1/users', userRouter)

module.exports = app;


