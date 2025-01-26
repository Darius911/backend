<div id="top"></div>

# Workout Journal - Back End

**Project Objective:** The Workout Journal aims to give the users the ability to track, and monitor, their progress in the gym. Users can create an account, add workouts, and perform CRUD operations to view, add, edit,

# Optional Features

Allow users add, delete exercises for each workout.

**Technologies Used:**

- Node.js
- Express.js
- PostgreSQL

### Endpoints:

**Registration and Login endpoints:**

| Requests                                  | Endpoints             |
| ----------------------------------------- | --------------------- |
 <a href="#register">POST Registration</a> | /api/v1/register |
| <a href="#login">POST Login</a>           | /api/v1/login    |

**Users, Workouts and Exercises endpoints:**
| Requests                                                                        | Endpoints                                  |
| ------------------------------------------------------------------------------- | ------------------------------------------ |
| <a href="#users">GET Users</a>                                                  | /api/v1/users                              |
| <a href="#userID">GET User By ID</a>                                            | /api/v1/users/:id                          |
| <a href="#username">GET User By Username</a>                                    | /api/v1/users/:username                    |
| <a href="#user">GET User Profile</a>                                            | /api/v1/users/profile                      |
| <a href="#userWorkouts">GET User's workouts</a>                                 | /api/v1/users/:id/workouts                 |
| <a href="#addWorkoutToUser">POST Add a workout to a user</a>                    | /api/v1/users/:id/workouts                 |
| <a href="#allWorkouts">GET All workouts</a>                                     | /api/v1/workouts                           |
| <a href="#workoutID">GET Workout by ID</a>                                      | /api/v1/workouts/:id                       |
| <a href="#editWorkout">PUT Edit a workout</a>                                   | /api/v1/workouts/:id                       |
| <a href="#deleteWorkout">DELETE Delete a workout</a>                            | /api/v1/workouts/:id                       |
| <a href="#addExercise">POST Add exercise to a workout</a> **(Optional)**        | /api/v1/workouts/:id/exercises             |
| <a href="#editExercise">PUT Edit a workout's exercise</a> **(Optional)**        | /api/v1/workouts/:workout_id/exercises/:id |
| <a href="#deleteExercise">DELETE Delete a workout's exercise</a> **(Optional)** | /api/v1/workouts/exercises/:id             |

<hr />

<div id="register"></div>

## [POST] Registration

<a href="#top">Return to the top</a>

### Request body should include:

| Input (Case Sensitive) | Input Type             |
| ---------------------- | ---------------------- |
| name (required)        | string (4+ characters) |
| password (required)    | string (4+ characters) |
| email (required)       | string                 |

_An example of how the body should appear:_

```js
{
    "username": "exampleuser",
    "password": "exampleuser",
    "email": "exampleuser@gmail.com"
}
```

### What will be returned:

_You will receive the user object_

```js
{
  "user": {
    "id": 5,
    "username": "exampleuser",
    "email": "exampleuser@gmail.com",
    "created_at": "2019-11-18T16:09:18.017Z",
    "updated_at": "2019-11-18T16:09:18.017Z"
  },
}
```

<hr />

<div id="login"></div>

## [POST] Log In

<a href="#top">Return to the top</a>

### Request body should include:

| Input (Case Sensitive) | Input Type             |
| ---------------------- | ---------------------- |
| name (required)        | string (4+ characters) |
| password (required)    | string (4+ characters) |

_An example of how the body should appear:_

```js
{
	"username": "exampleuser",
	"password": "exampleuser"
}
```

### What will be returned:

_You will receive the user object._

```js
{
  "message": "Success! You are logged in!",
  "user": {
    "id": 6,
    "username": "testdude",
    "email": "testdude@gmail.com",
    "created_at": "2019-11-19 20:28:57",
    "updated_at": "2019-11-19 20:28:57",
    "workouts": []
  },
  }
```

<hr />

<div id="users"></div>

## [GET] Users

<a href="#top">Return to the top</a>

### What will be returned:

_An array of all users within the database._

```js
[
  {
    id: 1,
    username: "test",
    email: "test@gmail.com",
    created_at: "2019-11-18T15:35:00.800Z",
    updated_at: "2019-11-18T15:35:00.800Z",
  },
  {
    id: 2,
    username: "clifford",
    email: "clifford@gmail.com",
    created_at: "2019-11-18T15:35:00.800Z",
    updated_at: "2019-11-18T15:35:00.800Z",
  },
  {
    id: 3,
    username: "testuser",
    email: "testuser@gmail.com",
    created_at: "2019-11-18T15:56:55.695Z",
    updated_at: "2019-11-18T15:56:55.695Z",
  },
  {
    id: 4,
    username: "yeeehaww",
    email: "yeehaww@gmail.com",
    created_at: "2019-11-18T16:06:19.693Z",
    updated_at: "2019-11-18T16:06:19.693Z",
  },
  {
    id: 5,
    username: "exampleuser",
    email: "exampleuser@gmail.com",
    created_at: "2019-11-18T16:09:18.017Z",
    updated_at: "2019-11-18T16:09:18.017Z",
  },
];
```

