const { getAllToursModel, createTourModel, updateTourModel, deleteTourModel } = require('../models/tourModel');
const AppError = require('../utilities/appError');

exports.getAllTours = async (req, res, next) => {
    try {
      const tours = await getAllToursModel();
      
      
      res.status(200).json({
       
        status: 'success',
        data: tours,
        
      });
    } catch (error) {
      next(error);
    }
  };

  exports.createTour = async (req, res, next) => {
    try {
        console.log(req.user); 
        if (req.user.role !== 'admin') {
            return res.status(403).json({
              status: 'fail',
              
              message: 'You do not have permission to create a tour.',
            });
           
            
          }    

      const newTour = { ...req.body};
      newTour.created_by = req.user.id;
      
      
      
      console.log(newTour);

      const createdTour = await createTourModel(newTour);
      
      console.log(createdTour);
  
      res.status(201).json({
        status: 'success',
        data: createdTour,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.updateTour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newTour = req.body;

        

        

        // Tikriname, ar vartotojas yra adminas
        const isAdmin = req.user.role === "admin";

       // Tikriname, ar vartotojas yra adminas
        const updatedTour = await updateTourModel(id, newTour, isAdmin ? null : req.user.id);

        

        res.status(200).json({
            status: "success",
            data: updatedTour,
        });
    } catch (error) {
        next(error);
    }
};


exports.deleteTour = async (req, res, next) => {
  const { id } = req.params;

  try {
    const tour = await deleteTourModel(id);

    if (!tour) {
      throw new AppError('Tour not found', 404);  // If no tour is returned, send a 404 error
    }

    res.status(200).json({
      status: 'success',
      data: tour,  // You can return 'tour' or a success message
      message: 'Tour deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};