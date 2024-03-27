import { ReactNode } from 'react';

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-emerald-800 via-teal-950  to-blue-950 p-24'>
      {children}
    </main>
  );
}
