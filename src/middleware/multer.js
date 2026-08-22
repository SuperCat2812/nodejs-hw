import multer from 'multer';
import createHttpError from 'http-errors';

const storage = multer.memoryStorage();

const limits = {
  fileSize: 2 * 1024 * 1024,
};

const fileFilter = (req, file, callback) => {
  if (!file.mimetype.startsWith('image/')) {
    console.log(file.mimetype);

    return callback(createHttpError(400, 'Only images allowed'));
  }
  callback(null, true);
};

const upload = multer({ storage, limits, fileFilter });

export default upload;
