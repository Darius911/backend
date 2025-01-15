const { sql } = require("../dbConnection");

exports.getAllTours = async () => {
  const tourList = await sql`
SELECT tours.name, tours.price, categories.name as categories_name, difficulty.name as difficulty_name
    FROM tours
    JOIN difficulty ON tours.difficulty_id=difficulty.id
    JOIN categories ON tours.category_id=categories.id

`;

  

  return tourList;
};
exports.getToursByCat = async (categoryid) => {
  const tours = await sql `
  SELECT tours.name, tours.price, categories.name as categories_name, difficulty.name as difficulty_name
    FROM tours
    JOIN difficulty ON tours.difficulty_id=difficulty.id
    JOIN categories ON tours.category_id=categories.id
    WHERE tours.category_id=${categoryid}
  `;
  return tours;
};
//sql rezultatas visada masyvas
exports.getTourById = async (id) => {
  const tours = await sql`
    SELECT tours.*
    FROM tours
    WHERE tours.id = ${id}
    `;
  return tours[0];
};

exports.countToursByCat = async ()=> {
  const toursCount = await sql`
  SELECT 
  categories.name AS category, 
  COUNT(tours.id) AS totalCounts 
  FROM tours 
  JOIN categories ON tours.category_id = categories.id 
  GROUP BY categories.name
  `;
  return toursCount;
};

exports.postTour = async (tour) => {
  const columns = [
    "name",
    "description",
    "category",
    "price",
    "duration",
    "difficulty",
  ];
  const insertedTour = await sql`
    INSERT INTO tours ${sql(tour, columns)}
    RETURNING *;
    `;

  return insertedTour[0];
};

// exports.update = async (id, tour) => {
//     const columns = Object.keys(tour);

//     const newTours = await sql `
//     update tours set ${sql(tour, columns)}
//     where tours.id = ${id}
//     RETURNING *
//     `;
//     return newTours[0]
// };
exports.update = async (id, tour) => {
  const columns = Object.keys(tour);
  const values = Object.values(tour);

  const newTours = await sql`
      UPDATE tours
      SET ${sql(columns, values)}
      WHERE id = ${id}
      RETURNING *;
    `;

  return newTours[0];
};

exports.deleteTour = async (id) => {
  const deletedTours = await sql`
      DELETE FROM tours
      WHERE id = ${id}
      RETURNING *;
    `;
  return deletedTours[0];
};
exports.filterTours = async(filter) => {
const tours = await sql`
SELECT tours.*, difficulty.name as difficulty, categories.name as category
    FROM tours
    JOIN difficulty ON tours.difficulty_id = difficulty.id
    JOIN categories ON tours.category_id = categories.id
    WHERE
    tours.duration <= ${filter.duration} 
    AND difficulty.name = ${
    filter.difficulty} 
    AND tours.price <= ${filter.price}  
      
   `;
  return tours;
}
