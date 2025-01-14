const {
  getAllTours,
  getTourById,
  postTour,
  deleteTour,
  update,
  getToursByCat,
  countToursByCat,
  showToursByCatDiff,
  filterTours
} = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    const tours = await getAllTours();
    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getToursByCategoryId = async (req, res) => {
  try {
    const { categoryid } = req.params;
    if (!categoryid || isNaN(categoryid)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid or missing ID",
      });
    }
    const tours = await getToursByCat(categoryid);

    if (!tours || tours.length <= 0) {
      return res.status(404).json({
        status: "fail",
        message: "Category does not exist",
      });
    }

    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.countToursByCategory = async (req, res) => {
  try {
    const tours = await countToursByCat();
    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.showToursByCategoryDifficulty = async (req, res) => {
  try {
    const { category, difficulty } = req.params;
    const tours = await showToursByCatDiff(category, difficulty);
    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getTour = async (req, res) => {
  const { id } = req.params;
  const tour = await getTourById(id);
  try {
    if (!tour) {
      res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.postTour = async (req, res) => {
  const tour = req.body;

  try {
    const newTour = await postTour(tour);
    console.log(newTour);
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

// patch
exports.updateTour = async (req, res) => {
  const { id } = req.params;
  const tour = req.body;
  try {
    const updateTour = await update(id, tour);

    console.log(updateTour);
    res.status(200).json({
      status: "success",
      data: updateTour,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    const tour = await deleteTour(id);
    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// exports.getFilteredTours = async (req, res) => {
//   try {
//     const filter = req.query;
//     const filteredTours =  await filterTours(filter);
//     res.status(200).json({
//       status: "success",
//       data: filteredTours,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };



//2. filter tours using query string
exports.getFilteredTours = async (req, res) => {
  try {
    const filter = req.query;
    console.log(filter);

    // If no query string, return all tours
    if (Object.keys(filter).length === 0) {
      const tours = await getAllTours();
      res.status(200).json({
        status: 'success',
        data: tours,
      });
      return;
    }

    // Validate filter fields
    const allowedFields = ['duration', 'difficulty', 'price', 'sort'];
    for (const key of Object.keys(filter)) {
      if (!allowedFields.includes(key)) {
        return res.status(400).json({
          status: 'fail',
          message: `Invalid filter field: '${key}'. Allowed fields are: ${allowedFields.join(
            ', '
          )}`,
        });
      }
    }

    // Validate numeric parameters
    if (!Number(filter.duration) || filter.duration < 0) {
      throw new Error('Invalid duration');
    }
    if (!Number(filter.price) || filter.price < 0) {
      throw new Error('Invalid price');
    }

    // Validate difficulty against allowed values
    const validDifficulties = ['Easy', 'Medium', 'Moderate', 'Hard'];
    if (!validDifficulties.includes(filter.difficulty)) {
      throw new Error('Invalid difficulty');
    }

    // If query string, return filtered tours
    const filteredTours = await filterTours(filter);

    res.status(200).json({
      status: 'success',
      data: filteredTours,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};