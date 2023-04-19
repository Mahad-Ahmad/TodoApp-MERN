var Todo = require("../models/todoModel");

const addTodoList = async (req, res) => {
  const { id, todoList } = req.body.todo;
  try {
    const todo = await Todo.findById(id).exec();

    todo.todoList.push(todoList);
    const updatedTodo = await todo.save();
    res.status(201).json(updatedTodo);
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
};

const updateTodoList = async (req, res) => {
  const { _id, name, status } = req.body.todo;
  try {
    const todo = await Todo.updateOne(
      { "todoList._id": _id },
      {
        $set: {
          "todoList.$.name": name,
          "todoList.$.status": status,
        },
      }
    );
    const updated = await Todo.findOne({
      "todoList._id": _id,
    }).exec();

    res.status(201).json(updated);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteTodoList = async (req, res) => {
  try {
    const deleted = await Todo.findOne({
      "todoList._id": req.body._id,
    }).exec();
    deleted.todoList.pull({ _id: req.body._id });
    await deleted.save();
    res.status(200).json(deleted);
  } catch (error) {
    console.log(error.message);
  }
};

exports.addTodoList = addTodoList;
exports.updateTodoList = updateTodoList;
exports.deleteTodoList = deleteTodoList;
