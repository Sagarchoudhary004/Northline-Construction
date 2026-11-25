import { Router } from 'express';
import { z } from 'zod';
import {
  createProject,
  deleteProject,
  getAllProjectsAdmin,
  getPublicProjects,
  reorderProjects,
  toggleProjectPublish,
  updateProject,
} from '../controllers/projectController.js';
import { protectAdmin } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validateMiddleware.js';

const router = Router();

const projectBodySchema = z.object({
  title: z.string().min(2, 'Project title is required'),
  slug: z.string().optional(),
  category: z.string().min(2, 'Category is required'),
  location: z.string().min(2, 'Location is required'),
  area: z.string().min(1, 'Area is required'),
  description: z.string().min(5, 'Description is required'),
  imageUrl: z.string().optional().default(''),
  imageAlt: z.string().optional().default(''),
  mediaId: z.string().nullable().optional(),
  published: z.boolean().optional().default(true),
  isFictionalDemo: z.boolean().optional().default(true),
  order: z.number().int().optional(),
});

router.get('/', getPublicProjects);
router.get('/admin/all', protectAdmin, getAllProjectsAdmin);
router.post('/', protectAdmin, validateBody(projectBodySchema), createProject);
router.patch('/reorder', protectAdmin, reorderProjects);
router.patch('/:id/toggle-publish', protectAdmin, toggleProjectPublish);
router.put('/:id', protectAdmin, validateBody(projectBodySchema.partial()), updateProject);
router.delete('/:id', protectAdmin, deleteProject);

export default router;
