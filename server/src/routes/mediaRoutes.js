import { Router } from 'express';
import {
  deleteMedia,
  listMedia,
  replaceMedia,
  uploadMedia,
} from '../controllers/mediaController.js';
import { protectAdmin } from '../middlewares/authMiddleware.js';
import { handleMulterUpload } from '../middlewares/uploadMiddleware.js';

const router = Router();

router.use(protectAdmin);

router.get('/', listMedia);
router.post('/upload', handleMulterUpload, uploadMedia);
router.put('/:id/replace', handleMulterUpload, replaceMedia);
router.delete('/:id', deleteMedia);

export default router;
