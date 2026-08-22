import { User } from '../models/user.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { createSession, setSessionCookies } from '../services/auth.js';
import { Session } from '../models/session.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import Handlebars from 'handlebars';
import { sendEmail } from '../utils/sendMail.js';

const { JWT_SECRET } = process.env;

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw createHttpError(400, 'Email in use');
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  const newSession = await createSession(newUser._id);
  setSessionCookies(res, newSession);
  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(401, 'Invalid credentials');
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw createHttpError(401, 'Invalid credentials');
  await Session.deleteOne({ userId: user._id });
  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);
  res.status(200).json(user);
};

export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  const session = await Session.findOne({ _id: sessionId, refreshToken });
  if (!session) throw createHttpError(401, 'Session not found');
  if (session.refreshTokenValidUntil < Date.now()) {
    await Session.deleteOne({ _id: sessionId });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');
    throw createHttpError(401, 'Session token expired');
  }
  await Session.deleteOne({ _id: sessionId });
  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({
    message: 'Session refreshed',
  });
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  res.status(204).send();
};

const { FRONTEND_DOMAIN } = process.env;
const resetEmailPath = resolve('src', 'templates', 'reset-password-email.html');
const templateSource = await readFile(resetEmailPath, 'utf-8');
export const requestResetEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(200)
      .json({ message: 'Password reset email sent successfully' });
  const payload = { sub: user._id.toString(), email: user.email };
  const reset_Jwt = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  const template = Handlebars.compile(templateSource);
  const html = template({
    username: user.username,
    url: `${FRONTEND_DOMAIN}/reset-password?token=${reset_Jwt}`,
  });
  const resetPasswordMail = {
    to: email,
    subject: 'Reset Password',
    html,
  };
  try {
    await sendEmail(resetPasswordMail);
  } catch (error) {
    console.log('EMAIL  ERROR', error);

    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
  res.status(200).json({ message: 'Password reset email sent successfully' });
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    throw createHttpError(401, 'Invalid or expired token');
  }

  const { sub, email } = payload;
  const user = await User.findOne({ email, _id: sub });
  if (!user) throw createHttpError(404, 'User not found');
  user.password = await bcrypt.hash(password, 10);
  await user.save();

  res.status(200).json({ message: 'Password reset successfully' });
};
