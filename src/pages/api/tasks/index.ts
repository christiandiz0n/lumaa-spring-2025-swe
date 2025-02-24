// pages/api/tasks/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import type { AuthenticatedRequest } from '@/lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const userId = req.user!.id;

  if (req.method === 'GET') {
    try {
      const tasks = await prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          isComplete: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, description } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const task = await prisma.task.create({
        data: {
          title,
          description: description || null,
          userId,
          isComplete: false
        },
        select: {
          id: true,
          title: true,
          description: true,
          isComplete: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      return res.status(500).json({ error: 'Failed to create task' });
    }
  }

  // Handle unsupported HTTP methods
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

export default withAuth(handler);