const ToDoModel = require('../models/ToDoModal');
const ObjectID = require('mongodb').ObjectID;

module.exports.getToDo = async (req, res) => {
  const todo = await ToDoModel.find();
  res.send(todo);
};

module.exports.saveToDo = async (req, res) => {
  const newTodo = new ToDoModel(req.body);

  await newTodo
    .save()
    .then(() => res.set(201).send('Added Successfully...'))
    .catch((err) => console.log(err));
};

module.exports.deleteToDo = (req, res) => {
  const _id = req.params.id;

  ToDoModel.findByIdAndDelete(_id)
    .then(() => res.set(201).send('Deleted Successfully...'))
    .catch((err) => console.log(err));
};

module.exports.updateToDo = (req, res) => {
  const _id = req.params.id;
  const { name, todos } = req.body;
  var myquery = { _id: _id };
  var newvalues = { $set: { name, todos } };
  ToDoModel.updateOne(myquery, newvalues, { upsert: true })
    .then(() => res.set(201).send('Updated Successfully...'))
    .catch((err) => console.log(err));
};
