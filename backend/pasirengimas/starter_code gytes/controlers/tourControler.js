const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  filterTours,
} = require('../models/tourModel');
const AppError = require('../utilities/appError');


//2. pagination and validation
exports.getAllTours = async (req, res, next) => {
  try {
    let { page, limit } = req.query;

    // Default values if not provided
    page = parseInt(page); // page
    limit = parseInt(limit); // items per page

    // Calculate offset, kiek tours praleist iki kito puslapio
    const offset = (page - 1) * limit;

    //get paginated tours
    const { tours, totalCount } = await getAllTours(limit, offset);

    if (!tours.length === 0) {
      throw new AppError('No tours found', 404);
    }

    // response format is JSend
    res.status(200).json({
      //statusai gali būti success, fail arba error
      status: 'success',
      data: tours,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

//3. filter tours using query string
exports.getFilteredTours = async (req, res, next) => {
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

// 4. get tour by id
exports.getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await getTourById(id);

    if (!tour) {
      throw new AppError('Invalid id, tour not found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};

// 8. post tour
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

// 9. update tour, method put
exports.updateTour = async (req, res) => {
  try {
    // id nurodo kurį tour keičiame
    const id = req.params.id;

    //request body nurodo į ką keičiame, kadangi metodas put, tai body atsineša visą objektą
    const newTour = req.body;

    const updatedTour = await updateTour(id, newTour);

    if (!updatedTour) {
      throw new AppError('Invalid id, tour not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: updatedTour,
    });
  } catch {
    next(error);
  }
};

