import Category from '../models/Category.js';
import Task from '../models/Task.js';

// Create
export const createTask = async (req, res) => {
  const { name, categoryId, targetDate } = req.body;

  try {
    const task = new Task({
      name: name,
      category: categoryId,
      targetDate: targetDate,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read
export const getTaskByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const categories = await Category.find({ user: userId });

    const tasks = await Task.find({
      category: { $in: categories.map((category) => category._id) },
    });

    if (tasks.length > 0) {
      res.status(200).json(tasks);
      return;
    }

    res.status(204).json({ message: 'No Item Found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (task.length > 0) {
      res.status(200).json(task);
      return;
    }

    res.status(204).json({ message: 'No Item Found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateTaskById = async (req, res) => {
  const { id } = req.params;
  const { name, targetDate, completed } = req.body;

  // Create an object with the updated fields
  const updatedFields = {};
  if (name !== undefined) updatedFields.name = name;
  if (completed !== undefined) updatedFields.completed = completed;
  if (targetDate !== undefined) updatedFields.targetDate = targetDate;

  try {
    const task = await Task.findByIdAndUpdate(id, updatedFields, { new: true });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
