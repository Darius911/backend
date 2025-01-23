const { sql } = require("../dbConnection");

exports.getAllProducts = async () => {
  const productsList = await sql`
 SELECT *
 FROM products
 `;

  return productsList;
};
//http://localhost:3001/api/v1/products?price=1000&category=kepiniai postman http

exports.filterProducts = async (filter) => {
  

  // Validate filter values to prevent SQL injection
  const validDirections = ['ASC', 'DESC'];
  const sortDirection = validDirections.includes(filter.sort.toUpperCase())
    ? filter.sort.toUpperCase()
    : 'ASC';

  const products = await sql`
  SELECT products.*
    FROM products
    
    WHERE 
    products.category = ${filter.category}
    AND products.price <= ${filter.price}   
     
      ORDER BY products.price ${sql.unsafe(sortDirection)}  
   `;
  //DESC and ASC is numeric value, so we need to multiply by 1 to convert it to number
  return products;
};