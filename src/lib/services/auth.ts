import { fetchWithAuth } from '@/lib/fetchWithAuth';

interface User {
  id: string;
  username: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse | { error: string}> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      return { error: "Invalid"}
    }
    
    return response.json();
  },

  register: async (username: string, password: string): Promise<User> => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    return response.json();
  },

  verifyToken: async (): Promise<User> => {
    const response = await fetchWithAuth('/api/auth/verify');
    return response.json();
  },
};