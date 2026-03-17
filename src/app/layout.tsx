import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/layout/AuthProvider';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NxtGenSec Dev Division | Innovation Ecosystem',
  description: 'A professional decentralized hub for developers to showcase innovations, participate in global sprint challenges, and manage technical audits.',
  keywords: ['NxtGenSec', 'Innovation', 'Developer Hub', 'Hackathons', 'Project Showcase', 'Audit'],
  authors: [{ name: 'NxtGenSec Team' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
