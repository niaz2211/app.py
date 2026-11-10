import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LuckyWheel, WheelCandidate } from './LuckyWheel';
import { X, Sparkles, Trophy, ShieldCheck, HelpCircle, CheckCircle2 } from 'lucide-react';

export const WheelOfFortuneModal: React.FC = () => {
  const { luckyWheelModalOpen, setLuckyWheelModalOpen, contests, entries, winners, siteSettings } = useApp();
  const [selectedContestId, setSelectedContestId] = useState<string>(contests[0]?.id || '');
  const [lastDrawnWinner, setLastDrawnWinner] = useState<WheelCandidate | null>(null);

  if (!luckyWheelModalOpen) return null;

  const isWheelEnabled = siteSettings.luckyWheelEnabled !== false;

  const currentContest = contests.find((c) => c.id === selectedContestId) || contests[0];

  // Candidates for this contest
  const contestEntries = entries.filter((e) => e.contestId === currentContest?.id && e.status !== 'rejected');
  
  const candidates: WheelCandidate[] = contestEntries.length >= 4
    ? contestEntries.slice(0, 10).map((e) => ({
        id: e.id,
        name: e.userName,
        ticketNumber: e.ticketNumber,
        phone: e.userPhone.substring(0, 5) + '-****' + e.userPhone.substring(e.userPhone.length - 2),
      }))
    : [
        { id: '1', name: 'মোঃ তানভীর আহমেদ', ticketNumber: 'TKT-78291', phone: '০১৭১১-****৮৯' },
        { id: '2', name: 'ফারহানা ইসলাম তন্বী', ticketNumber: 'TKT-45210', phone: '০১৮২২-****১২' },
        { id: '3', name: 'সাকিব আল হাসান', ticketNumber: 'TKT-90184', phone: '০১৯১১-****৪৫' },
        { id: '4', name: 'কামরুল ইসলাম', ticketNumber: 'TKT-33419', phone: '০১৭০১-****১২' },
        { id: '5', name: 'নুসরাত জাহান মিম', ticketNumber: 'TKT-88123', phone: '০১৮১২-****৩৪' },
        { id: '6', name: 'রাকিবুল হাসান', ticketNumber: 'TKT-67018', phone: '০১৯১৫-****৭৮' },
        { id: '7', name: 'মেহজাবীন চৌধুরী', ticketNumber: 'TKT-19402', phone: '০১৭৯৯-****১১' },
        { id: '8', name: 'জাহিদুল ইসলাম', ticketNumber: 'TKT-55201', phone: '০১৬৭৭-****২২' },
      ];

  const handleWinnerSelected = (winner: WheelCandidate) => {
    setLastDrawnWinner(winner);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#0B132B] border border-amber-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(245,158,11,0.2)] text-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setLuckyWheelModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>১০০% নিরপেক্ষ লাইভ ড্র প্ল্যাটফর্ম</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            🎡 হুইল অফ ফরচুন (ভাগ্যচক্র ড্র)
          </h2>
          <p className="text-xs text-slate-400">
            স্বচ্ছ ক্রিপ্টোগ্রাফিক অ্যালগরিদম ও লাকি হুইল ঘুরিয়ে প্রতিটি সক্রিয় কনটেস্টের বিজয়ী নির্বাচিত হয়।
          </p>
        </div>

        {/* Body Content */}
        {!isWheelEnabled ? (
          <div className="py-12 px-4 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl shadow-inner">
              🎡
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-amber-300">লাকি হুইল ড্র সাময়িকভাবে স্থগিত</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                সম্মানিত গ্রাহক, নিয়মিত টিকিট ভেরিফিকেশন ও পরবর্তী মেগা ড্র এর প্রস্তুতির জন্য অ্যাডমিন কর্তৃক বর্তমানে লাকি হুইল ড্র বন্ধ রাখা হয়েছে। পরবর্তী ড্র এর সময়সূচি অফিশিয়াল নোটিসে প্রকাশ করা হবে।
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setLuckyWheelModalOpen(false)}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Contest Selector Bar */}
            <div className="mb-5 p-2 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-slate-300 pl-2">কনটেস্ট বেছে নিন:</span>
              <select
                value={selectedContestId}
                onChange={(e) => {
                  setSelectedContestId(e.target.value);
                  setLastDrawnWinner(null);
                }}
                className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-amber-300 font-bold focus:border-amber-400 cursor-pointer"
              >
                {contests.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.brand} {c.model} ({c.entryFee})
                  </option>
                ))}
              </select>
            </div>

            {/* Wheel Component */}
            <div className="flex justify-center mb-6">
              <LuckyWheel
                candidates={candidates}
                onWinnerSelected={handleWinnerSelected}
                prizeTitle={`${currentContest?.brand} ${currentContest?.model} ড্র`}
              />
            </div>
          </>
        )}

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2 p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>১০০% নিরপেক্ষ সফটওয়্যার ড্র</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
            <span>সরাসরি অফিসিয়াল ব্র্যান্ডের মোবাইল</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>ফ্রি হোম ডেলিভারি ও ওয়ারেন্টি</span>
          </div>
        </div>

      </div>
    </div>
  );
};
