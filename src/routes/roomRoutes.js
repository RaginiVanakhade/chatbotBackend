import express from 'express';
import { getRooms } from '../controllers/roomController.js';
import { authenticateToken } from '../middlewares/authMiddlewares.js';

const router = express.Router();
router.get('/', authenticateToken, getRooms);

export default router;