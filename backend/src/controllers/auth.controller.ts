import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { PrismaClient, Role } from '@prisma/client';
import { sendOtp, getStoredOtp } from '../services/otp.service';
import { env } from '../env';

const prisma = new PrismaClient();

const RequestOtpSchema = z.object({
  identifier: z.string().min(3), // email or phone
});

const VerifyOtpSchema = z.object({
  identifier: z.string().min(3),
  otp: z.string().length(4),
});

export async function requestOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = RequestOtpSchema.parse(req.body);
    const { identifier } = parsed;

    const { masked, ttlSeconds } = await sendOtp(identifier);

    return res.status(200).json({ success: true, destination: masked, ttlSeconds });
  } catch (err) {
    next(err);
  }
}

export async function verifyOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = VerifyOtpSchema.parse(req.body);
    const { identifier, otp } = parsed;

    // TEMP DEV BYPASS — ONLY ENABLED WHEN DEV_BYPASS_ENABLED===true AND NODE_ENV!=='production'
    if (env.DEV_BYPASS_ENABLED && env.NODE_ENV !== 'production') {
      if (identifier === env.DEV_BYPASS_IDENTIFIER) {
        console.info(`Dev bypass used for identifier ${identifier.slice(0, 3)}***`);
        
        // Find or create dev user
        let user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: identifier },
              { phone: identifier }
            ]
          }
        });

        if (!user) {
          // Create dev user if doesn't exist
          const isEmail = identifier.includes('@');
          user = await prisma.user.create({
            data: {
              name: env.DEV_BYPASS_NAME,
              email: isEmail ? identifier : `dev-${identifier}@example.com`,
              phone: isEmail ? `+91${identifier}` : identifier,
              role: Role.ADMIN,
            }
          });
        }

        // Generate JWT token
        const token = jwt.sign(
          { 
            userId: user.id, 
            email: user.email, 
            phone: user.phone,
            role: user.role 
          },
          env.JWT_SECRET,
          { expiresIn: '7d' }
        );

        return res.status(200).json({
          success: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status
          }
        });
      }
    }

    // Normal OTP verification flow
    const storedOtp = getStoredOtp(identifier);
    
    if (!storedOtp) {
      return res.status(400).json({ 
        success: false, 
        error: 'OTP not found or expired' 
      });
    }

    if (storedOtp.code !== otp) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid OTP' 
      });
    }

    if (Date.now() > storedOtp.expiresAt) {
      return res.status(400).json({ 
        success: false, 
        error: 'OTP expired' 
      });
    }

    // Find user by identifier
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier }
        ]
      }
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        phone: user.phone,
        role: user.role 
      },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status
      }
    });

  } catch (err) {
    next(err);
  }
}

