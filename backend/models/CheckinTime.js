import mongoose from 'mongoose';

const CheckinSchema = new mongoose.Schema(
  {
    workday: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workday',
      required: true,
    },
    checkIn: [
      {
        type: Date,
      },
    ],
    checkOut: [
      {
        type: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Checkin = mongoose.model('Checkin', CheckinSchema);
export default Checkin;
