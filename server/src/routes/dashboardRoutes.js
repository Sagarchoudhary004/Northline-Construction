import { Router } from 'express';
import { getDashboardOverview } from '../controllers/dashboardController.js';
import { protectAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/overview', protectAdmin, getDashboardOverview);

export default router;
