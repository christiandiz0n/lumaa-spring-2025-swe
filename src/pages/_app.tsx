import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';
import { NavBar } from '@/components/NavBar';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-zinc-900 text-white">
        <NavBar />
        <main className="container mx-auto px-4 py-8">
          <Component {...pageProps} />
        </main>
      </div>
    </AuthProvider>
  );
}

export default MyApp;