const { sql } = require("../dbConnection");

exports.postUser = async ({ username, password, email }) => {
   const users = await sql`
    INSERT INTO users (username, password, email)
    VALUES (${username}, ${password}, ${email})
    RETURNING *`;
   return users[0];
};

exports.logIn = async ({ username, password, email }) => {
   const users = await sql`
SELECT users.id, users.username, users.email, users.created_at, users.updated_at, ARRAY_AGG(workouts.name) as workouts
FROM users
JOIN workouts ON users.id = workouts.user_id
WHERE username=${username} AND password=${password}
GROUP BY users.id`;
   return users[0]
}

exports.getAll = async () => {
   const userList = await sql`
    SELECT users.id, users.username, users.email, users.created_at, users.updated_at
    FROM users`;
   return userList;
}

exports.getOne = async (id) => {

   const users = await sql` 
    SELECT 
      users.id,
      users.username,
      users.email,
      users.created_at,
      users.updated_at,
      workouts.id AS workout_id,
      workouts.name,
      COUNT(workout_exercises.exercise_id) AS exercise_count
    FROM users
    LEFT JOIN workouts ON users.id = workouts.user_id
    LEFT JOIN workout_exercises ON workouts.id = workout_exercises.workout_id
    WHERE users.id = ${id}
    GROUP BY users.id, workouts.id`

   const user = {
      id: users[0]?.id,
      username: users[0]?.username,
      email: users[0]?.email,
      created_at: users[0]?.created_at,
      updated_at: users[0]?.updated_at,
      workouts: users.map(workout => ({
         id: workout.workout_id,
         workout_name: workout.name,
         exercises: workout.exercise_count
      })).filter(workout => workout.workout_name !== undefined && workout.workout_name !== null)
   };

   return user;
}


exports.getUserByName = async (username) => {
   const users = await sql`
SELECT 
      users.id,
      users.username,
      users.email,
      users.created_at,
      users.updated_at,
      workouts.id AS workout_id,
      workouts.name,
      COUNT(workout_exercises.exercise_id) AS exercise_count
    FROM users
    LEFT JOIN workouts ON users.id = workouts.user_id
    LEFT JOIN workout_exercises ON workouts.id = workout_exercises.workout_id
WHERE users.username = ${username}
GROUP BY users.id, workouts.id
`

   if (users.length === 0) { return null; }

   const user = {
      id: users[0]?.id,
      username: users[0]?.username,
      email: users[0]?.email,
      created_at: users[0]?.created_at,
      updated_at: users[0]?.updated_at,
      workouts: users.map(workout => ({
         id: workout.workout_id,
         workout_name: workout.name,
         exercises: workout.exercise_count
      })).filter(workout => workout.workout_name !== undefined && workout.workout_name !== null)
   };
   return user;
}

exports.getUserWorkouts = async (id) => {
   const users = await sql`
   SELECT 
     workouts.id AS workout_id, 
     workouts.name AS workout_name, 
     users.id AS user_id, 
     users.username, 
     workout_exercises.id AS user_exercise_id, 
     exercises.id AS exercise_id, 
     exercises.name AS exercise_name, 
     exercises.region, 
     exercises.sets, 
     exercises.reps
   FROM users
   LEFT JOIN workouts ON users.id = workouts.user_id
   LEFT JOIN workout_exercises ON workouts.id = workout_exercises.workout_id
   LEFT JOIN exercises ON exercises.id = workout_exercises.exercise_id
   WHERE users.id = ${id}
 `;


   if (users.length === 0) {
      return null;
   }


   const user = {
      workout_id: users[0]?.workout_id,
      workout_name: users[0]?.workout_name,
      user_id: users[0]?.user_id,
      username: users[0]?.username,
      exercises: users.map(exercise => ({
         user_exercise_id: exercise.user_exercise_id,
         exercise_id: exercise.exercise_id,
         exercise_name: exercise.exercise_name,
         region: exercise.region,
         sets: exercise.sets,
         reps: exercise.reps,
      })).filter(exercise => exercise.exercise_name)
   };

   return user;
};

exports.addWorkout = async ({ name, id }) => {
   const workouts = await sql`
    INSERT INTO workouts (name, user_id)
    VALUES (${name}, ${id})
    RETURNING id`;
   return [workouts[0].id];
};

exports.getAllWork = async () => {
   const workoutList = await sql`
    SELECT workouts.id, workouts.name, workouts.date, workouts.user_id
    FROM workouts`;
   return workoutList;
}

exports.getOneWorkout = async (id) => {

   const workouts = await sql` 
    SELECT 
      workouts.id AS workout_id,
      workouts.name AS workout_name,
      workout_exercises.id AS user_exercise_id,
      exercises.id AS exercise_id,
      exercises.name AS exercise_name,
      exercises.region,
      exercises.sets,
      exercises.reps
    FROM workouts
    
    LEFT JOIN workout_exercises ON workouts.id = workout_exercises.workout_id
    LEFT JOIN exercises ON exercises.id = workout_exercises.exercise_id
    WHERE workouts.id = ${id}
    `
   if (workouts.length === 0) { return null; }

   const workout = {
      workout_id: workouts[0]?.workout_id,
      workout_name: workouts[0]?.workout_name,

      exercises: workouts.map(exercise => ({
         user_exercise_id: exercise.user_exercise_id,
         exercise_id: exercise.exercise_id,
         exercise_name: exercise.exercise_name,
         region: exercise.region,
         sets: exercise.sets,
         reps: exercise.reps,
      })).filter(exercise => exercise.exercise_name)
   };

   return workout;
}

exports.edit = async (id, workout) => {
   const columns = Object.keys(workout);

   const newWorkouts = await sql`
   update workouts set ${sql(workout, columns)}
   where workouts.id = ${id}
   RETURNING *`;

   return newWorkouts.length;
};

exports.deleteWorkout = async (id) => {
   const workouts = await sql`
   DELETE FROM workouts
   WHERE workouts.id = ${id}
   RETURNING *`;
   return workouts[0];
};

exports.addExercise = async ({ name, region, reps, sets, id }) => {

   const result = await sql.begin(async (sql) => {
      const exercise = await sql`
       INSERT INTO exercises (name, region, reps, sets)
       VALUES (${name}, ${region}, ${reps}, ${sets})
       
       RETURNING id`;
      const exercise_id = exercise[0]?.id;


      const tablesLink = await sql`
       INSERT INTO workout_exercises (exercise_id, workout_id)
       VALUES (${exercise_id}, ${id})
 
       RETURNING *`;

      return tablesLink;
   });

   return result.length;
};

exports.deleteExercise = async (exercise_id) => {
   const exercises = await sql`
   DELETE FROM workout_exercises
   WHERE exercise_id = ${exercise_id}
   RETURNING *`;
   return exercises[0];
};