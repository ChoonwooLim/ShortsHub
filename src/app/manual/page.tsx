"use client";

import { motion } from "framer-motion";
import { BookOpen, Play, Sparkles, Database, FileText, LayoutDashboard, CheckCircle2, Flame } from "lucide-react";

export default function ManualPage() {
  return (
    <div className="pb-10 max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
          ShortsHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400">사용 설명서</span>
        </h1>
        <p className="text-slate-400 text-lg">초보자도 쉽게 따라 할 수 있는 자동화 시스템 완전 정복 웹 매뉴얼</p>
      </div>

      <div className="space-y-8">
        {/* Section 1 */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass border border-slate-800 rounded-3xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
               <LayoutDashboard className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">1. 메인 대시보드(오버뷰) 이해하기</h2>
          </div>
          
          <div className="space-y-4 text-slate-300 leading-relaxed relative z-10 text-[15px]">
            <p>
              ShortsHub의 첫 화면인 <strong>오버뷰(Overview)</strong>는 현재 글로벌 유튜브 쇼츠 시장에서 가장 반응이 좋은 트렌드를 한눈에 분석하고 반영해 보여주는 메인 컨트롤 센터입니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 transition-all hover:bg-slate-800/60">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2"><Flame className="w-5 h-5 text-rose-400"/> 오늘의 인기 쇼츠</h3>
                <p className="text-sm text-slate-400 leading-relaxed">오버뷰 하단의 표(Table)에는 현재 전 세계에서 가장 높은 조회수와 AI 점수를 기록한 주요 쇼츠들의 주제와 '핵심 요인(훅)'이 정리되어 있습니다.</p>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 transition-all hover:bg-slate-800/60">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber-400"/> AI 분석 점수</h3>
                <p className="text-sm text-slate-400 leading-relaxed">쇼츠 영상이 왜 터졌는지(Viral 요인)를 AI가 분석하여 1~100점 사이의 점수로 표기해줍니다. 점수가 높을수록 현재 사람들에게 잘 통하는 포맷을 의미합니다.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2 */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass border border-slate-800 rounded-3xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
               <Sparkles className="w-6 h-6 text-rose-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">2. 나만의 자동 스크립트 만들기</h2>
          </div>
          
          <div className="space-y-8 text-slate-300 leading-relaxed relative z-10 text-[15px]">
            <p>
              가장 강력한 기능 중 하나인 <strong>자동화된 스크립트 생성기</strong>를 사용하여 단 몇 초만에 사람들의 이목을 끄는 바이럴 대본을 디자인할 수 있습니다.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 border border-slate-700 shadow-inner">1</div>
                <div className="pt-2">
                  <h4 className="font-semibold text-white text-lg">원하는 주제 입력하기</h4>
                  <p className="text-[15px] text-slate-400 mt-2 leading-relaxed">대시보드 우측의 <strong className="text-purple-400 font-semibold">AI 인사이트 엔진</strong> 부분에 있는 입력창에 원하는 영상 주제를 자유롭게 적습니다. <br/><span className="text-slate-500 text-sm mt-1 inline-block">(예: "다이어트 정체기 극복법", "부자가 되는 3가지 비밀")</span></p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 border border-slate-700 shadow-inner">2</div>
                <div className="pt-2">
                  <h4 className="font-semibold text-white text-lg">클릭 및 AI 대기</h4>
                  <p className="text-[15px] text-slate-400 mt-2 leading-relaxed">입력창 바로 아래의 <strong>새 스크립트 생성</strong> 버튼을 클릭하세요! 버튼에 '생성 중...' 로딩 표시가 나타나며, AI가 가장 유행하는 패턴을 심층 분석하여 완벽한 대본을 만듭니다.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 border border-emerald-500/30 shadow-inner"><CheckCircle2 className="w-5 h-5" /></div>
                <div className="pt-2">
                  <h4 className="font-semibold text-white text-lg">완성된 결과물 확인</h4>
                  <p className="text-[15px] text-slate-400 mt-2 leading-relaxed">로딩이 끝난 뒤 화면 맨 아래로 내려가면 <strong className="text-purple-400 font-semibold">최근 생성된 스크립트 목록</strong>에 방금 만든 결과가 표시됩니다. 해당 항목을 터치해 클릭하면 초반 3초 훅(Hook), 본문, CTA(콜투액션) 영역이 즉시 펼쳐집니다.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 3 */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass border border-slate-800 rounded-3xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
               <Database className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">3. 생성된 데이터 보관 및 관리</h2>
          </div>
          
          <div className="space-y-4 text-slate-300 leading-relaxed relative z-10 text-[15px]">
            <p>
              ShortsHub 플랫폼에서 버튼을 한 번 클릭해 생성한 모든 스크립트는 자체 내장된 <strong>안전한 데이터베이스(Prisma & DB)</strong>에 영구적으로 자동 보관됩니다. 깜빡하고 브라우저 창을 닫더라도 데이터가 절대 사라지지 않습니다.
            </p>
            <div className="bg-[#0a0c10] border border-slate-800 rounded-xl p-6 mt-6">
              <h4 className="text-base font-bold text-slate-300 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-400"/>
                이후 업데이트 예정 기능 (Next Steps)
              </h4>
              <ul className="list-disc list-inside text-slate-400 text-[15px] space-y-3 pl-2 marker:text-purple-500">
                <li>생성된 텍스트 스크립트를 기반으로 한 <strong className="text-slate-300">AI 성우(음성) 및 영상을 실제로 이어 붙이는 렌더링</strong> 기능 구축 예정</li>
                <li>오버뷰 메인 화면 외에 좌측 메뉴의 '스크립트 스튜디오' 전용 공간에서 스크립트를 한꺼번에 편집하고 관리할 수 있도록 시스템 업데이트</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
