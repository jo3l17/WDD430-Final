const Todo = require("../models/todo");

const todoController = {
  getAll: async (req, res) => {
    try {
      const todos = await Todo.find({ owner: req.user._id });
      res.json(todos);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    try {
      const todo = await Todo.findOne({ _id: id, owner: req.user._id });
      res.json(todo);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  create: async (req, res) => {
    const todo = new Todo({
      title: req.body.title,
      completed: req.body.completed,
      owner: req.user._id,
    });
    try {
      const savedTodo = await todo.save();
      res.status(200).json(savedTodo);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedTodo = await Todo.updateOne(
        { _id: id, owner: req.user._id },
        { $set: req.body }
      );
      res.json(updatedTodo);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const deletedTodo = await Todo.deleteOne({
        _id: id,
        owner: req.user._id,
      });
      res.status(200).json(deletedTodo);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
};

module.exports = todoController;
