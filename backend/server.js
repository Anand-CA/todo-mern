// import
const express = require("express");
const todoHelpers = require("./helpers/todo-helpers");
require("dotenv").config();
const cors = require("cors");
var db = require("./config/connection");

// config
const app = express();
const port = process.env.PORT;
// middleware
app.use(express.json());
app.use(cors());
// db
db.connect((err) => {
  if (err) console.log("connection error");
  else console.log("connected sucessfully to port 27017");
});
// routes
app.get("/get-todo", (req, res) => {
  todoHelpers.getTodo().then((response) => {
    res.send(response);
  });
});

app.post("/add-todo", (req, res) => {
  todoHelpers.addTodo(req.body);
  res.send({ addStatus: true });
});

app.get("/delete-todo/:id", (req, res) => {
  todoHelpers.removeTodo(req.params.id).then((response) => {
    res.send(response);
  });
});
app.post("/update-todo/:id", (req, res) => {
  console.log(req.body)
  todoHelpers.editTodo(req.params.id, req.body.newText).then((response) => {
    res.send(response);
  });
});
// listen
app.listen(port, () => {
  console.log("server running sucessfully on 9000");
});
