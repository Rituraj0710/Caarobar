import { z } from 'zod';
import { sendOtp } from '../services/otp.service';
const RequestOtpSchema = z.object({
    identifier: z.string().min(3), // email or phone
});
export async function requestOtp(req, res, next) {
    try {
        const parsed = RequestOtpSchema.parse(req.body);
        const { identifier } = parsed;
        const { masked, ttlSeconds } = await sendOtp(identifier);
        return res.status(200).json({ success: true, destination: masked, ttlSeconds });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=auth.controller.js.map