'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Define routes that should NOT have the global header and footer
  const hideHeaderFooter = pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard');

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
