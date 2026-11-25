import enquiryService from '../services/enquiryService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const submitEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.createEnquiry(req.body);
  return ApiResponse.success(res, {
    statusCode: 201,
    message: 'Enquiry submitted successfully.',
    data: enquiry,
  });
});

export const listEnquiries = asyncHandler(async (req, res) => {
  const { status, search } = req.query;
  const enquiries = await enquiryService.listEnquiries({ status, search });
  return ApiResponse.success(res, { data: enquiries });
});

export const getEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.getEnquiryById(req.params.id);
  return ApiResponse.success(res, { data: enquiry });
});

export const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.updateEnquiry(req.params.id, req.body);
  return ApiResponse.success(res, {
    message: 'Enquiry updated successfully.',
    data: enquiry,
  });
});

export const deleteEnquiry = asyncHandler(async (req, res) => {
  await enquiryService.deleteEnquiry(req.params.id);
  return ApiResponse.success(res, { message: 'Enquiry deleted successfully.' });
});
