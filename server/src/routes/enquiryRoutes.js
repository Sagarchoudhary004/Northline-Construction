import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import {
  deleteEnquiry,
  getEnquiry,
  listEnquiries,
  submitEnquiry,
  updateEnquiry,
} from '../controllers/enquiryController.js';
import { protectAdmin } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validateMiddleware.js';
import { ENQUIRY_STATUSES, PROJECT_TYPES } from '../models/Enquiry.js';

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { success: false, message: 'Too many submissions. Please try again later.' },
});

const createEnquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Full Name is required.'),
  company: z.string().trim().optional().default(''),
  email: z.string().trim().email('Please provide a valid work email.'),
  phone: z.string().trim().min(5, 'Phone Number is required.'),
  projectType: z.enum(PROJECT_TYPES).default('Commercial'),
  location: z.string().trim().optional().default(''),
  approximateArea: z.string().trim().optional().default(''),
  expectedStart: z.string().trim().optional().default(''),
  message: z.string().trim().min(10, 'Please share a brief project message.'),
});

const updateEnquirySchema = z.object({
  status: z.enum(ENQUIRY_STATUSES).optional(),
  adminNotes: z.string().optional(),
});

router.post('/', submitLimiter, validateBody(createEnquirySchema), submitEnquiry);
router.get('/', protectAdmin, listEnquiries);
router.get('/:id', protectAdmin, getEnquiry);
router.patch('/:id', protectAdmin, validateBody(updateEnquirySchema), updateEnquiry);
router.delete('/:id', protectAdmin, deleteEnquiry);

export default router;
