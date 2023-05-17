import User from '../models/User.js';

// Create

// Read
export const getUser = async (req, res) => {
  try {
    const user = await User.find();

    if (user.length > 0) {
      res.status(200).json(user);
      return;
    }

    res.status(204).json({ message: 'No Item Found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (user) {
      return res.status(200).json(user);
    }

    res.status(204).json({ message: 'No Item Found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByIdAndUpdate({ id, name, email, password });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, isVerified, isBlocked, role } = req.body;

    const user = await User.findByIdAndUpdate({
      id,
      name,
      email,
      password,
      isVerified,
      isBlocked,
      role,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteUserBId = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
