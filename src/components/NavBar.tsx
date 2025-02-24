import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Button } from './ui/button';

export function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-zinc-800 border-zinc-700 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white">
              Task Manager
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/tasks">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-zinc-700">
                    Tasks
                  </Button>
                </Link>
                <Button 
                  onClick={logout}
                  variant="outline"
                  className="border-zinc-600 text-white hover:bg-zinc-700"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-zinc-700">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    variant="outline"
                    className="border-zinc-600 text-white hover:bg-zinc-700"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}