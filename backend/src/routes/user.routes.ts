import { Router } from 'express';
import { getMe, verifyToken } from '../controllers/user.controller';

const router = Router();

router.get('/me', verifyToken, getMe);

export default router;
