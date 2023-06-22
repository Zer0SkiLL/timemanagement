import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      required: true,
    },
    workday: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workday',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