<hr />

<div id="userID"></div>

## [GET] User by ID

<a href="#top">Return to the top</a>

**NOTE:** Be sure to include the `id` of an existing user on the end of the endpoint.

### What will be returned:

_An object of the user information._

```js
{
  "id": 3,
  "username": "testing",
  "email": "testing@gmai.com",
  "created_at": "2019-11-19 19:17:42",
  "updated_at": "2019-11-19 19:17:42",
  "workouts": [
    {
      "id": 7,
      "workout_name": "Bodybuilding",
      //"exercises": 5
    },
    {
      "id": 8,
      "workout_name": "Powerlifting",
      //"exercises": 5
    },
    {
      "id": 9,
      "workout_name": "Regular Workout",
      //"exercises": 5
    }
  ]
}
```

<hr />

<div id="username"></div>

## [GET] User by Username

<a href="#top">Return to the top</a>

**NOTE:** Be sure to include the `username` of an existing user on the end of the endpoint.

### What will be returned:

_An object of the user information._

```js
{
  "id": 3,
  "username": "testing",
  "email": "testing@gmai.com",
  "created_at": "2019-11-19 19:17:42",
  "updated_at": "2019-11-19 19:17:42",
  "workouts": [
    {
      "id": 7,
      "workout_name": "Bodybuilding",
      //"exercises": 5
    },
    {
      "id": 8,
      "workout_name": "Powerlifting",
      //"exercises": 5
    },
    {
      "id": 9,
      "workout_name": "Regular Workout",
      //"exercises": 5
    }
  ]
}
```

<hr />

<div id="user="></div>

## [GET] User profile

<a href="#top">Return to the top</a>

### What will be returned:

_An object of the currently logged in user information._

```js
{
  "id": 3,
  "username": "testing",
  "email": "testing@gmai.com",
  "created_at": "2019-11-19 19:17:42",
  "updated_at": "2019-11-19 19:17:42",
  "workouts": [
    {
      "id": 7,
      "workout_name": "Bodybuilding",
      //"exercises": 5
    },
    {
      "id": 8,
      "workout_name": "Powerlifting",
      //"exercises": 5
    },
    {
      "id": 9,
      "workout_name": "Regular Workout",
      //"exercises": 5
    }
  ]
}
```

<hr />

<div id="userWorkouts"></div>

## [GET] User's workouts

<a href="#top">Return to the top</a>

**NOTE:** Be sure to include the `id` of an existing user in the endpoint.

### What will be returned:

_An array containing objects of the workout information, and the user that it belongs to._

```js
[
  {
    workout_id: 7,
    workout_name: "Bodybuilding",
    user_id: 3,
    username: "testing",
   /* exercises: [
      {
        user_exercise_id: 31,
        exercise_id: 1,
        exercise_name: "Squats",
        region: "Quads",
        sets: 10,
        reps: 10,
      },
      {
        user_exercise_id: 32,
        exercise_id: 2,
        exercise_name: "Curls",
        region: "Biceps",
        sets: 10,
        reps: 10,
      },
      {
        user_exercise_id: 33,
        exercise_id: 3,
        exercise_name: "Pushups",
        region: "Chest",
        sets: 10,
        reps: 10,
      },
      {
        user_exercise_id: 34,
        exercise_id: 4,
        exercise_name: "Lunges",
        region: "Hamstrings",
        sets: 10,
        reps: 10,
      },
      {
        user_exercise_id: 35,
        exercise_id: 5,
        exercise_name: "Pull Ups",
        region: "Back",
        sets: 10,
        reps: 10,
      },
    ],*/
  },
];
```

<hr />

<div id="addWorkoutToUser"></div>

## [POST] Add a workout to a user

<a href="#top">Return to the top</a>

**NOTE:** Be sure to include the `id` of an existing user in the endpoint.

### Request body should include:

| Input (Case Sensitive) | Input Type |
| ---------------------- | ---------- |
| name (required)        | string     |

_An example of how the body should appear:_

```js
{
	"name": "Powerlifting Insanity!!"
}
```

### What will be returned:

_You will receive an array containing the ID of the newly created workout._

```js
[10];
```

<hr />

<div id="allWorkouts"></div>

## [GET] All workouts

<a href="#top">Return to the top</a>

### What will be returned:

_An array containing objects of all the existing workouts, and the user's id that they belong to._

```js
[
  {
    id: 1,
    name: "stronk",
    date: null,
    user_id: 1,
  },
  {
    id: 2,
    name: "Intense Workout",
    date: null,
    user_id: 1,
  },
  {
    id: 3,
    name: "Daily Workout",
    date: null,
    user_id: 1,
  },
  {
    id: 4,
    name: "Adrenaline Pumping",
    date: null,
    user_id: 2,
  },
  {
    id: 5,
    name: "P50X",
    date: null,
    user_id: 2,
  },
];
```

<hr />

<div id="workoutID"></div>

## [GET] Workout by ID

<a href="#top">Return to the top</a>

