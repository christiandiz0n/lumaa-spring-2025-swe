// lib/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    username: string;
  };
}

interface JWTPayload {
  id: string;
  username: string;
}

export async function getUserFromToken(req: NextApiRequest) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, username: true }
    });

    return user;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

// Middleware to protect API routes
export const withAuth = (
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const user = await getUserFromToken(req);
      
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      req.user = user;
      return handler(req, res);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
};

// Utility function to verify JWT token
export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  } catch (error) {
    return null;
  }
};

// Utility function to generate JWT token
export const generateToken = (user: { id: string; username: string }): string => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );
};