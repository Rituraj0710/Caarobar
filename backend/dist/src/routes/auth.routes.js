import { Router } from 'express';
import { requestOtp } from '../controllers/auth.controller';
const router = Router();
router.post('/request-otp', requestOtp);
export default router;
//# sourceMappingURL=auth.routes.js.map