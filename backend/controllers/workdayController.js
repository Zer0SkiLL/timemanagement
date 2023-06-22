import User from '../models/User.js';
import Workday from '../models/Workday.js';
import Comment from '../models/Comment.js';

// Create
export const createWorkday = async (req, res) => {
  const userId = req.user.id;

  const today = new Date().toISOString().split('T')[0]; // Get today's date

  try {
    const workday = new Workday({
      user: userId,
      date: today,
    });

    await workday.save();
    res.status(201).json(workday);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read
export const getWorkday = async (req, res) => {
  try {
    const workday = await Workday.find();

    if (workday.length > 0) {
      res.status(200).json(workday);
      return;
    }

    res.status(204).json({ message: 'No Item Found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWorkdayByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const workday = await Workday.find({ user: userId });

    if (workday.length > 0) {
      res.status(200).json(workday);
      return;
    }

    res.status(204).json({ message: 'No Item Found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWorkdayById = async (req, res) => {
  const { id } = req.params;

  try {
    const workday = await Workday.findById(id);

    if (workday.length > 0) {
      res.status(200).json(workday);
      return;
    }

    res.status(204).json({ message: 'No Item Found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWorkdayToday = async (req, res) => {
  const userId = req.user.id;

  const today = new Date().toISOString().split('T')[0]; // Get today's date

  try {
    const workday = await Workday.findOne({ user: userId, date: today }).populate('comments');
    if (workday) {
      const comments = await Comment.find({ workday: workday._id });

      workday.comments = comments;

      res.status(200).json(workday);
      return;
    }

    res.status(204).json({ message: 'No Item Found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // Update
// export const updateWorkdayById = async (req, res) => {
//   const { id } = req.params;
//   const { comment } = req.body;

//   try {
//     const workday = await Workday.findById(id);

//     if (workday.length > 0) {
//       res.status(200).json(workday);
//       return;
//     }

//     res.status(204).json({ message: 'No Item Found' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Delete
export const deleteWorkdayBId = async (req, res) => {
  const { id } = req.params;

  try {
    const workday = await Workday.findByIdAndDelete(id);

    if (!workday) {
      return res.status(404).json({ message: 'Workday not found' });
    }

    res.json({ message: 'Workday deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
