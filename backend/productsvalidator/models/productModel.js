const { sql } = require("../dbConnection");

exports.getAllProducts = async () => {
  const productsList = await sql`
 SELECT *
 FROM products
 `;

  return productsList;
};
//http://localhost:3001/api/v1/products?price=1000&category=kepiniai postman http