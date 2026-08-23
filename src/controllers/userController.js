import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import createHttpError from 'http-errors';

export const updateUserAvatar = async (req, res) => {
  if (!req.file) throw createHttpError(400, 'No file');

  const { secure_url } = await saveFileToCloudinary(
    req.file.buffer,
    req.user._id,
  );
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: secure_url },
    { returnDocument: 'after' },
  );
  res.status(200).json({
    url: user.avatar,
  });
};
