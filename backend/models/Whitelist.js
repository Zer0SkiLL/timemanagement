import mongoose from 'mongoose';

const WhitelistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      max: 100,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Whitelist = mongoose.model('Whitelist', WhitelistSchema);
export default Whitelist;
