var Todo = require("../models/todoModel");

const addTodo = async (req, res) => {
  console.log(req.body);
  try {
    const todo = new Todo({
      title: req.body.title,
    });
    const createdTodo = await todo.save();
    res.status(201).json(createdTodo);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateTodo = async (req, res) => {
  const { _id, title } = req.body.todo;
  try {
    const todo = await Todo.findById(_id).exec();
    todo.title = title;
    const updateTodo = await todo.save();
    res.status(201).json(updateTodo);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().exec();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({ _id: req.body._id }).exec();
    res.status(200).json(deleted);
  } catch (error) {
    console.log(error.message);
  }
};

exports.addTodo = addTodo;
exports.updateTodo = updateTodo;
exports.getTodos = getTodos;
exports.deleteTodo = deleteTodo;
