import express from 'express';

import userRoutes from './userRoutes.js';
import entriesRoutes from './entryRoutes.js';
const router = express.Router();

router.use(userRoutes);
router.use(entriesRoutes);

export default router;
