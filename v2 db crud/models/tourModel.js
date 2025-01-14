const { sql } = require("../dbConnection");

exports.getAllTours = async () => {
  const tourList = await sql`
 SELECT tours.id, tours.name as tour_name, tours.price, categories.name as category, difficulty.name as difficulty
 FROM tours
 JOIN difficulty ON tours.difficulty_id = difficulty.id 
 JOIN categories ON tours.category_id = categories.id`;

  return tourList;
};

exports.getToursByCat = async (categoryid) => {
  const tours = await sql`
 SELECT tours.name as tour_name, tours.price, categories.name as category, difficulty.name as difficulty
 FROM tours
 JOIN difficulty ON tours.difficulty_id = difficulty.id 
 JOIN categories ON tours.category_id = categories.id
 WHERE tours.category_id = ${categoryid}`;
  return tours;
};

exports.countToursByCat = async () => {
  const tours = await sql`
  SELECT categories.name as category, 
  COUNT(tours.id) AS totalCounts
  FROM tours
  JOIN categories ON tours.category_id = categories.id
  GROUP BY categories.name
  `;
  return tours;
};
exports.showToursByCatDiff = async (category, difficulty) => {
  const tours = await sql`
SELECT tours.name AS tour
  FROM tours
  JOIN categories ON tours.category_id = categories.id
  JOIN difficulty ON tours.difficulty_id = difficulty.id
  WHERE categories.name = ${category} AND difficulty.name = ${difficulty}

  `;
  return tours;
};

exports.getTourById = async (id) => {
  const tours = await sql`
   SELECT tours.*
   FROM tours
   WHERE tours.id = ${id}`;
  //  tours is array
  return tours[0];
};

exports.postTour = async ({
  name,
  description,
  category,
  price,
  duration,
  difficulty,
}) => {
  const tours = await sql`
  INSERT INTO tours (name, description, category, price, duration, difficulty)
  VALUES (${name}, ${description}, ${category}, ${price}, ${duration}, ${difficulty} )
  RETURNING *`;
  return tours[0];
};

exports.deleteTour = async (id) => {
  const tours = await sql`
  DELETE FROM tours
  WHERE tours.id = ${id}
  RETURNING *`;
  return tours[0];
};

exports.update = async (id, tour) => {
  const columns = Object.keys(tour);

  const newTours = await sql`
  update tours set ${sql(tour, columns)}
  where tours.id = ${id}
  RETURNING *`;

  return newTours[0];
};

exports.filterTours = async (filter) => {
  const tours =
    await sql`SELECT tours.*, difficulty.name as difficulty, categories.name as category
  FROM tours
  JOIN categories ON tours.category_id = categories.id
  JOIN difficulty ON tours.difficulty_id = difficulty.id
  WHERE
  tours.duration <= ${filter.duration} AND difficulty.name = ${filter.difficulty} AND tours.price <= ${filter.price}  
   
     `;
     return tours;
};
