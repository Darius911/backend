CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workouts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercises (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  region VARCHAR(50) NOT NULL,
  reps INTEGER NOT NULL,
  sets INTEGER NOT NULL,
  workout_id INTEGER REFERENCES workouts(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
//app
app.js

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api/v1', userRoutes);
app.use('/api/v1', workoutRoutes);
app.use('/api/v1', exerciseRoutes);

module.exports = app;

//server.js

server.js

const app = require('./app');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'workout_journal',
    password: 'your_db_password',
    port: 5432,
});

app.set('pool', pool);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//User Controller (controllers/userController.js)
User Controller (controllers/userController.js)

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const pool = req.app.get('pool');

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        res.status(201).json({ user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const pool = req.app.get('pool');

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ message: 'Success! You are logged in!', token, user });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//User Routes (routes/userRoutes.js)
User Routes (routes/userRoutes.js)

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;

//Workout Controller (controllers/workoutController.js)
Workout Controller (controllers/workoutController.js)

exports.getAllWorkouts = async (req, res) => {
  const pool = req.app.get('pool');

  try {
      const result = await pool.query('SELECT * FROM workouts');
      res.json(result.rows);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.addWorkout = async (req, res) => {
  const { name } = req.body;
  const userId = req.params.id;
  const pool = req.app.get('pool');

  try {
      const result = await pool.query(
          'INSERT INTO workouts (name, user_id) VALUES ($1, $2) RETURNING *',
          [name, userId]
      );
      res.status(201).json(result.rows[0]);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

//Workout Routes (routes/workoutRoutes.js)
Workout Routes (routes/workoutRoutes.js)

const express = require('express');
const workoutController = require('../controllers/workoutController');

const router = express.Router();

router.get('/workouts', workoutController.getAllWorkouts);
router.post('/users/:id/workouts', workoutController.addWorkout);

module.exports = router;

// Exercise Controller (controllers/exerciseController.js)
Exercise Controller (controllers/exerciseController.js)

exports.addExercise = async (req, res) => {
  const { name, region, reps, sets } = req.body;
  const workoutId = req.params.id;
  const pool = req.app.get('pool');

  try {
      const result = await pool.query(
          'INSERT INTO exercises (name, region, reps, sets, workout_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [name, region, reps, sets, workoutId]
      );
      res.status(201).json(result.rows[0]);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

//Exercise Routes (routes/exerciseRoutes.js)
Exercise Routes (routes/exerciseRoutes.js)

const express = require('express');
const exerciseController = require('../controllers/exerciseController');

const router = express.Router();

router.post('/workouts/:id/exercises', exerciseController.addExercise);

module.exports = router;