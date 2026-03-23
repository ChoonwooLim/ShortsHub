"use client";

import { motion } from "framer-motion";
import { Play, Sparkles, Wand2, Scissors, Layers, Settings2, Download, RefreshCcw, Save } from "lucide-react";

export default function ScriptStudio() {
  return (
    <div className="pb-10 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400">Script Studio</span>
            <span className="bg-purple-500/20 text-purple-400 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest border border-purple-500/30">Beta</span>
          </h1>
          <p className="text-slate-400 text-sm">Generate, edit, and orchestrate high-converting shorts scripts powered by today's viral data.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700 flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-rose-500 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 animate-pulse group-hover:bg-transparent transition-colors"></div>
            <Play className="w-4 h-4 z-10" />
            <span className="z-10">Render Video</span>
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Left Column: Script Editor */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass border border-slate-800 rounded-2xl flex flex-col overflow-hidden relative"
        >
          <div className="h-14 border-b border-slate-800 bg-slate-900/50 flex items-center px-4 justify-between shrink-0">
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-md bg-slate-800 text-sm text-white font-medium">Editor</button>
              <button className="px-3 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/50 text-sm font-medium transition-colors">Storyboard</button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors">
                <Wand2 className="w-4 h-4" />
              </button>
              <button className="px-3 py-1.5 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Auto-Enhance
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto">
            <input 
              type="text" 
              defaultValue="How to Build a $10K/mo AI Agency"
              className="w-full bg-transparent text-2xl font-bold text-white mb-6 border-none outline-none placeholder:text-slate-600"
            />
            
            <div className="space-y-6">
              <div className="group relative">
                <div className="absolute -left-3 top-2 w-1 h-full bg-rose-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-xs text-rose-400 font-bold uppercase tracking-widest mb-1 ml-1 flex justify-between items-center">
                  [0:00 - 0:03] The Hook
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 gap-2 flex">
                    <RefreshCcw className="w-3 h-3 hover:text-white cursor-pointer" />
                    <Scissors className="w-3 h-3 hover:text-white cursor-pointer" />
                  </span>
                </p>
                <textarea 
                  className="w-full bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500/50 resize-none font-medium leading-relaxed"
                  rows={2}
                  defaultValue="Stop doing cold outreach. Nobody is reading your DMs anyway. If you want to build a 10K a month AI agency in 2026, here is the exact 3-step blueprint."
                />
              </div>

              <div className="group relative">
                <div className="absolute -left-3 top-2 w-1 h-full bg-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-xs text-purple-400 font-bold uppercase tracking-widest mb-1 ml-1 flex justify-between items-center">
                  [0:03 - 0:45] The Value
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 gap-2 flex">
                    <RefreshCcw className="w-3 h-3 hover:text-white cursor-pointer" />
                    <Scissors className="w-3 h-3 hover:text-white cursor-pointer" />
                  </span>
                </p>
                <textarea 
                  className="w-full bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500/50 resize-none leading-relaxed h-48"
                  defaultValue="First, don't sell generic chatbots. Sell automated workflows. Find local businesses that still use paper forms or manual scheduling and automate their entire un-boarding using n8n and OpenAI. Second, use the 'Trojan Horse' strategy. Build a small, free automation tool for them first. Show them it works to build trust. Third, charge a setup fee and a monthly retainer for maintenance..."
                />
              </div>

              <div className="group relative">
                <div className="absolute -left-3 top-2 w-1 h-full bg-amber-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-widest mb-1 ml-1 flex justify-between items-center">
                  [0:45 - 0:60] The CTA
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 gap-2 flex">
                    <RefreshCcw className="w-3 h-3 hover:text-white cursor-pointer" />
                    <Scissors className="w-3 h-3 hover:text-white cursor-pointer" />
                  </span>
                </p>
                <textarea 
                  className="w-full bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-none leading-relaxed"
                  rows={2}
                  defaultValue="I put together a free guide with 5 templates you can copy and paste today. Comment 'AGENCY' and I'll dm it to you."
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Settings & Assets */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass border border-slate-800 rounded-2xl flex flex-col overflow-hidden"
        >
          <div className="h-14 border-b border-slate-800 bg-slate-900/50 flex items-center px-5 shrink-0">
             <h3 className="text-sm font-bold text-white flex items-center gap-2">
               <Settings2 className="w-4 h-4 text-slate-400" /> Generation Settings
             </h3>
          </div>
          
          <div className="p-5 flex-1 overflow-y-auto space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Voice Model</label>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-purple-500/50 transition-colors">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                     <Play className="w-3 h-3 text-white ml-0.5" />
                   </div>
                   <div>
                     <p className="text-sm font-medium text-white">Adam (ElevenLabs)</p>
                     <p className="text-[10px] text-slate-400">Deep, Engaging, Professional</p>
                   </div>
                </div>
                <div className="text-purple-400 text-xs font-bold">Change</div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visual Style</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-purple-500/20 border border-purple-500/50 rounded-xl p-3 cursor-pointer text-center">
                   <p className="text-sm font-medium text-purple-400 mb-1">B-Roll Heavy</p>
                   <p className="text-[10px] text-slate-400">Cinematic stock footage</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 hover:border-slate-600 rounded-xl p-3 cursor-pointer text-center transition-colors">
                   <p className="text-sm font-medium text-slate-300 mb-1">Faceless AI</p>
                   <p className="text-[10px] text-slate-400">Generated AI presenter</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Music & Pacing</label>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                 <div className="flex justify-between text-xs text-slate-300 mb-2">
                   <span>Pacing (Fast)</span>
                   <span className="text-purple-400 font-bold">1.2x</span>
                 </div>
                 <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                   <div className="bg-purple-500 w-[80%] h-full rounded-full"></div>
                 </div>
                 
                 <div className="flex items-center gap-2 mb-1">
                   <Layers className="w-4 h-4 text-slate-400" />
                   <span className="text-sm text-slate-200">Phonk / Aggressive</span>
                 </div>
                 <p className="text-[10px] text-slate-500 ml-6">High retention for this topic</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/60">
               <button className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2">
                 <Download className="w-4 h-4" /> Export Script as PDF
               </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
