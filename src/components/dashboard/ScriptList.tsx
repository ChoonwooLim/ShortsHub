"use client";

import { useEffect, useState } from 'react';
import { FileText, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface ScriptData {
  id: string;
  title: string;
  hook: string;
  bodyText: string;
  callToAction: string;
  status: string;
  createdAt: string;
}

export function ScriptList({ refreshTrigger }: { refreshTrigger: number }) {
  const [scripts, setScripts] = useState<ScriptData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchScripts();
  }, [refreshTrigger]);

  const fetchScripts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/scripts');
      const data = await res.json();
      if (data.success) {
        setScripts(data.scripts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading && scripts.length === 0) {
    return (
      <div className="w-full flex items-center justify-center p-12 glass border border-slate-800 rounded-2xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (scripts.length === 0) {
    return (
      <div className="w-full text-center p-12 border border-slate-800 border-dashed rounded-2xl bg-slate-900/20 glass">
        <FileText className="w-8 h-8 text-slate-600 mx-auto mb-3" />
        <p className="text-slate-400">아직 생성된 스크립트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {scripts.map((script) => (
        <div key={script.id} className="glass border border-slate-800 rounded-xl overflow-hidden transition-all bg-slate-900/40">
          <div 
            className="p-4 md:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
            onClick={() => setExpandedId(expandedId === script.id ? null : script.id)}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-rose-500/10 flex items-center justify-center border border-purple-500/20 flex-shrink-0">
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base md:text-lg tracking-tight">{script.title}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1.5">
                  <span className="flex items-center gap-1.5 font-medium"><Clock className="w-3.5 h-3.5" /> {new Date(script.createdAt).toLocaleDateString()}</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/80 font-semibold">{script.status}</span>
                </div>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              {expandedId === script.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
          
          {expandedId === script.id && (
            <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-900/60 space-y-5 text-sm">
              <div className="bg-[#0f1115] p-4 rounded-xl border border-slate-800/60 shadow-inner">
                <h5 className="text-xs font-bold font-mono text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>훅 (Hook)
                </h5>
                <p className="text-slate-200 text-base font-medium leading-relaxed">{script.hook}</p>
              </div>
              <div className="bg-[#0f1115] p-4 rounded-xl border border-slate-800/60 shadow-inner">
                <h5 className="text-xs font-bold font-mono text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>본문 (Body)
                </h5>
                <p className="text-slate-300 leading-relaxed text-[15px]">{script.bodyText}</p>
              </div>
              <div className="bg-[#0f1115] p-4 rounded-xl border border-slate-800/60 shadow-inner">
                <h5 className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>콜투액션 (CTA)
                </h5>
                <p className="text-slate-200 leading-relaxed italic">{script.callToAction}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