**NOTE:** Be sure to include the `id` of an existing user on the end of the endpoint.

### What will be returned:

_An object containing the workout information, and an array of ALL exercises associated with that workout._

```js
{
  "workout_id": 1,
  "workout_name": "stronk",
 /* "exercises": [
    {
      "user_exercise_id": 1,
      "exercise_id": 1,
      "exercise_name": "Squats",
      "region": "Quads",
      "sets": 10,
      "reps": 10
    },
    {
      "user_exercise_id": 2,
      "exercise_id": 2,
      "exercise_name": "Curls",
      "region": "Biceps",
      "sets": 10,
      "reps": 10
    },
    {
      "user_exercise_id": 3,
      "exercise_id": 3,
      "exercise_name": "Pushups",
      "region": "Chest",
      "sets": 10,
      "reps": 10
    },
    {
      "user_exercise_id": 4,
      "exercise_id": 4,
      "exercise_name": "Lunges",
      "region": "Hamstrings",
      "sets": 10,
      "reps": 10
    },
    {
      "user_exercise_id": 5,
      "exercise_id": 5,
      "exercise_name": "Pull Ups",
      "region": "Back",
      "sets": 10,
      "reps": 10
    }
  ]*/
}
```

<hr />

<div id="editWorkout"></div>

## [PUT] Edit a workout

<a href="#top">Return to the top</a>

**NOTE:** Be sure to include the `id` of an existing workout on the end of the endpoint.

### Request body should include:

| Input (Case Sensitive) | Input Type |
| ---------------------- | ---------- |
| name (required)        | string     |

_An example of how the body should appear:_

```js
{
	"name": "New Workout!"
}
```

### What will be returned:

_You will receive the number of records updated. You should expect to see `1` returned if successful._

```js
1;
```

<hr />

<div id="deleteWorkout"></div>

## [DELETE] Delete a workout

<a href="#top">Return to the top</a>

**NOTE:** Be sure to include the `id` of an existing workout on the end of the endpoint.

### What will be returned:

_You will receive a message confirming the workout was removed._

```js
{
  "message": "The selected workout was removed"
}
```

<hr />

# Optional

<div id="addExercise"></div>

## [POST] Add an exercise to a workout

<a href="#top">Return to the top</a>

**NOTE:** Be sure to include the `id` of an existing workout in the endpoint.

**NOTE:** This is used for adding an exercise to a workout.

### Request body should include:

| Input (Case Sensitive) | Input Type |
| ---------------------- | ---------- |
| name (required)        | string     |
| region (required)      | string     |
| reps (required)        | integer    |
| sets (required)        | integer    |

_An example of how the body should appear:_

```js
{
	"name": "Bench Press",
	"region": "Chest",
	"reps": 12,
	"sets": 2
}
```

### What will be returned:

_You will receive an object containing the workout's list of exercises which the object was added to. For example, if you add the exercise to the workout with ID of 3, you will receive the entire workout object with the ID of 3, with the new exercise added to the exercises array._

```js
{
  "workout_id": 3,
  "workout_name": "Daily Workout",
  "exercises": [
    {
      "user_exercise_id": 11,
      "exercise_id": 1,
      "exercise_name": "Squats",
      "region": "Quads",
      "sets": 10,
      "reps": 10
    },
    {
      "user_exercise_id": 12,
      "exercise_id": 2,
      "exercise_name": "Curls",
      "region": "Biceps",
      "sets": 10,
      "reps": 10
    },
    {
      "user_exercise_id": 13,
      "exercise_id": 3,
      "exercise_name": "Pushups",
      "region": "Chest",
      "sets": 10,
      "reps": 10
    },
    {
      "user_exercise_id": 46,
      "exercise_id": 6,
      "exercise_name": "Bench Press",
      "region": "Chest",
      "sets": 2,
      "reps": 12
    }
  ]
}
```

<hr />

<div id="editExercise"></div>

## [PUT] Edit a workout's exercise

<a href="#top">Return to the top</a>

**NOTE:** Be sure to include the `id` of an existing WORKOUT, `workout_id`, in the endpoint.

**NOTE:** Be sure to include the `id` of an existing EXERCISE, `id`, at the end of the endpoint.

### Request body should include:

| Input (Case Sensitive) | Input Type |
| ---------------------- | ---------- |
| name (required)        | string     |
| region (required)      | string     |
| reps (required)        | integer    |
| sets (required)        | integer    |

_An example of how the body should appear:_

```js
{
	"name": "One handed pushups",
	"region": "chest",
	"sets": 3,
	"reps": 4
}
```

### What will be returned:

_You will receive the number of records updated. You should expect to see `1` returned if successful._

```js
1;
```

<hr />

<div id="deleteExercise"></div>

## [DELETE] Delete a workout's exercise

<a href="#top">Return to the top</a>

**NOTE:** Be sure to include the `id` of an existing EXERCISE, `id`, at the end of the endpoint.

### What will be returned:

_You will receive a message confirming the exercise was successfully deleted._

```js
{
  "message": "The exercise was successfully removed from the workout"
}
```

<hr />
