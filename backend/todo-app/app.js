const express = require ("express");
const dotenv = require ("dotenv");
const app = express();

 // Middleware to parse JSON request body
 app.use(express.json());

// In-memory storage for todos
let todos = [];
 
// app.get("/app/v1/todos", (req, res) => {
//     res.send(`${todos}`)
//   });
// GET endpoint to fetch all todo items
app.get("/app/v1/todos", (req, res) => {
  res.json(todos);
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

  // PUT endpiont to update an existing todo item with the specified `id`
// provide updated `title` and/or `completed` in the request body as JSON
app.put("/app/v1/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed || todo.completed;
  res.json(todo);
});

// DELETE endpoint to remove an existing todo item with the specified `id`
app.delete("/app/v1/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todos.splice(index, 1);
  res.status(204).send();
});
    


dotenv.config();
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
    
});