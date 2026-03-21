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
      
      // Quick hydration from cookie if available
      const getCookie = (name: string) => {
        if (typeof document === 'undefined') return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return JSON.parse(decodeURIComponent(parts.pop()?.split(';').shift() || "null"));
        return null;
      };

      const cachedUser = getCookie('nxg_user_data');
      if (cachedUser) setUser(cachedUser);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/users/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include'
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          
          if (userData && !userData.onboarded && window.location.pathname !== '/onboarding') {
            router.push('/onboarding');
          }
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error('[AUTH_SYNC_ERROR]', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [setUser, setLoading, router]);

  return <>{children}</>;
};
