"use client";

import { motion } from "framer-motion";
import { Key, Save, CheckCircle2, AlertCircle, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [keys, setKeys] = useState({ openai: "", youtube: "", elevenlabs: "" });
  const [validating, setValidating] = useState(false);
  const [status, setStatus] = useState<any>({
    openai: { valid: null, message: "" },
    youtube: { valid: null, message: "" },
    elevenlabs: { valid: null, message: "" }
  });

  const handleValidation = async () => {
    setValidating(true);
    // Reset status briefly for re-validation feel
    setStatus({
      openai: { valid: null, message: "" },
      youtube: { valid: null, message: "" },
      elevenlabs: { valid: null, message: "" }
    });

    try {
      const res = await fetch('/api/settings/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keys)
      });
      const data = await res.json();
      if (data.success) {
        setStatus(data.results);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setValidating(false);
    }
  };

  const getStatusIcon = (fieldStatus: { valid: boolean | null, message: string }) => {
    if (fieldStatus.valid === true) return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (fieldStatus.valid === false) return <AlertCircle className="w-5 h-5 text-rose-500" />;
    return null;
  };

  const getInputClass = (fieldStatus: { valid: boolean | null, message: string }, defaultColor: string) => {
    let focusClass = `focus:border-${defaultColor}-500/50 focus:ring-${defaultColor}-500/50`;
    let borderClass = 'border-slate-700/80';
    
    if (fieldStatus.valid === true) {
      borderClass = 'border-emerald-500/50 text-emerald-100';
      focusClass = 'focus:border-emerald-500/50 focus:ring-emerald-500/50';
    } else if (fieldStatus.valid === false) {
      borderClass = 'border-rose-500/50 text-rose-100 bg-rose-500/5';
      focusClass = 'focus:border-rose-500/50 focus:ring-rose-500/50';
    }
    
    return `w-full bg-[#0a0c10] border ${borderClass} text-sm text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 transition-all font-mono placeholder:text-slate-600 ${focusClass}`;
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
        
        <div className="space-y-8 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-300">OpenAI API Key <span className="text-rose-500">*</span></label>
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                 키 발급받기 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="relative">
              <input 
                type="password" 
                placeholder="sk-..." 
                value={keys.openai}
                onChange={(e) => setKeys({...keys, openai: e.target.value})}
                className={getInputClass(status.openai, 'purple')}
              />
              <div className="absolute right-3 top-3">
                 {getStatusIcon(status.openai)}
              </div>
            </div>
            <div className="flex justify-between items-start">
              <p className="text-xs text-slate-500">대본 생성 및 유튜브 메타데이터 분석을 위해 필요합니다.</p>
              {status.openai.message && (
                <span className={`text-xs font-semibold ${status.openai.valid ? 'text-emerald-400' : 'text-rose-400'}`}>{status.openai.message}</span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-300">YouTube Data API v3 Key <span className="text-rose-500">*</span></label>
              <a href="https://console.cloud.google.com/apis/library/youtube.googleapis.com" target="_blank" rel="noreferrer" className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors">
                 키 발급받기 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="relative">
              <input 
                type="password" 
                placeholder="AIzaSy..." 
                value={keys.youtube}
                onChange={(e) => setKeys({...keys, youtube: e.target.value})}
                className={getInputClass(status.youtube, 'rose')}
              />
              <div className="absolute right-3 top-3">
                 {getStatusIcon(status.youtube)}
              </div>
            </div>
            <div className="flex justify-between items-start">
              <p className="text-xs text-slate-500">일일 글로벌 쇼츠 트렌드 수집을 위해 필요합니다.</p>
              {status.youtube.message && (
                <span className={`text-xs font-semibold ${status.youtube.valid ? 'text-emerald-400' : 'text-rose-400'}`}>{status.youtube.message}</span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-300">ElevenLabs API Key <span className="text-slate-500 font-normal ml-1">(선택 사항)</span></label>
              <a href="https://elevenlabs.io/app/settings/api-keys" target="_blank" rel="noreferrer" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
                 키 발급받기 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="relative">
              <input 
                type="password" 
                placeholder="본인 계정의 API 키 입력..." 
                value={keys.elevenlabs}
                onChange={(e) => setKeys({...keys, elevenlabs: e.target.value})}
                className={getInputClass(status.elevenlabs, 'amber')}
              />
              <div className="absolute right-3 top-3">
                 {getStatusIcon(status.elevenlabs)}
              </div>
            </div>
            <div className="flex justify-between items-start">
               <p className="text-xs text-slate-500">프리미엄 AI 성우 음성(TTS) 생성을 원할 경우 사용됩니다.</p>
               {status.elevenlabs.message && (
                 <span className={`text-xs font-semibold ${status.elevenlabs.valid ? 'text-emerald-400' : 'text-rose-400'}`}>{status.elevenlabs.message}</span>
               )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-slate-800/80 pt-6 relative z-10">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
             <AlertCircle className="w-4 h-4" /> 유효하지 않은 키를 등록하면 수집 및 분석 기능이 마비될 수 있습니다.
          </div>
          <button 
            onClick={handleValidation}
            disabled={validating || (!keys.openai && !keys.youtube && !keys.elevenlabs)}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {validating ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> 유효성 검증 중...</>
            ) : (
              <><CheckCircle2 className="w-4 h-4" /> 키 일괄 저장 및 테스트</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
