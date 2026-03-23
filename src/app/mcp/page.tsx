"use client";

import { motion } from "framer-motion";
import { ToyBrick, Terminal, PlusCircle, CheckCircle, Database, Search, Chrome, Flame, ExternalLink } from "lucide-react";

export default function McpPage() {
  return (
    <div className="pb-10 max-w-5xl mx-auto space-y-8">
      <div className="glass bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <ToyBrick className="w-5 h-5 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">MCP 스튜디오 <span className="text-sm font-medium bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md align-middle ml-2">Beta</span></h1>
        </div>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">Model Context Protocol 서버 연동 통합 센터입니다.<br/>사용 중인 AI 에이전트(Claude 등)가 외부 도구, 시스템 파일, 혹은 타사 서비스 데이터와 상호작용하도록 권한을 관리합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Postgres MCP */}
        <div className="glass border border-emerald-900/50 rounded-3xl p-6 md:p-8 relative overflow-hidden bg-emerald-900/10 transition-colors">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-base font-bold text-white flex items-center gap-2"><Database className="w-5 h-5 text-emerald-400" /> PostgreSQL MCP</h3>
            <span className="px-2.5 py-1 rounded-md bg-emerald-900/40 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">장착 완료</span>
          </div>
          <p className="text-sm text-slate-400 mb-6 relative z-10 line-clamp-2">ShortsHub 데이터베이스(`localhost:51214`)에 실시간 연결되어 AI가 쿼리 및 스키마 분석을 수행합니다.</p>
          <div className="w-full flex items-center justify-between bg-[#0a0c10] border border-slate-800 rounded-xl px-4 py-2 relative z-10">
             <span className="text-xs text-slate-500 font-mono">Status: Connected</span>
             <span className="flex h-2 w-2 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
          </div>
        </div>

        {/* Puppeteer MCP */}
        <div className="glass border border-emerald-900/50 rounded-3xl p-6 md:p-8 relative overflow-hidden bg-emerald-900/10 transition-colors">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-base font-bold text-white flex items-center gap-2"><Chrome className="w-5 h-5 text-emerald-400" /> Puppeteer MCP</h3>
            <span className="px-2.5 py-1 rounded-md bg-emerald-900/40 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">장착 완료</span>
          </div>
          <p className="text-sm text-slate-400 mb-6 relative z-10 line-clamp-2">브라우저 자동화를 통해 YouTube, TikTok 페이지를 백그라운드에서 스크래핑하고 트렌드를 분석합니다.</p>
          <div className="w-full flex items-center justify-between bg-[#0a0c10] border border-slate-800 rounded-xl px-4 py-2 relative z-10">
             <span className="text-xs text-slate-500 font-mono">Status: Ready</span>
             <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </div>
        </div>

        {/* Brave Search MCP */}
        <div className="glass border border-rose-900/30 rounded-3xl p-6 md:p-8 relative overflow-hidden bg-rose-900/10 transition-colors">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-base font-bold text-white flex items-center gap-2"><Search className="w-5 h-5 text-rose-400" /> Brave Search</h3>
            <span className="px-2.5 py-1 rounded-md bg-rose-900/20 border border-rose-500/20 text-[10px] font-bold text-rose-400 uppercase tracking-widest">키 대기 중</span>
          </div>
          <p className="text-sm text-slate-400 mb-6 relative z-10 line-clamp-2">실시간 웹 검색을 통해 최신 바이럴 요소 및 글로벌 트렌드 정보를 AI에 컨텍스트로 주입합니다.</p>
          <a href="https://api.search.brave.com/app/keys" target="_blank" rel="noreferrer" className="w-full flex items-center justify-between bg-[#0a0c10] border border-rose-900/40 rounded-xl px-4 py-2.5 relative z-10 overflow-hidden cursor-pointer hover:border-rose-500 hover:bg-rose-500/5 transition-all group decoration-transparent">
             <span className="text-[11px] font-bold text-rose-400 truncate mr-2 group-hover:text-rose-300 flex items-center gap-1.5"><Search className="w-3 h-3" /> 키 발급받으러 가기</span>
             <ExternalLink className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
      
      <div className="glass border border-slate-800 rounded-3xl p-8 bg-slate-900/30 text-center mt-8 relative overflow-hidden flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-slate-300 mb-2">추가 커스텀 MCP 연결</h3>
        <p className="text-slate-500 text-sm mb-6">프로젝트 루트에 생성된 <code className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">mcp.json</code> 파일을 통해 장착된 목록을 확인하실 수 있습니다.<br/>원하시는 서버를 더 구성하려면 버튼을 눌러 프로필을 추가하세요.</p>
        <button className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-all border border-slate-700 hover:border-slate-500 flex items-center justify-center gap-2 group">
             <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" /> 새 프로필 추가하기
        </button>
      </div>
    </div>
  );
}
