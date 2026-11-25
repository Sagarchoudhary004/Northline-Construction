import contentService from '../services/contentService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getSiteContent = asyncHandler(async (_req, res) => {
  const content = await contentService.getSiteContent();
  return ApiResponse.success(res, { data: content });
});

export const updateSiteSection = asyncHandler(async (req, res) => {
  const { section } = req.params;
  const updated = await contentService.updateSection(section, req.body);
  return ApiResponse.success(res, {
    message: `${section} content updated successfully.`,
    data: updated,
  });
});

export const updateAllContent = asyncHandler(async (req, res) => {
  const updated = await contentService.updateAll(req.body);
  return ApiResponse.success(res, {
    message: 'Site content updated successfully.',
    data: updated,
  });
});
