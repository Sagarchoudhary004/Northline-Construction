import AppError from '../utils/AppError.js';

export const notFoundHandler = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export const globalErrorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let details = err.details || null;

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed.';
    details = Object.values(err.errors).map((e) => e.message);
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid identifier format for ${err.path}.`;
  } else if (err.code === 11000) {
    statusCode = 409;
    message = 'A record with this unique value already exists.';
  }

  if (statusCode >= 500) {
    console.error('[ServerError]', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
  });
};
