"use client";

import { motion } from "framer-motion";
import { BarChart2, Filter, Search, Download, ArrowRight, Video } from "lucide-react";

export default function Reports() {
  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">AI Analysis <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400">Reports</span></h1>
          <p className="text-slate-400 text-sm">Deep dive into what makes videos go viral, powered by GPT-4o analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="bg-slate-800/50 border border-slate-700/50 text-sm text-slate-200 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all font-sans"
            />
          </div>
          <button className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="glass border border-slate-800 rounded-2xl p-6 group hover:border-purple-500/30 transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <BarChart2 className="w-24 h-24 text-purple-500 blur-sm" />
            </div>
            
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-16 rounded overflow-hidden bg-slate-800 border border-slate-700/50">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div>
                   <h3 className="text-white font-bold line-clamp-1 text-sm">Testing Viral Hooks</h3>
                   <p className="text-xs text-slate-400 mt-0.5">Analyzed 2 hours ago</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/20">
                Score: 94
              </span>
            </div>

            <div className="space-y-3 relative z-10 mb-6">
               <div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Key Growth Driver</p>
                 <p className="text-sm text-slate-300">Negative framing in first 3s creates curiosity gap. Fast pacing (every 1.2s cuts) retains viewers.</p>
               </div>
               <div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Target Audience</p>
                 <p className="text-sm text-slate-300 items-center flex gap-1"><span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span> Young Professionals (18-24)</p>
               </div>
            </div>

            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between relative z-10">
               <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                 <Download className="w-3 h-3" /> Export PDF
               </button>
               <button className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors group-hover:translate-x-1 duration-300">
                 View Full Report <ArrowRight className="w-3 h-3" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
