const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const createdBy = req.user.userId; // Extract user ID from JWT payload
    const task = new Task({ title, description, status, dueDate, createdBy });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all tasks
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.userId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get a single task
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.userId });
    if (!task) return res.status(404).send('Task not found');
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update a task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      { title, description, status, dueDate },
      { new: true }
    );
    if (!updatedTask) return res.status(404).send('Task not found');
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId });
    if (!deletedTask) return res.status(404).send('Task not found');
    res.status(200).send('Task deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
