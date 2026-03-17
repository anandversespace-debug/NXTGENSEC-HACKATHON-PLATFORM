'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  const router = require('next/navigation').useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          
          // Redirect to onboarding if not completed and not already on onboarding page
          if (userData && !userData.onboarded && window.location.pathname !== '/onboarding') {
            router.push('/onboarding');
          }
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking custom auth session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [setUser, setLoading, router]);

  return <>{children}</>;
};
