import authService from '../services/authService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import env from '../config/env.js';

const getCookieOptions = () => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: env.nodeEnv === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.cookie('northline_token', result.token, getCookieOptions());
  return ApiResponse.success(res, {
    message: 'Logged in successfully.',
    data: result,
  });
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie('northline_token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.nodeEnv === 'production',
  });
  return ApiResponse.success(res, { message: 'Logged out successfully.' });
});

export const getMe = asyncHandler(async (req, res) => {
  const profile = await authService.getProfile(req.admin._id);
  return ApiResponse.success(res, { data: { admin: profile } });
});
