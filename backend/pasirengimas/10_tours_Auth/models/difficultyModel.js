const { sql } = require('../dbConnection');

exports.getDifficultyById = async (id) => {
  const difficulties = await sql`
    SELECT id 
    FROM difficulty
    WHERE difficulty.id = ${id};
`;
  return difficulties[0]; //difficulties is an array, so we need to return the first element
};
