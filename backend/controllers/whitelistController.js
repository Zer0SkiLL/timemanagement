import Whitelist from '../models/Whitelist.js';

// Create
export const addWhitelist = async (req, res) => {
  try {
    const { email } = req.body;
    const newWhitelist = new Whitelist({
      email: email,
    });

    await newWhitelist.save();
    res.status(201).json(newWhitelist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read
export const getWhitelist = async (req, res) => {
  try {
    const whitelist = await Whitelist.find();

    if (whitelist.length > 0) {
      res.status(200).json(whitelist);
      return;
    }

    res.status(204).json({ message: 'No Item Found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWhitelistById = async (req, res) => {
  try {
    const { id } = req.params;

    const whitelist = await Whitelist.findById(id);

    if (whitelist.length > 0) {
      return res.status(200).json(whitelist);
    }

    res.status(204).json({ message: 'No Item Found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateWhitelistById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, blocked } = req.body;

    const whitelist = await Whitelist.findByIdAndUpdate({ id, email, blocked });

    if (!whitelist) {
      return res.status(404).json({ message: 'Whitelist entry not found' });
    }

    res.json({ message: 'Whitelist entry updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteWhitelistBId = async (req, res) => {
  try {
    const { id } = req.params;

    const whitelist = await Whitelist.findByIdAndDelete(id);

    if (!whitelist) {
      return res.status(404).json({ message: 'Whitelist entry not found' });
    }

    res.json({ message: 'Whitelist entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
