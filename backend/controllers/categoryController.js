import Category from '../models/Category.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import Workday from '../models/Workday.js';

// Create
export const createCategory = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  try {
    const category = new Category({
      name: name,
      user: userId,
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read
export const getCategoryByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const category = await Category.find({ user: userId });

    if (category.length > 0) {
      res.status(200).json(category);
      return;
    }

    res.status(204).json({ message: 'No Item Found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategoryAndTaskByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const categories = await Category.find({ user: userId });

    const tasks = await Task.find({
      category: { $in: categories.map((category) => category._id) },
    });

    const categoriesWithTasks = categories.map((category) => ({
      _id: category._id,
      name: category.name,
      tasks: tasks.filter((task) => task.category.toString() === category._id.toString()),
    }));

    console.log(categoriesWithTasks);

    if (categoriesWithTasks.length > 0) {
      res.status(200).json(categoriesWithTasks);
      return;
    }

    res.status(204).json({ message: 'No Item Found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (category.length > 0) {
      res.status(200).json(category);
      return;
    }

    res.status(204).json({ message: 'No Item Found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateCategoryById = async (req, res) => {
  const { id } = req.params;
  const { name, completed, active } = req.body;

  // Create an object with the updated fields
  const updatedFields = {};
  if (name !== undefined) updatedFields.name = name;
  if (completed !== undefined) updatedFields.completed = completed;
  if (active !== undefined) updatedFields.active = active;

  try {
    const category = await Category.findByIdAndUpdate(id, updatedFields, { new: true });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteCategoryBId = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
