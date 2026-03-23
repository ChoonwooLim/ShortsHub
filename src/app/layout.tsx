import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'ShortsHub | High-End Automation',
  description: 'AI-Powered YouTube Shorts Agency Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased min-h-screen flex bg-[#0a0c10] text-slate-200 selection:bg-purple-500/30 selection:text-white">
        {/* Ambient background glow */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-900/5 blur-[120px]"></div>
        </div>
        
        <Sidebar />
        
        <div className="flex-1 ml-64 flex flex-col min-h-screen relative z-10 w-[calc(100%-16rem)] max-w-full">
          <Header />
          <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
