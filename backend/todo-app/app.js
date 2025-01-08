const express = require ("express");
const dotenv = require ("dotenv");
const app = express();


// In-memory storage for todos
let todos = [];
 
app.get("/app/v1/todos", (req, res) => {
    res.send(`${todos}`)
  });

// POST endpoint to create a new todo item
// provide `title` and optionally `completed` in the request body as JSON
app.post("/app/v1/todos", (req, res) => {
    const todo = {
      id: todos.length + 1,
      title: req.body.title,
      completed: req.body.completed || false,
    };
    todos.push(todo);
    res.status(201).send(todo);
  });
    

















dotenv.config();
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
    
});