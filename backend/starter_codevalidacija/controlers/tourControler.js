const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  filterTours,
  postNewTour
} = require('../models/tourModel');


//2. pagination and validation
exports.getAllTours = async (req, res) => {
  try {
    let { page, limit } = req.query;

    // Default values if not provided
    page = parseInt(page); // page
    limit = parseInt(limit); // items per page

    // Calculate offset, kiek tours praleist iki kito puslapio
    const offset = (page - 1) * limit;

    // Validate inputs (optional but recommended)
    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Invalid page or limit value' });
    }

    //get paginated tours
    const { tours, totalCount } = await getAllTours(limit, offset);

    if (!tours.length === 0) {
      res.status(404).json({
        status: 'fail',
        message: 'No tours found',
      });
      return;
    }

    // response format is JSend
    res.status(200).json({
      //statusai gali būti success, fail arba error
      status: 'success',
      requestedAt: req.requestTime,
      data: tours,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//3. filter tours using query string
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
    // const validDifficulties = ['Easy', 'Medium', 'Hard'];
    // if (!validDifficulties.includes(filter.difficulty)) {
    //   throw new Error('Invalid difficulty');
    // }

     
 

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

// 4. get tour by id
exports.getTourById = async (req, res) => {
  try {
    const { id } = req.params;


    const tour = await getTourById(id);

    if (!tour) {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid id, tour not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// 8. post tour
exports.createTour = async (req, res) => {
  try {
    const newTour = req.body;

    if (!newTour || !newTour.name || !newTour.duration || !newTour.price) {
      res.status(400).json({
        status: 'fail',
        message:
          'Missing tour information, or its required fields: name, duration, or price',
      });
      return;
    }

    const createdTour = await createTour(newTour);

    res.status(201).json({
      status: 'success',
      data: createdTour,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// 9. update tour, method put
exports.updateTour = async (req, res) => {
  try {
    // id nurodo kurį tour keičiame
    const id = req.params.id;

    //request body nurodo į ką keičiame, kadangi metodas put, tai body atsineša visą objektą
    const newTour = req.body;

    if (!newTour || !newTour.name || !newTour.duration || !newTour.price) {
      res.status(400).json({
        status: 'fail',
        message: 'Missing required fields: name, duration, or price',
      });
      return;
    }

    const updatedTour = await updateTour(id, newTour);

    if (!updatedTour) {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid id, tour not found and not updated',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: updatedTour,
    });
  } catch {
    res.status(500).send(error.message);
  }
};

//neveiks

exports.postNewTour = async (req, res) => {
  try {
    const newTour = req.body;
    const createdTour = await createTour(newTour);
    res.status(201).json({
      status: 'success',
      data: createdTour,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

