"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Video, BarChart2, FileText, Settings, LayoutDashboard, BookOpen, Key, ToyBrick } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "오버뷰", href: "/", icon: LayoutDashboard },
  { name: "일일 쇼츠", href: "/shorts", icon: Video },
  { name: "AI 리포트", href: "/reports", icon: BarChart2 },
  { name: "스크립트 스튜디오", href: "/studio", icon: FileText },
  { name: "MCP 스튜디오", href: "/mcp", icon: ToyBrick },
  { name: "API 설정", href: "/settings", icon: Key },
  { name: "사용 설명서", href: "/manual", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 border-r border-[#1e293b] bg-[#0f1115]/80 backdrop-blur-xl z-50 flex flex-col">
      <div className="flex h-16 items-center px-6 border-b border-[#1e293b]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Shorts<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400">Hub</span></span>
        </Link>
      </div>
      
      <nav className="p-4 space-y-1 mt-4 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className="relative block">
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-purple-500/10 border border-purple-500/20 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative z-10 ${
                  isActive ? "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-purple-400" : ""}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mb-4 mt-auto">
        <div className="glass-card rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex justify-between items-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">자동화</p>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white tracking-tighter">124</span>
            <span className="text-xs text-slate-400 mb-1">비디오/월</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-rose-500 w-[80%] h-full rounded-full relative">
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
