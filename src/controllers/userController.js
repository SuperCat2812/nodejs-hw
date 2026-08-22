import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import createHttpError from 'http-errors';

export const updateUserAvatar = async (req, res) => {
  if (!req.file) throw createHttpError(400, 'No file');
  const user = req.user;

  const { secure_url } = await saveFileToCloudinary(req.file.buffer, user._id);
  user.avatar = secure_url;
  await user.save();
  res.status(200).json({
    url: secure_url,
  });
};
