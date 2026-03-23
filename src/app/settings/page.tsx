"use client";

import { motion } from "framer-motion";
import { Key, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [keys, setKeys] = useState({ openai: "", youtube: "", elevenlabs: "" });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="pb-10 max-w-4xl mx-auto space-y-8">
      <div className="glass bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
            <Key className="w-5 h-5 text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">API 설정</h1>
        </div>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">외부 서비스(OpenAI, YouTube, TTS 등)와 통신하기 위한 보안 인증 키를 설정합니다.<br/>여기에 입력하신 API 키는 브라우저 내부 또는 안전한 데이터베이스에만 암호화되어 보관됩니다.</p>
      </div>

      <div className="glass border border-slate-800 rounded-3xl p-8 relative overflow-hidden bg-slate-900/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">OpenAI API Key <span className="text-rose-500">*</span></label>
            <input 
              type="password" 
              placeholder="sk-..." 
              value={keys.openai}
              onChange={(e) => setKeys({...keys, openai: e.target.value})}
              className="w-full bg-[#0a0c10] border border-slate-700/80 text-sm text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono placeholder:text-slate-600"
            />
            <p className="text-xs text-slate-500">대본 생성 및 유튜브 메타데이터 분석(Viral 요인 추출)을 위해 필요합니다.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">YouTube Data API v3 Key <span className="text-rose-500">*</span></label>
            <input 
              type="password" 
              placeholder="AIzaSy..." 
              value={keys.youtube}
              onChange={(e) => setKeys({...keys, youtube: e.target.value})}
              className="w-full bg-[#0a0c10] border border-slate-700/80 text-sm text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all font-mono placeholder:text-slate-600"
            />
            <p className="text-xs text-slate-500">일일 글로벌 쇼츠 트렌드 배열 및 통계(조회수, 좋아요 등) 수집을 위해 필요합니다.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">ElevenLabs API Key <span className="text-slate-500 font-normal ml-1">(선택 사항)</span></label>
            <input 
              type="password" 
              placeholder="본인 계정의 API 키 입력..." 
              value={keys.elevenlabs}
              onChange={(e) => setKeys({...keys, elevenlabs: e.target.value})}
              className="w-full bg-[#0a0c10] border border-slate-700/80 text-sm text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-mono placeholder:text-slate-600"
            />
            <p className="text-xs text-slate-500">비디오 렌더링 파이프라인에서 프리미엄 AI 성우 음성(TTS) 생성을 원할 경우 사용됩니다.</p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-slate-800/80 pt-6 relative z-10">
          {saved ? (
             <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                <CheckCircle2 className="w-4 h-4" /> 성공적으로 인증 키가 저장되었습니다
             </div>
          ) : (
             <div className="flex items-center gap-2 text-slate-500 text-xs">
                <AlertCircle className="w-4 h-4" /> 유효하지 않은 키를 등록하면 수집 및 분석 기능이 마비될 수 있습니다.
             </div>
          )}
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> 키 일괄 저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
