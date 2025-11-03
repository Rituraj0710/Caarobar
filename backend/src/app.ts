import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use(errorHandler);

export default app;

