import mongoose from 'mongoose';
import moment from 'moment-timezone';

const WorkdaySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      unique: true,
      index: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Workday = mongoose.model('Workday', WorkdaySchema);
export default Workday;
