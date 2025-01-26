const { sql } = require('../dbConnection');

exports.getAllTours = async () => {
  const tours = await sql`
  SELECT tours.*, difficulty.name as difficulty, categories.title as category 
    FROM tours
    JOIN difficulty ON tours.difficulty = difficulty.id
    JOIN categories ON tours.category = categories.id
    ORDER BY tours.id ASC;
    
    `;
  return tours;
};

//filter tours using query string
exports.filterTours = async (filter) => {
  // filter = { duration: '5', difficulty: 'easy', price: '100', sort: 'asc' }

  const tours = await sql`
  SELECT tours.*, difficulty.name as difficulty, categories.title as category
    FROM tours
    JOIN difficulty ON tours.difficulty = difficulty.id
    JOIN categories ON tours.category = categories.id
    WHERE 
    tours.duration <= ${filter.duration} AND difficulty.name = ${
    filter.difficulty
  } AND tours.price <= ${filter.price}   
     
      ORDER BY tours.price ${sql.unsafe(filter.sort)};  
   `;
  //DESC and ASC is numeric value, so we need to multiply by 1 to convert it to number
  return tours;
};

exports.getTourById = async (id) => {
  const tours = await sql`
  SELECT tours.*, difficulty.name as difficulty 
    FROM tours
    JOIN difficulty ON tours.difficulty = difficulty.id
    WHERE tours.id = ${id};
    `;
  return tours[0]; //tour is an array, so we need to return the first element
};

exports.createTour = async (newTour) => {
  const tours = await sql`
    INSERT INTO tours ${sql(
      newTour,
      'name',
      'duration',
      'maxgroupsize',
      'price',
      'difficulty'
    )}
       RETURNING *;
    `;
  return tours[0];
};

exports.updateTour = async (id, updatedTour) => {
  const tours = await sql`
  update tours set ${sql(
    updatedTour,
    'name',
    'duration',
    'maxgroupsize',
    'price',
    'difficulty',
    'category'
  )}
  where id = ${id}
  returning *;
`;
  return tours[0];
};
