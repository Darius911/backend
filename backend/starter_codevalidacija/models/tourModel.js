const { sql } = require('../dbConnection');

exports.getAllTours = async (limit, offset) => {
  const tours = await sql`
  SELECT tours.* 
    FROM tours
    
    ORDER BY tours.id ASC
     ${
       !isNaN(limit) && !isNaN(offset)
       ?sql`LIMIT ${limit} OFFSET ${offset}`
       :sql``
     }  
    `;
  // he query will not guarantee that the results are returned in table order unless an explicit ORDER BY clause is included.
  const total = await sql`
      SELECT COUNT(*)::int AS count 
      FROM tours
    `;

  return { tours, totalCount: total[0].count };
};

//filter tours using query string
exports.filterTours = async (filter) => {
  // filter = { duration: '5', difficulty: 'easy', price: '100', sort: 'asc' }

  // Validate filter values to prevent SQL injection
  const validDirections = ['ASC', 'DESC'];
  const sortDirection = validDirections.includes(filter.sort.toUpperCase())
    ? filter.sort.toUpperCase()
    : 'ASC';

  const tours = await sql`
  SELECT tours.*, tours.difficulty , tours.category 
    FROM tours
    
    WHERE 
    tours.duration <= ${filter.duration} AND tours.difficulty = ${
    filter.difficulty
  } AND tours.price <= ${filter.price}   
     
      ORDER BY tours.price ${sql.unsafe(sortDirection)}  
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
      'description',
      'category',
      'duration',
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
//testas neveiks
exports.getDifificultyById = (id) => {
  const difficulties = sql`
  select * 
  from difficulty 
  where id = ${id};

  `
  return difficulties[0];
};



