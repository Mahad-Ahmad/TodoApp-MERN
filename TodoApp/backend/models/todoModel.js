const mongoose = require("mongoose");

const todoScehma = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  todoList: [
    {
      name: {
        type: String,
      },
      date: {
        type: String,
      },
      status: {
        type: Boolean,
      },
    },
  ],
});

const Todo = mongoose.model("Todo", todoScehma);
module.exports = Todo;
