const { getAllTours, getTourById, postTour, update } = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    const tours = await getAllTours();
    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await getTourById(id);
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
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.postTour =async (req, res) => {
  // console.log(req.body);
  try {
  const tour = req.body;
  const newTour = await postTour(tour);
  res.status(200).json({
  status: "success",
  data: newTour,
  });
  
  } catch (err) {
  res.status(500).json({
  status: "fail",
  message: err.message,
  });
}
};

exports.updateTour = async (req, res) => {
  const {id} = req.params;
  const tour = req.body;
  const newTour = await update(id,tour);
  res.status(200).json({
    status:"success",
    data: newTour,
  });
};



