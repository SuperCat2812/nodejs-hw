import { HttpError } from 'http-errors';
const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    const { status = 500 } = err;
    return res.status(status).json({
      message: err.message || err.name,
    });
  }
  res.status(500).json({
    message: err.message,
  });
};
export default errorHandler;
