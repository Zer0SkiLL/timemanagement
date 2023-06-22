import Comment from '../models/Comment.js';
import User from '../models/User.js';
import Workday from '../models/Workday.js';

// Create
export const addCommentByWorkdayId = async (req, res) => {
  const workdayId = req.params.id;
  const { text } = req.body;

  try {
    // create a comment
    const comment = new Comment({
      text: text,
      createAt: Date.now(),
      workday: workdayId,
    });

    await comment.save();

    // // add reference to workday
    // const workday = Workday.findByIdAndUpdate(
    //   workdayId,
    //   { $push: { comments: comment._id } },
    //   { new: true }
    // );

    // console.log(workday);

    // const { _id, comments } = workday;

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read

// Update
export const updateCommentById = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

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

// Delete
export const deleteCommentById = async (req, res) => {
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
