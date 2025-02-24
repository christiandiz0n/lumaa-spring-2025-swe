import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    
    try {
      await login(username, password);
    } catch (err) {
      // The error message comes from login.ts API endpoint
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-800 rounded-lg shadow-lg p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Login</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-zinc-700 text-white placeholder:text-zinc-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-zinc-700 text-white placeholder:text-zinc-400"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-zinc-700 hover:bg-zinc-600 text-white"
          >
            Login
          </Button>
        </form>

        <div className="text-center text-zinc-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-white hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
