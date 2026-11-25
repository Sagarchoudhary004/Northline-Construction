import mediaService from '../services/mediaService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import AppError from '../utils/AppError.js';

export const listMedia = asyncHandler(async (req, res) => {
  const result = await mediaService.listMedia(req.query.category);
  return ApiResponse.success(res, { data: result });
});

export const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError('Please attach an image file to upload.', 400);
  }
  const media = await mediaService.uploadMedia(req.file, {
    title: req.body.title,
    alt: req.body.alt,
    category: req.body.category,
  });
  return ApiResponse.success(res, {
    statusCode: 201,
    message: 'Image uploaded successfully.',
    data: media,
  });
});

export const replaceMedia = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError('Please attach a replacement image file.', 400);
  }
  const media = await mediaService.replaceMedia(req.params.id, req.file, {
    title: req.body.title,
    alt: req.body.alt,
    category: req.body.category,
  });
  return ApiResponse.success(res, {
    message: 'Image replaced successfully.',
    data: media,
  });
});

export const deleteMedia = asyncHandler(async (req, res) => {
  await mediaService.deleteMedia(req.params.id);
  return ApiResponse.success(res, { message: 'Media deleted successfully.' });
});
