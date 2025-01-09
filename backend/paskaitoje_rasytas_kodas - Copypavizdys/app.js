const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

//load env variables
dotenv.config();
const port = process.env.PORT;
const dir = path.join(__dirname, "/data/tours-simple.json");

//create server
const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(dir));
// console.log(tours);

//middlewares ********************************
const sayHello = (req, res, next) => {
  console.log("Hello from middleware!🖐️");
  next();
};

const addRequestedDate = (req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
};

const deleteMidleware = (req, res, next) => {
  console.log("Post middleware fired");
  next();
};
// **********************************************

//controllers ************************************
const getAllTours = (req, res) => {
  res.status(200).json({
    // gali būti fail arba error
    status: "success",
    date: req.requestedTime,
    data: tours,
  });
};

const getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: tour,
  });
};

const postTour = (req, res) => {
  //   console.log(req.body);

  const newID = tours[tours.length - 1].id + 1;
  const newTour = {
    id: newID,
    ...req.body,
  };

  tours.push(newTour);

  fs.writeFile(dir, JSON.stringify(tours), (err) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "Error writing file",
      });
    }

    res.status(201).json({
      status: "success",
      data: newTour,
    });
  });
};

const updateTour = (req, res) => {
  const id = +req.params.id;

  if (id > tours.length) {
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  const newTour = req.body;

  res.status(200).json({
    status: "success",
    data: `Tour updated, Id: ${id}`,
  });
};
// ************************************************

app.use(sayHello, addRequestedDate);
// app.use(addRequestedDate);

// app.route("/api/v1/tours").get(getAllTours).post(deleteMidleware, postTour);
// app.route("/api/v1/tours/:id").get(getTour).patch(updateTour);

//ROUTES
//sukuriame routa
const tourRouter = express.Router();
//aprasome routus ir pridedame kokie metodai reaguos i juos
tourRouter.route("/").get(getAllTours).post(deleteMidleware, postTour);
tourRouter.route("/:id").get(getTour).patch(updateTour);

app.use("/api/v1/tours", tourRouter);


app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
