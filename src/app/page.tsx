"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Video, TrendingUp, Users, Eye, Play, Sparkles, Flame, Clock, FileText, Key, ToyBrick, ExternalLink } from "lucide-react";
import { ScriptList } from "@/components/dashboard/ScriptList";

const stats = [
  { name: "분석된 총 비디오 수", value: "8,924", icon: Video, color: "text-purple-400", bg: "bg-purple-500/10" },
  { name: "평균 조회수 (상위 30개)", value: "420만", icon: Eye, color: "text-rose-400", bg: "bg-rose-500/10" },
  { name: "생성된 스크립트", value: "342", icon: Sparkles, color: "text-amber-400", bg: "bg-amber-500/10" },
  { name: "글로벌 도달률", value: "12억", icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

const topShortsMock = [
  { id: 1, title: "월 1천만원 버는 AI 에이전시 구축하기", views: "1240만", duration: "0:58", score: 98, hook: "강력한 감정 자극" },
  { id: 2, title: "아무도 모르는 아이폰 비밀 기능", views: "810만", duration: "0:45", score: 95, hook: "호기심 유발" },
  { id: 3, title: "24시간 동안 드랍쉬핑 도전하기", views: "650만", duration: "0:59", score: 92, hook: "높은 리스크의 도전" },
  { id: 4, title: "근성장을 망치는 3가지 헬스장 실수", views: "520만", duration: "0:41", score: 88, hook: "부정적인 프레이밍" },
  { id: 5, title: "나의 간단한 아침 루틴", views: "480만", duration: "0:55", score: 85, hook: "미적 비주얼" },
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
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [topShortsList, setTopShortsList] = useState<any[]>([]);

  const formatViews = (viewsStr: string) => {
    if (!viewsStr) return '0';
    if (typeof viewsStr === 'string' && viewsStr.includes('만')) return viewsStr;
    const num = parseInt(viewsStr);
    if (isNaN(num)) return viewsStr;
    if (num >= 10000) return (num / 10000).toFixed(1) + "만";
    return num.toLocaleString();
  };

  useEffect(() => {
    const fetchTopShorts = async () => {
      try {
        const res = await fetch('/api/shorts?limit=5');
        const data = await res.json();
        if (data.success && data.shorts && data.shorts.length > 0) {
          setTopShortsList(data.shorts);
        } else {
          setTopShortsList(topShortsMock);
        }
      } catch (e) {
        setTopShortsList(topShortsMock);
      }
    };
    fetchTopShorts();
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/scripts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      if (res.ok) {
        setRefreshTrigger(prev => prev + 1);
        setTopic("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">플랫폼 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400">오버뷰</span></h1>
          <p className="text-slate-400 text-sm">다시 오신 것을 환영합니다. 오늘 글로벌 쇼츠 생태계에서 일어나는 일들입니다.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700">
            리포트 내보내기
          </button>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-rose-500 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2">
            <Play className="w-4 h-4" />
            <span>비디오 생성</span>
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

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
         <Link href="/mcp" className="glass border border-emerald-900/40 bg-emerald-900/10 rounded-2xl p-5 hover:bg-emerald-900/20 hover:border-emerald-500/30 transition-all flex items-center justify-between group">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 group-hover:scale-105 transition-transform">
               <ToyBrick className="w-6 h-6 text-emerald-400" />
             </div>
             <div>
               <h3 className="text-white font-bold text-base flex items-center gap-2">MCP 스튜디오 연동 <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" /></h3>
               <p className="text-sm text-slate-400 mt-1">Model Context Protocol 서버 및 확장 기능 관리 센터</p>
             </div>
           </div>
         </Link>
         <Link href="/settings" className="glass border border-purple-900/40 bg-purple-900/10 rounded-2xl p-5 hover:bg-purple-900/20 hover:border-purple-500/30 transition-all flex items-center justify-between group">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30 group-hover:scale-105 transition-transform">
               <Key className="w-6 h-6 text-purple-400" />
             </div>
             <div>
               <h3 className="text-white font-bold text-base flex items-center gap-2">시스템 API 키 설정 <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-colors" /></h3>
               <p className="text-sm text-slate-400 mt-1">OpenAI, YouTube 등 자동화 핵심 인증 키 통합 관리</p>
             </div>
           </div>
         </Link>
      </div>

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
              <h3 className="text-lg font-bold text-white">오늘의 글로벌 인기 쇼츠</h3>
            </div>
            <button className="text-xs text-purple-400 hover:text-purple-300 font-medium">전체 목록 보기</button>
          </div>
          <div className="p-0 overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/30 text-xs text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4 font-semibold">비디오 주제</th>
                  <th className="px-6 py-4 font-semibold">조회수</th>
                  <th className="px-6 py-4 font-semibold">AI 점수</th>
                  <th className="px-6 py-4 font-semibold">핵심 요인</th>
                  <th className="px-6 py-4 font-semibold">동작</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {topShortsList.map((short: any) => (
                  <tr key={short.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-28 rounded-lg bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-700/50 group-hover:border-purple-500/50 transition-colors">
                          {short.thumbnailUrl && <img src={short.thumbnailUrl} className="w-full h-full object-cover opacity-80" alt={short.title} />}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                          <div className="absolute bottom-2 right-2 z-20 flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white">
                            <Clock className="w-3 h-3" /> {short.duration ? short.duration.replace("PT", "").toLowerCase() : "N/A"}
                          </div>
                        </div>
                        <span className="font-semibold text-sm text-slate-200 line-clamp-2 leading-snug">{short.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-slate-300">{formatViews(short.viewCount || short.views)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-rose-500 rounded-full" 
                            style={{ width: `${short.analysis?.overallScore || short.score || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-white">{short.analysis?.overallScore || short.score || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700 max-w-[150px] truncate block">
                        {short.analysis?.hookAnalysis?.slice(0, 15) ? short.analysis.hookAnalysis.slice(0, 15) + "..." : short.hook}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-xs bg-purple-500/10 text-purple-400 hover:bg-purple-500 border border-purple-500/20 hover:text-white px-3 py-1.5 rounded-lg transition-all font-medium whitespace-nowrap">
                        분석
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
            AI 인사이트 엔진
          </h3>
          
          <div className="flex-1 flex flex-col justify-center items-center text-center pb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 mb-6 flex items-center justify-center relative shadow-2xl">
              <div className="absolute inset-0 bg-purple-500/10 rounded-2xl animate-pulse"></div>
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">자동화된 스크립트 생성</h4>
            <p className="text-sm text-slate-400 mb-6">오늘 최고의 성과를 내는 요인을 기반으로 전환율이 높은 스크립트를 만듭니다.</p>
            
            <div className="w-full space-y-3">
              <input 
                type="text" 
                placeholder="어떤 주제로 만들까요?" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#1e293b]/50 border border-slate-700/50 text-sm text-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-sans placeholder:text-slate-500 text-left"
                disabled={isGenerating}
              />
              <button 
                onClick={handleGenerate} 
                disabled={isGenerating || !topic.trim()}
                className="w-full relative group overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 p-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
                <div className="relative bg-slate-900 rounded-lg py-3 px-4 flex items-center justify-center gap-2">
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  )}
                  <span className="text-sm font-semibold text-white">
                    {isGenerating ? "생성 중..." : "새 스크립트 생성"}
                  </span>
                </div>
              </button>
            </div>
          </div>
          
          <div className="mt-auto pt-4 border-t border-slate-800/60">
             <div className="flex items-center justify-between text-xs text-slate-400">
                <span>모델 상태</span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> GPT-4o 활성
                </span>
             </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6 ml-2">
          <FileText className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">최근 생성된 스크립트 목록</h2>
        </div>
        <ScriptList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
