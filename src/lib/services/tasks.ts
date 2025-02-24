import { fetchWithAuth } from '@/lib/fetchWithAuth';

export interface Task {
  id: string;
  title: string;
  description?: string;
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export const tasksService = {
  getTasks: async (): Promise<Task[]> => {
    const response = await fetchWithAuth('/api/tasks');
    return response.json();
  },

  createTask: async (data: { title: string; description?: string }): Promise<Task> => {
    const response = await fetchWithAuth('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  updateTask: async (id: string, data: Partial<Task>): Promise<Task> => {
    const response = await fetchWithAuth(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteTask: async (id: string): Promise<Task> => {
    const response = await fetchWithAuth(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};
