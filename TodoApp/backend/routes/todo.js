var express = require("express");
var router = express.Router();
var {
  addTodo,
  updateTodo,
  getTodos,
  deleteTodo,
} = require("../controllers/todoController");

/* GET home page. */
router.route("/addTodo").post(addTodo);
router.route("/updatetodo").post(updateTodo);
router.route("/getTodos").get(getTodos);
router.route("/deleteTodo").post(deleteTodo);

module.exports = router;
