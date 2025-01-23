const AppError = require('../utils/appError');

const {filterProducts } = require("../models/productModel");



exports.getFilteredProducts = async (req, res, next) => {
  try {
    const filter = req.query;
    

    // If no query string, return all tours
    if (Object.keys(filter).length === 0) {
      const products = await filterProducts();
      res.status(200).json({
        status: "success",
        data: products,
      });
      return;
    }
    if (filter.price === 0) {
      throw new AppError("Invalid price", 400);
    }

    // Validate filter fields
    const allowedFields = ["name", "price", "category", "sort"];
    for (const key of Object.keys(filter)) {
      if (!allowedFields.includes(key)) {
        throw new AppError("Invalid filter field", 400);
      }
    }
//kodas kad nerodytu tuscio masyvo  jai nera filtre
    if (filter.price && (!Number(filter.price) || filter.price < 0)) {
      throw new Error("Invalid price");
    }
    const filteredProducts = await filterProducts(filter);
    if (filter.price && filteredProducts.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    res.status(200).json({ 
      status: "success", 
      data: filteredProducts });
  } catch (error) {
    next(error);
  }
};
