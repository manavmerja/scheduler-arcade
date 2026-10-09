import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '🕹️ Scheduler Arcade — OS CPU Algorithm Battle & Concept Engine',
  description: 'Interactive Operating System CPU Scheduling Game & Visual Gantt Chart Engine featuring FCFS, SJF, Priority, and Round Robin.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950 pb-20 md:pb-8">
        {children}
      </body>
    </html>
  );
}
