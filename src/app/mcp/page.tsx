"use client";

import { motion } from "framer-motion";
import { ToyBrick, Terminal, PlusCircle, CheckCircle, Database } from "lucide-react";

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden bg-slate-900/40 opacity-70">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><Terminal className="w-5 h-5 text-slate-400" /> Filesystem MCP</h3>
            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-400">내장 모듈</span>
          </div>
          <p className="text-sm text-slate-400 mb-6">로컬 파일 시스템 접근 및 소스코드 제어를 뒷받침하는 핵심 확장 기능입니다.</p>
          <button className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-400 text-sm font-semibold border border-slate-700 cursor-not-allowed flex items-center justify-center gap-2">
             <CheckCircle className="w-4 h-4 text-emerald-500" /> 활성화됨
          </button>
        </div>

        <div className="glass border border-emerald-900/50 rounded-3xl p-6 md:p-8 relative overflow-hidden bg-emerald-900/10 hover:bg-emerald-900/20 transition-colors">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><ToyBrick className="w-5 h-5 text-emerald-400" /> 커스텀 MCP 연결</h3>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-sm text-slate-400 mb-6 relative z-10">Github 연동, Google Drive 검색, Jira 티켓 관리를 비롯해 원하는 클라우드 시스템을 AI와 직접 연결합니다.</p>
          <button className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2 relative z-10 group">
             <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" /> MCP 서버 프로필 추가
          </button>
        </div>
      </div>
      
      <div className="glass border border-slate-800 rounded-3xl p-8 bg-slate-900/30 text-center mt-8 relative overflow-hidden">
        <Database className="w-12 h-12 text-slate-700 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-300 mb-2">프레임워크 아키텍처 대기 중</h3>
        <p className="text-slate-500 text-sm">현재 모델 기반 내부 시스템 자원 확장이 백그라운드에 준비 완료되었습니다.<br/>CLI 명령어로 새로운 MCP 서버를 셋업하시면 이곳에 상태가 즉각 반영됩니다.</p>
      </div>
    </div>
  );
}
