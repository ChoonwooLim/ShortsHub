"use client";

import { motion } from "framer-motion";
import { Video, TrendingUp, Users, Eye, Play, Sparkles, Flame, Clock } from "lucide-react";

const stats = [
  { name: "Total Videos Analyzed", value: "8,924", icon: Video, color: "text-purple-400", bg: "bg-purple-500/10" },
  { name: "Average Views (Top 30)", value: "4.2M", icon: Eye, color: "text-rose-400", bg: "bg-rose-500/10" },
  { name: "Scripts Generated", value: "342", icon: Sparkles, color: "text-amber-400", bg: "bg-amber-500/10" },
  { name: "Global Reach", value: "1.2B", icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

const topShorts = [
  { id: 1, title: "How to Build a $10K/mo AI Agency", views: "12.4M", duration: "0:58", score: 98, hook: "Strong emotional trigger" },
  { id: 2, title: "The Secret iPhone Feature Nobody Knows", views: "8.1M", duration: "0:45", score: 95, hook: "Curiosity gap" },
  { id: 3, title: "I Tried Dropshipping for 24 Hours", views: "6.5M", duration: "0:59", score: 92, hook: "High stakes challenge" },
  { id: 4, title: "3 Gym Mistakes Ruining Your Gains", views: "5.2M", duration: "0:41", score: 88, hook: "Negative framing" },
  { id: 5, title: "My simple morning routine", views: "4.8M", duration: "0:55", score: 85, hook: "Aesthetic visuals" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400">Overview</span></h1>
          <p className="text-slate-400 text-sm">Welcome back. Here's what's happening in the global Shorts ecosystem today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700">
            Export Report
          </button>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-rose-500 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2">
            <Play className="w-4 h-4" />
            <span>Generate Video</span>
          </button>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={item} className="glass border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-full blur-3xl -mr-8 -mt-8 transition-opacity opacity-50 group-hover:opacity-100`}></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-slate-400 text-sm font-medium">{stat.name}</span>
              <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <div className="flex items-baseline gap-2 relative z-10">
              <h2 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h2>
              <span className="text-emerald-400 text-xs font-semibold bg-emerald-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12%
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass border border-slate-800 rounded-2xl overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-bold text-white">Today's Top Global Shorts</h3>
            </div>
            <button className="text-xs text-purple-400 hover:text-purple-300 font-medium">View Full List</button>
          </div>
          <div className="p-0 overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/30 text-xs text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4 font-semibold">Video Topic</th>
                  <th className="px-6 py-4 font-semibold">Views</th>
                  <th className="px-6 py-4 font-semibold">AI Score</th>
                  <th className="px-6 py-4 font-semibold">Top Factor</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {topShorts.map((short) => (
                  <tr key={short.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-28 rounded-lg bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-700/50 group-hover:border-purple-500/50 transition-colors">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                          <div className="absolute bottom-2 right-2 z-20 flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white">
                            <Clock className="w-3 h-3" /> {short.duration}
                          </div>
                        </div>
                        <span className="font-semibold text-sm text-slate-200 line-clamp-2 leading-snug">{short.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-slate-300">{short.views}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-rose-500 rounded-full" 
                            style={{ width: `${short.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-white">{short.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                        {short.hook}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-xs bg-purple-500/10 text-purple-400 hover:bg-purple-500 border border-purple-500/20 hover:text-white px-3 py-1.5 rounded-lg transition-all font-medium">
                        Analyze
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass border border-slate-800 rounded-2xl p-6 flex flex-col relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 blur-[80px] rounded-full"></div>
          
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            AI Insights Engine
          </h3>
          
          <div className="flex-1 flex flex-col justify-center items-center text-center pb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 mb-6 flex items-center justify-center relative shadow-2xl">
              <div className="absolute inset-0 bg-purple-500/10 rounded-2xl animate-pulse"></div>
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Automated Script Generation</h4>
            <p className="text-sm text-slate-400 mb-6">Create high-converting scripts based on today's top performing factors.</p>
            
            <button className="w-full relative group overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 p-1 transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
              <div className="relative bg-slate-900 rounded-lg py-3 px-4 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-white">Generate 5 New Scripts</span>
              </div>
            </button>
          </div>
          
          <div className="mt-auto pt-4 border-t border-slate-800/60">
             <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Model Status</span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> GMT-4o Active
                </span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
