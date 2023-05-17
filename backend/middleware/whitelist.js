import Whitelist from '../models/Whitelist.js';

export const whitelist = async (req, res, next) => {
  try {
    const { email } = req.body;

    // get whitelist emails from DB
    const whitelist = await Whitelist.findOne({ email });

    // check input email with whitelist
    if (whitelist) {
      next();
      return;
    }
    res.status(403).json({ error: 'Email is not Whitelisted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
