import type { Metadata } from 'next';
import { Content, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import ContentSite from '@/components/ContentSite';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Wings SW',
  description:
    'Want parallettes? Get some very quick and easy. Cheap and comfortable.',
  icons: {
    icon: '/wings.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/ico" sizes="16x16" href="/wings.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContentSite>{children}</ContentSite>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
