"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Youtube, RefreshCw, Flame, ExternalLink, Activity, Sparkles, Clock } from "lucide-react";

export default function ShortsPage() {
  const [shorts, setShorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const formatViews = (viewsStr: string) => {
    if (!viewsStr) return '0';
    const num = parseInt(viewsStr);
    if (isNaN(num)) return viewsStr;
    if (num >= 10000) return (num / 10000).toFixed(1) + "만";
    return num.toLocaleString();
  };

  const loadShorts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/shorts');
      const data = await res.json();
      if (data.success) {
        setShorts(data.shorts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShorts();
  }, []);

  const handleFetchTrigger = async () => {
    if (fetching) return;
    setFetching(true);
    try {
      // 트리거 버튼 클릭 시 CRON API를 수동 호출하여 즉시 수집
      await fetch('/api/cron/daily-fetch');
      await loadShorts();
    } catch (e) {
      console.error("수집 에러:", e);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="pb-10 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 glass bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
              <Youtube className="w-5 h-5 text-rose-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">일일 글로벌 쇼츠</h1>
          </div>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">데이터베이스에 수집된 최신 글로벌 유튜브 쇼츠입니다.<br/>높은 조회수와 AI 분석 스코어를 갖춘 트렌드를 확인할 수 있습니다.</p>
        </div>
        
        <button 
          onClick={handleFetchTrigger} 
          disabled={fetching}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group whitespace-nowrap"
        >
          <RefreshCw className={`w-4 h-4 ${fetching ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          <span>{fetching ? "글로벌 수집 및 AI 분석 중..." : "최신 쇼츠 강제 수집 및 분석 실행"}</span>
        </button>
      </div>

      {loading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-500"></div>
        </div>
      ) : shorts.length === 0 ? (
        <div className="w-full text-center p-16 border border-slate-800 border-dashed rounded-3xl bg-slate-900/20 glass">
          <Youtube className="w-10 h-10 text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">저장된 쇼츠가 없습니다</h3>
          <p className="text-slate-400">우측 상단의 수집 실행 버튼을 눌러 글로벌 트렌드를 분석해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shorts.map((short, index) => (
            <motion.div 
              key={short.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition-colors bg-slate-900/40 flex flex-col"
            >
              <div className="relative aspect-video bg-slate-800 overflow-hidden border-b border-slate-800">
                {short.thumbnailUrl ? (
                  <img src={short.thumbnailUrl} alt={short.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                     <Youtube className="w-12 h-12 text-slate-700" />
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold text-white flex items-center gap-1.5 border border-white/10">
                  <Flame className="w-3 h-3 text-rose-500" />
                  {formatViews(short.viewCount)} 조회
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-white flex items-center gap-1 border border-white/10">
                  <Clock className="w-3 h-3" />
                  {short.duration ? short.duration.replace("PT", "").toLowerCase() : "N/A"}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"></div>
                <h3 className="text-slate-100 font-semibold text-base line-clamp-2 leading-snug mb-2 group-hover:text-purple-300 transition-colors z-10">
                  {short.title}
                </h3>
                
                <p className="text-xs text-slate-400 mb-4 line-clamp-1 z-10">{short.channelTitle}</p>
                
                {short.analysis ? (
                  <div className="mt-auto space-y-3 z-10">
                    <div className="flex items-center justify-between border-t border-slate-800/60 pt-3">
                      <span className="text-xs text-slate-500 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI 스코어</span>
                      <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">{short.analysis.overallScore} / 100</span>
                    </div>
                    <div className="bg-[#0a0c10] rounded-lg p-3 border border-slate-800/80">
                       <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                          <span className="font-bold text-rose-400 mr-2 uppercase tracking-wide">Hook</span> 
                          {short.analysis.hookAnalysis}
                       </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-auto pt-3 border-t border-slate-800/60 flex items-center gap-2 text-xs text-slate-500 italic z-10">
                    <Activity className="w-4 h-4" />
                    AI 분석 대기 중...
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
