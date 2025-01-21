const {
  getAllProducts
  
} = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json({
      status: "success",
      data: products,
      message: 'Products retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
