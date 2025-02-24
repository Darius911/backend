const { sql }  = require('../dbConnection');


exports.getAllToursModel = async () => {
  const tours = await sql`
    SELECT 
      tours.*, 
      array_agg(tour_dates.date) AS tour_dates,
      AVG(reviews.rating) AS average_rating  
    FROM tours
    JOIN tour_dates ON tours.id = tour_dates.tour_id
    LEFT JOIN reviews ON tours.id = reviews.tour_id  
    GROUP BY tours.id
  `;
  
  return tours;
};


  exports.createTourModel = async (newTour) => {
    // Įrašome ekskursiją į 'tours' lentelę
    const tours = await sql`
      INSERT INTO tours ${sql(
        newTour,
        'title',
        'description',
        'image_url',
        'duration',
        'price',
        'category',
        'created_by',
      )}
      RETURNING *;
    `;
    
    const tour = tours[0]; // Paimame sukurtą ekskursiją
  
    // Sukuriame masyvą, kuriame bus saugomos įrašytos datos
    let createdTourDates = [];
  
    // Jei 'newTour.date' yra masyvas su datomis
    if (Array.isArray(newTour.date)) {
      for (let i = 0; i < newTour.date.length; i++) {
        const createdDate = await sql`
          INSERT INTO tour_dates (tour_id, date)
          VALUES (${tour.id}, ${newTour.date[i]})
          RETURNING *;
        `;
        createdTourDates.push(createdDate[0]); // Pridedame sukurtą datą į masyvą
      }
    } else {
      // Jei 'newTour.date' yra viena data
      const createdDate = await sql`
        INSERT INTO tour_dates (tour_id, date)
        VALUES (${tour.id}, ${newTour.date})
        RETURNING *;
      `;
      createdTourDates.push(createdDate[0]); // Pridedame sukurtą datą į masyvą
    }

    const createRating = await sql`
  INSERT INTO reviews (tour_id, rating)
  VALUES (${tour.id}, 0)  
  RETURNING *;
`;

  
    // Grąžiname visą sukurtą ekskursiją ir visas sukurtas datas
    return {
      ...tour, // Sukurtos ekskursijos duomenys
      tour_dates: createdTourDates, // Sukurtos datos, kurios yra susijusios su ekskursija
      review: createRating[0]
    };
  };

  // exports.updateTourModel = async (id, updatedTour) => {
  //   // Update users table
  //   const tours = await sql`
  //     UPDATE tours SET ${sql(
  //       updatedTour,
  //       'title',
  //       'description',
  //       'image_url',
  //       'duration',
  //       'price',
  //       'category',
  //       'created_by',
  //     )}
  //     WHERE id = ${id}
  //     RETURNING *;
  //   `;
    
  //   const tour = tours[0];
  
  //   // Update tour_dates table
  //   if (updatedTour.date) {
  //     await sql`
  //       UPDATE tour_dates SET date = ${updatedTour.date}
  //       WHERE tour_id = ${id}
  //       RETURNING *;
  //     `;
  //   }
  
  //   return {
  //     ...tour,
  //     tour_dates: updatedTour.date
  //   }
  // };

  exports.updateTourModel = async (id, updatedTour) => {
    // Update tours table
    const tours = await sql`
      UPDATE tours 
      SET ${sql(updatedTour, 'title', 'description', 'image_url', 'duration', 'price', 'category', 'created_by')}
      WHERE id = ${id}
      RETURNING *;
    `;
    
    const tour = tours[0];
  
    // Update tour_dates table if multiple dates are provided
    let updatedTourDates = [];

    if (updatedTour.date) {
        // If multiple dates are provided (array)
        if (Array.isArray(updatedTour.date)) {
            // Delete existing dates for the tour (optional, based on your needs)
            await sql`
                DELETE FROM tour_dates WHERE tour_id = ${id};
            `;
            
            // Insert each date into the tour_dates table
            for (let i = 0; i < updatedTour.date.length; i++) {
                const date = updatedTour.date[i];
                const createdDate = await sql`
                    INSERT INTO tour_dates (tour_id, date)
                    VALUES (${id}, ${date})
                    RETURNING *;
                `;
                updatedTourDates.push(createdDate[0]);
            }
        } else {
            // If a single date is provided, update the tour_dates table
            const updatedDate = await sql`
                UPDATE tour_dates
                SET date = ${updatedTour.date}
                WHERE tour_id = ${id}
                RETURNING *;
            `;
            updatedTourDates.push(updatedDate[0]);
        }
    }

    // Return the updated tour along with the updated tour dates
    return {
        ...tour,
        tour_dates: updatedTourDates,
    };
};

exports.deleteTourModel = async (id) => {
  // Delete the tour and return the deleted row if possible
  const deletedTour = await sql`
    DELETE FROM tours
    WHERE id = ${id}
    RETURNING *;  
  `;

  return deletedTour[0]; // If there is no tour deleted, this will return undefined
};





  
  

  

  