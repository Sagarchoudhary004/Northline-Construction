import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';
import adminRepository from '../repositories/adminRepository.js';

export const protectAdmin = asyncHandler(async (req, _res, next) => {
  let token = null;

  if (req.cookies?.northline_token) {
    token = req.cookies.northline_token;
  } else if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('Authentication required. Please log in as admin.', 401);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, env.jwtSecret);
  } catch {
    throw new AppError('Invalid or expired session token. Please log in again.', 401);
  }

  const admin = await adminRepository.findById(decoded.sub);
  if (!admin) {
    throw new AppError('Admin account no longer exists.', 401);
  }

  req.admin = admin;
  next();
});
