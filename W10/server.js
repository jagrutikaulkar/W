const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let tasks = [];

// GET TASKS
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ADD TASK
app.post("/add", (req, res) => {
  tasks.push(req.body);
  res.send("added");
});

// DELETE TASK
app.post("/delete", (req, res) => {
  tasks.splice(req.body.index, 1);
  res.send("deleted");
});

// UPDATE TASK
app.post("/update", (req, res) => {
  tasks[req.body.index] = req.body;
  res.send("updated");
});

app.listen(3000, () => console.log("Server running on 3000"));