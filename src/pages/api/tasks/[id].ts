import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUserFromToken(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      
      const task = await prisma.task.delete({
        where: {
          id: id as string,
          userId: user.id // Ensure the task belongs to the user
        }
      });

      return res.status(200).json(task);
    } catch (error) {
      console.error('Error deleting task:', error);
      return res.status(500).json({ error: 'Failed to delete task' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { title, description, isComplete } = req.body;

      const task = await prisma.task.update({
        where: {
          id: id as string,
          userId: user.id // Ensure the task belongs to the user
        },
        data: {
          title,
          description,
          isComplete
        }
      });

      return res.status(200).json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      return res.status(500).json({ error: 'Failed to update task' });
    }
  }

  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}