var express = require("express");
var router = express.Router();
var {
  addTodoList,
  updateTodoList,
  deleteTodoList,
} = require("../controllers/todoListController");

/* GET home page. */
router.route("/addTodoList").post(addTodoList);
router.route("/updateTodoList").post(updateTodoList);
router.route("/deleteTodoList").post(deleteTodoList);

module.exports = router;
