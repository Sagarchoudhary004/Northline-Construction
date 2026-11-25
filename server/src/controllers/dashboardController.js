import dashboardService from '../services/dashboardService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getDashboardOverview = asyncHandler(async (_req, res) => {
  const overview = await dashboardService.getOverview();
  return ApiResponse.success(res, { data: overview });
});
