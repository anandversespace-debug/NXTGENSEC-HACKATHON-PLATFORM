'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from '@/components/ui/Loader';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] space-y-6">
        <Loader className="scale-125" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 italic">Verifying Access...</p>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};
