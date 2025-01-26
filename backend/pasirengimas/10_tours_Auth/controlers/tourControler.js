const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  filterTours,
} = require('../models/tourModel');
const AppError = require('../utils/appError');

//1. pagination and validation
exports.getAllTours = async (req, res, next) => {
  try {
    //get paginated tours
    const tours = await getAllTours();

    // response format is JSend
    res.status(200).json({
      //statusai gali būti success, fail arba error
      status: 'success',
      requestedAt: req.requestTime,
      data: tours,
    });
  } catch (error) {
    next(error);
  }
};

//2. filter tours using query string and validation
exports.getFilteredTours = async (req, res, next) => {
  try {
    const filter = req.query;
    // console.log(filter);

    // If no query string, return all tours
    if (Object.keys(filter).length === 0) {
      const tours = await getAllTours();
      res.status(200).json({
        status: 'success',
        data: tours,
      });
      return;
    }

    // If query string, return filtered tours
    const filteredTours = await filterTours(filter);

    res.status(200).json({
      status: 'success',
      data: filteredTours,
    });
  } catch (error) {
    next(error);
  }
};

// 3. get tour by id and validation
exports.getTourById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tour = await getTourById(id);

    if (!tour) {
      // res.status(404).json({
      //   status: 'fail',
      //   message: 'Tour not found',
      // });
      // return;
      throw new AppError('Tour not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};

// 4. post tour
exports.createTour = async (req, res, next) => {
  try {
    const newTour = req.body;

    const createdTour = await createTour(newTour);

    res.status(201).json({
      status: 'success',
      data: createdTour,
    });
  } catch (error) {
    next(error);
  }
};

// 5. update tour, method put
exports.updateTour = async (req, res, next) => {
  try {
    // id nurodo kurį tour keičiame
    const id = req.params.id;

    //request body nurodo į ką keičiame, kadangi metodas put, tai body atsineša visą objektą
    const newTour = req.body;

    if (!newTour || !newTour.name || !newTour.duration || !newTour.price) {
      // res.status(400).json({
      //   status: 'fail',
      //   message: 'Missing required fields: name, duration, or price',
      // });
      // return;

      throw new AppError(
        'Missing required fields: name, duration, or price',
        400
      );
    }

    const updatedTour = await updateTour(id, newTour);

    if (!updatedTour) {
      // res.status(404).json({
      //   status: 'fail',
      //   message: 'Invalid id, tour not found and not updated',
      // });
      // return;

      throw new AppError('Invalid id, tour not found and not updated', 404);
    }

    res.status(200).json({
      status: 'success',
      data: updatedTour,
    });
  } catch (error) {
    next(error);
  }
};
