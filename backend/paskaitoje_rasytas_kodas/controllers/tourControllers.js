const { getAllTours, getTourById, postTour, update, deleteTour, getToursByCat,countToursByCat, filterTours } = require("../models/tourModel");
// is tour models
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

exports.getToursByCategotyId = async (req, res) => {
  try{ 
  const {categoryid} = req.params;
  if(!categoryid || isNaN(categoryid)){
  return res.status(400).json({
    status :"Fail",
    message: "Invalid or missing ID"
  });
}

const tours = await getToursByCat(categoryid);
res.status(200).json({
  status: "success",
  data : tours
});
  } catch (error) {
    res.status(500).json({
      status : "fail",
      message : error.message,
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

// exports.updateTour = async (req, res) => {
//   const {id} = req.params;
//   const tour = req.body;
//   const newTour = await update(id,tour);
//   res.status(200).json({
//     status:"success",
//     data: newTour,
//   });
// };

exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = req.body;
    const newTour = await update(id, tour);
    if (!newTour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: newTour,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};


exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTour = await deleteTour(id);
    if (!deletedTour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getToursCountByCategory = async (req, res) => {
  try {
    const tours = await countToursByCat();
    res.status(200).json({
      status: "success",
      CountedTours: tours
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message
    });
  }
};

exports.getFilteredTours = async (req, res) => {
  try {
    const filter = req.query;
    const filteredTours = filterTours(filter)
    console.log(filteredTours);
    
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: err.message
    });
  }
}


