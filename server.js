const express = require("express");
const app = express();
const port = 3000;

// In-memory todo list
let todos = [];

// Middleware to parse JSON request bodies
app.use(express.json());

// GET endpoint to retrieve all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST endpoint to create a new todo
app.post("/todos", (req, res) => {
  const { title } = req.body;
  const newTodo = { id: todos.length + 1, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT endpoint to update a todo
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = todos.find((t) => t.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.title = title || todo.title;
  todo.completed = completed !== undefined ? completed : todo.completed;

  res.json(todo);
});

// DELETE endpoint to delete a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const deletedTodo = todos.splice(index, 1)[0];
  res.json(deletedTodo);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
