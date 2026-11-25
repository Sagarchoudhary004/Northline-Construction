import multer from 'multer';
import AppError from '../utils/AppError.js';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
]);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    return cb(
      new AppError(
        'Unsupported file format. Only JPEG, PNG, WebP, and AVIF images are allowed.',
        400
      )
    );
  }
  cb(null, true);
};

export const uploadSingleImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
    files: 1,
  },
}).single('image');

export const handleMulterUpload = (req, res, next) => {
  uploadSingleImage(req, res, (err) => {
    if (!err) return next();
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new AppError('Image exceeds the 5 MB maximum upload size.', 400));
      }
      return next(new AppError(`Upload error: ${err.message}`, 400));
    }
    return next(err);
  });
};
