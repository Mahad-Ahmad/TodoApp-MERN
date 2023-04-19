const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  todos: [
    {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
    },
  ],
});

module.exports = mongoose.model('Todo', todoSchema);
