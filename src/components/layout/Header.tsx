import { Search, Bell, User, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-[#1e293b] bg-transparent backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex items-center flex-1 max-w-md relative group">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 group-focus-within:text-purple-400 transition-colors" />
        <input 
          type="text" 
          placeholder="Search global shorts, trends, or scripts..." 
          className="w-full bg-[#1e293b]/50 border border-slate-700/50 text-sm text-slate-200 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:bg-[#1e293b] focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-sans placeholder:text-slate-500"
        />
      </div>
      
      <div className="flex items-center gap-5">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300 transition-all text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Script AI</span>
        </button>

        <div className="h-6 w-px bg-slate-700/50"></div>

        <button className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors rounded-full hover:bg-slate-800/50">
          <Bell className="w-4 h-4" />
          <span className="absolute top-[6px] right-[6px] w-[6px] h-[6px] bg-rose-500 rounded-full border border-[#0f1115]"></span>
        </button>
        
        <button className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-rose-500 p-[2px] shadow-sm">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border border-black/50">
               <User className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        </button>
      </div>
    </header>
  );
}
