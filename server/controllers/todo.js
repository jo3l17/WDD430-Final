const Todo = require("../models/todo");

const todoController = {
  getAll: async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.status(200).json({ message: error });
    }
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    try {
      const todo = await Todo.findById(id);
      res.json(todo);
    } catch (error) {
      res.status(200).json({ message: error });
    }
  },
  create: async (req, res) => {
    const todo = new Todo({
      title: req.body.title,
      completed: req.body.completed,
    });
    try {
      const savedTodo = await todo.save();
      res.status(200).json(savedTodo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedTodo = await Todo.updateOne({ _id: id }, { $set: req.body });
      res.json(updatedTodo);
    } catch (error) {
      res.status(200).json({ message: error });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const deletedTodo = await Todo.deleteOne({ _id: id });
      res.status(200).json(deletedTodo);
    } catch (error) {
      res.json({ message: error });
    }
  },
};

module.exports = todoController;