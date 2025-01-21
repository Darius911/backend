### Task: Build a RESTful API with Validation Using Express Validator

**Objective**: Create a simple API using Express and Express Validator to validate user inputs for various routes. The focus is on practicing input validation, error handling, and structuring a basic Express application.

---

### Project Overview

You will build an API with the following routes:

#### 1. **GET /products**
- **Description**: Retrieve products based on filters.
- **Query Parameters**:
  | Parameter | Type   | Required | Validation                                      |
  |-----------|--------|----------|------------------------------------------------|
  | `price`   | Float  | Optional | Must be a positive number with up to 2 decimal places. |
  | `category`| String | Required | Must be a non-empty string.                    |

- **Expected Response**:
  - On success: A list of products filtered by the provided parameters.
  - On validation failure: An error message specifying the invalid parameter(s).

---

#### 2. **POST /register**
- **Description**: Register a new user.
- **Request Body**:
  | Field      | Type   | Required | Validation                                     |
  |------------|--------|----------|------------------------------------------------|
  | `email`    | String | Required | Must be a valid email address.                |
  | `password` | String | Required | Must be at least 8 characters long.           |
  | `age`      | Integer| Optional | Must be a positive integer.                   |

- **Expected Response**:
  - On success: A message confirming the user registration.
  - On validation failure: An error message specifying the invalid field(s).

---

#### 3. **GET /users/:id**
- **Description**: Retrieve a user by their ID.
- **URL Parameters**:
  | Parameter | Type   | Required | Validation                                      |
  |-----------|--------|----------|------------------------------------------------|
  | `id`      | Integer| Required | Must be a numeric value.                       |

- **Expected Response**:
  - On success: User details for the specified ID.
  - On validation failure: An error message specifying the invalid parameter(s).

---

### Task Requirements

1. **Set Up the Project**:
   - Create a Node.js project and install the required dependencies (`express`, `express-validator`).
   - Organize your code into folders for routes, controllers, and middlewares.

2. **Implement Validation**:
   - Use `express-validator` to validate inputs for all routes.
   - Ensure that:
     - Required fields are properly validated.
     - Optional fields are checked only if provided.
     - Error messages are clear and user-friendly.

3. **Handle Validation Errors**:
   - Respond with a 400 status code for validation errors.
   - Include a descriptive error message for each invalid input.

4. **Test the API**:
   - Use tools like Postman, Insomnia, or curl to test the API.
   - Test with both valid and invalid inputs for all routes.
   - Document example requests and responses.

---


### Additional Notes
- Ensure that all validation logic is implemented using Express Validator.
- Handle both required and optional fields correctly.
- Provide meaningful error messages to the client for invalid inputs.
- Follow best practices for organizing your Express application (e.g., separate routes, controllers, and middlewares).