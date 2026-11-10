import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ContestPrize } from '../types';
import {
  Smartphone,
  Sparkles,
  Clock,
  Cpu,
  Camera,
  Battery,
  HardDrive,
  Info,
  ShieldCheck,
  CheckCircle,
  X,
} from 'lucide-react';

export const PrizesSection: React.FC = () => {
  const {
    contests,
    setFreeEntryModalOpen,
    setSelectedContest,
    getUserEntries,
    currentUser,
    setDepositModalOpen,
    setAuthModalOpen,
    setAuthModalMode,
    siteSettings,
    showToast,
  } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'upcoming'>('all');
  const [detailModalContest, setDetailModalContest] = useState<ContestPrize | null>(null);

  const userEntries = getUserEntries();

  const filteredContests = contests.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.status === activeFilter;
  });

  const handleClaimEntry = (contest: ContestPrize) => {
    if (!currentUser) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      showToast('টিকিট কিনতে অনুগ্রহ করে আগে আপনার অ্যাকাউন্টে লগইন বা রেজিস্ট্রেশন করুন।', 'info');
      return;
    }

    const fee = parseInt(siteSettings.entryFeeAmount || '50', 10) || 50;
    const balance = currentUser.balance || 0;

    if (balance < fee) {
      showToast(`আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই (বর্তমান ব্যালেন্স: ৳${balance})। টিকিট কিনতে আগে ডিপোজিট করুন।`, 'error');
      setDepositModalOpen(true);
      return;
    }

    setSelectedContest(contest);
    setFreeEntryModalOpen(true);
  };

  return (
    <section id="contests-section" className="py-16 sm:py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>আকর্ষণীয় পুরস্কার গ্যালারি</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            চলতি সপ্তাহের <span className="text-amber-400">পুরস্কার ও মোবাইল তালিকা</span>
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            আপনার পছন্দের অ্যান্ড্রয়েড ও আইওএস ফ্ল্যাগশিপ ফোনটি বেছে নিন। প্রতিটি মোবাইল ১০০% অফিসিয়াল ইনট্যাক্ট বক্স এবং ফুল ওয়ারেন্টিসহ প্রদান করা হবে।
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              সবগুলো মোবাইল ({contests.length})
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'active'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              সক্রিয় প্রতিযোগিতা ({contests.filter((c) => c.status === 'active').length})
            </button>
            <button
              onClick={() => setActiveFilter('upcoming')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'upcoming'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              আসন্ন কনটেস্ট
            </button>
          </div>
        </div>

        {/* Contest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredContests.map((contest) => {
            const hasEntered = userEntries.some((e) => e.contestId === contest.id);

            return (
              <div
                key={contest.id}
                className="group relative bg-gradient-to-b from-slate-900 via-slate-900 to-[#0B132B] rounded-3xl border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
              >
                {/* Top Image Banner */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                  <img
                    src={contest.image}
                    alt={contest.model}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full text-xs font-bold text-amber-400 border border-amber-500/40">
                      {contest.brand}
                    </span>

                    {contest.status === 'active' ? (
                      <span className="px-3 py-1 bg-emerald-500/90 text-slate-950 rounded-full text-xs font-black shadow-md">
                        সক্রিয় ড্র
                      </span>
                    ) : contest.status === 'upcoming' ? (
                      <span className="px-3 py-1 bg-sky-500/90 text-slate-950 rounded-full text-xs font-black shadow-md">
                        আসন্ন
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-amber-500/90 text-slate-950 rounded-full text-xs font-black shadow-md">
                        বিজয়ী ঘোষিত
                      </span>
                    )}
                  </div>

                  {/* Market price pill */}
                  <div className="absolute bottom-3 left-3.5 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">বাজার মূল্য: </span>
                    <span className="font-bold text-amber-400 font-mono">{contest.marketPrice}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                      {contest.model}
                    </h3>

                    {/* Key Specs Pills */}
                    <div className="grid grid-cols-2 gap-2 mt-3.5 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/60 p-2 rounded-xl">
                        <Camera className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{contest.specs.camera.split(' ')[0]} {contest.specs.camera.split(' ')[1] || 'ক্যামেরা'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/60 p-2 rounded-xl">
                        <HardDrive className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{contest.specs.ramRom.split('+')[0] || contest.specs.ramRom}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/60 p-2 rounded-xl">
                        <Battery className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{contest.specs.battery.split(' ')[0]} ব্যাটারি</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/60 p-2 rounded-xl">
                        <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{contest.specs.processor.split(' ')[0]} চিপ</span>
                      </div>
                    </div>

                    {/* Participants & Ticket count info */}
                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div className="text-slate-400">
                        অংশগ্রহণ করেছেন: <span className="font-bold text-white font-mono">{contest.totalParticipants}</span> জন
                      </div>
                      <div className="text-emerald-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        যাচাইকৃত
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-2 space-y-2">
                    {hasEntered ? (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center text-xs text-emerald-400 font-bold flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        আপনার টিকিট নিশ্চিত করা আছে!
                      </div>
                    ) : (
                      <button
                        onClick={() => handleClaimEntry(contest)}
                        className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-2xl shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                      >
                        <Sparkles className="w-4 h-4 text-slate-950" />
                        টিকিট কিনুন
                      </button>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDetailModalContest(contest)}
                        className="flex-1 py-2 px-3 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-xl text-xs font-semibold transition-all border border-slate-700/80 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-amber-400" />
                        সম্পূর্ণ স্পেসিফিকেশন
                      </button>

                      <button
                        onClick={() => handleClaimEntry(contest)}
                        className="py-2 px-3 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 rounded-xl text-[11px] font-bold border border-amber-500/30 transition-all cursor-pointer"
                      >
                        অফিসিয়াল এন্ট্রি
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Full Specs Modal */}
      {detailModalContest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-[#0B132B] border border-amber-500/30 rounded-3xl p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setDetailModalContest(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  {detailModalContest.brand}
                </span>
                <h3 className="text-xl font-black text-white">{detailModalContest.model}</h3>
              </div>
            </div>

            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs mb-5">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">ডিসপ্লে:</span>
                <span className="font-semibold text-white text-right">{detailModalContest.specs.display}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">মেমোরি ও স্টোরেজ:</span>
                <span className="font-semibold text-white text-right">{detailModalContest.specs.ramRom}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">ক্যামেরা সেটআপ:</span>
                <span className="font-semibold text-white text-right">{detailModalContest.specs.camera}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">ব্যাটারি ও চার্জার:</span>
                <span className="font-semibold text-white text-right">{detailModalContest.specs.battery}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">প্রসেসর / চিপসেট:</span>
                <span className="font-semibold text-white text-right">{detailModalContest.specs.processor}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">আনুমানিক মার্কেট মূল্য:</span>
                <span className="font-bold text-amber-400 text-right">{detailModalContest.marketPrice}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setDetailModalContest(null);
                handleClaimEntry(detailModalContest);
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              এই ফোনের টিকিট কিনুন (৳৫০)
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
