import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error';
import authRouter from './routes/auth.routes';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => {
    res.json({ ok: true });
});
app.use('/auth', authRouter);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map