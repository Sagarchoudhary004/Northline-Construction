import projectService from '../services/projectService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getPublicProjects = asyncHandler(async (_req, res) => {
  const projects = await projectService.getPublicProjects();
  return ApiResponse.success(res, { data: projects });
});

export const getAllProjectsAdmin = asyncHandler(async (_req, res) => {
  const projects = await projectService.getAllProjects();
  return ApiResponse.success(res, { data: projects });
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.body);
  return ApiResponse.success(res, {
    statusCode: 201,
    message: 'Project created successfully.',
    data: project,
  });
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body);
  return ApiResponse.success(res, {
    message: 'Project updated successfully.',
    data: project,
  });
});

export const reorderProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.reorderProjects(req.body.orderedIds);
  return ApiResponse.success(res, {
    message: 'Project order updated.',
    data: projects,
  });
});

export const toggleProjectPublish = asyncHandler(async (req, res) => {
  const project = await projectService.togglePublish(req.params.id);
  return ApiResponse.success(res, {
    message: `Project ${project.published ? 'published' : 'unpublished'}.`,
    data: project,
  });
});

export const deleteProject = asyncHandler(async (req, res) => {
  await projectService.deleteProject(req.params.id);
  return ApiResponse.success(res, { message: 'Project deleted successfully.' });
});
