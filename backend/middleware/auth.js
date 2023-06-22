import User from '../models/User.js';
import Whitelist from '../models/Whitelist.js';
import Jwt from 'jsonwebtoken';
import Workday from '../models/Workday.js';
import Category from '../models/Category.js';
import Task from '../models/Task.js';

// check if this email is whitelisted
export const whitelist = async (req, res, next) => {
  try {
    const { email } = req.body;

    // get whitelist emails from DB
    const whitelist = await Whitelist.find();

    // check input email with whitelist
    if (whitelist.includes(email)) {
      next();
      return;
    }

    res.status(403).json({ error: 'Email is not Whitelisted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// check if this user is verified (email)
export const isVerified = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user.isVerified) {
      return res.status(403).json({ error: 'Verify your Email first' });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// check if this token is correct
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(403).send('Access Denied');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = Jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// check role if is admin
export const isAdmin = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    // compare users role with the enum of the user model (['user', 'admin'])
    if (user.role == User.schema.path('role').enumValues[1]) {
      next();
      return;
    }

    return res.status(403).send('Access Denied');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// own user or admin
export const isOwnUserOrAdmin = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id || isAdmin(req, res, next)) {
      next();
      return;
    }

    return res.status(403).send('Access Denied');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// own user
export const isOwnUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      next();
      return;
    }

    return res.status(403).send('Access Denied');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// own workday
export const isOwnWorkday = async (req, res, next) => {
  const userId = req.user.id;
  const workdayId = req.params.id;

  try {
    const workday = await Workday.findById(workdayId);
    if (workday.user.toString() === userId) {
      next();
      return;
    }

    return res.status(403).send('Access Denied');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const isOwnWorkdayOrAdmin = async (req, res, next) => {
  const userId = req.user.id;
  const workdayId = req.params.id;

  try {
    const workday = await Workday.findById(workdayId);
    if (workday.user.toString() === userId || isAdmin(req, res, next)) {
      next();
      return;
    }

    return res.status(403).send('Access Denied');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// own category
export const isOwnCategory = async (req, res, next) => {
  const userId = req.user.id;
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);
    if (category.user.toString() === userId) {
      next();
      return;
    }

    return res.status(403).send('Access Denied');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// own task
export const isOwnTask = async (req, res, next) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    const category = await Category.findById(task.category);
    if (category.user.toString() === userId) {
      next();
      return;
    }

    return res.status(403).send('Access Denied');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
