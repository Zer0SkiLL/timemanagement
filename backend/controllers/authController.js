import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendResetPasswordEmail, sendVerificationEmail } from '../services/emailService.js';
import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';

// Register User
export const register = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const verificationToken = Jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      verificationToken,
    });

    const savedUser = await newUser.save();

    await sendVerificationEmail(email, verificationToken);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerVerification = async (req, res) => {
  const { token } = req.params;

  try {
    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decodedToken;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: 'Account verified successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: 'User does not exist.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // unique token
    const resetToken = Jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    user.resetPasswordToken = resetToken;
    user.resetPasswordRequestAt = Date.now();

    await user.save();

    // send the password reset mail
    sendResetPasswordEmail(email, resetToken);

    res.json({ message: 'Password reset token sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Check if the reset token exists in the user's database and hasn't expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordRequestAt: { $gt: new Date(Date.now() - 3600000) },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
    user.resetPasswordToken = null;
    user.resetPasswordRequestAt = null;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
