
const {sql} = require("../dbConnection");

exports.getAllTours = async() =>{
const tourList = await sql `
SELECT tours.*
FROM tours
`;



return tourList;
};
//sql rezultatas visada masyvas
exports.getTourById = async (id) => {
    const tours = await sql `
    SELECT tours.*
    FROM tours
    WHERE tours.id = ${id}
    `;
    return tours[0]
};

exports.postTour = async (tour) => {
    const columns = [
    'name',
    'description',
    'category',
    'price',
    'duration',
    'difficulty',
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