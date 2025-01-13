const {tours, dir, fs} = require("../models/tourModel")

exports.getAllTours = (req, res) => {
    res.status(200).json({
      // gali būti fail arba error
      status: "success",
      date: req.requestedTime,
      data: tours,
    });
  };
  
  exports.getTour = (req, res) => {
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
  
  exports.postTour = (req, res) => {
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
  
  exports.updateTour = (req, res) => {
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