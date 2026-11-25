import AppError from '../utils/AppError.js';

export const validateBody = (schema) => (req, _res, next) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return next(new AppError('Please check the required fields and try again.', 400, details));
  }
  req.body = parsed.data;
  next();
};
