import { HttpError } from 'http-errors';

const errorHandler = (err, req, res, next) => {
  const status =
    err instanceof HttpError ||
    (Number.isInteger(err.status) && err.status >= 400 && err.status < 500)
      ? (err.status ?? 500)
      : 500;

  if (status >= 500) {
    console.error('Internal server error:', err);
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      message: 'Invalid JSON',
    });
  }

  return res.status(status).json({
    message:
      status >= 500 ? 'Internal Server Error' : err.message || 'Bad Request',
  });
};

export default errorHandler;
