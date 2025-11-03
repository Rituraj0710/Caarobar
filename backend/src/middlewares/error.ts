import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'ValidationError', details: err.errors });
  }
  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(500).json({ error: 'InternalServerError' });
}

