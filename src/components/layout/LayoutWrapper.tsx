'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Define routes that should NOT have the global header and footer
  const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password', '/verify', '/onboarding'];
  const hideHeaderFooter = 
    pathname?.startsWith('/admin') || 
    pathname?.startsWith('/dashboard') || 
    pathname?.startsWith('/organizer') || 
    authRoutes.some(route => pathname === route || pathname?.startsWith(route));

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
