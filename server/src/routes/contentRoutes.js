import { Router } from 'express';
import {
  getSiteContent,
  updateAllContent,
  updateSiteSection,
} from '../controllers/contentController.js';
import { protectAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getSiteContent);
router.put('/:section', protectAdmin, updateSiteSection);
router.put('/', protectAdmin, updateAllContent);

export default router;
