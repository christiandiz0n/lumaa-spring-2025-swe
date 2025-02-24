import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromToken } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    return res.json({ user });
  } catch (error) {
    console.error('Verify token error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}
