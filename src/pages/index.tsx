import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to Task Manager
          </h1>
          
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl">
            A simple and efficient way to manage your daily tasks. Keep track of your progress and stay organized.
          </p>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
            {user ? (
              <Link href="/tasks">
                <Button size="lg" className="bg-zinc-700 hover:bg-zinc-600">
                  Go to Tasks
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button size="lg" className="bg-zinc-700 hover:bg-zinc-600">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-zinc-700 text-white hover:bg-zinc-800"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-zinc-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Easy to Use</h3>
              <p className="text-zinc-400">
                Simple interface to manage your tasks without any complications
              </p>
            </div>
            <div className="p-6 bg-zinc-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Stay Organized</h3>
              <p className="text-zinc-400">
                Keep track of all your tasks in one centralized location
              </p>
            </div>
            <div className="p-6 bg-zinc-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Secure</h3>
              <p className="text-zinc-400">
                Your tasks are private and protected with secure authentication
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
