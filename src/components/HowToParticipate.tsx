import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Ticket, Gift, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const HowToParticipate: React.FC = () => {
  const { setAuthModalOpen, setAuthModalMode, currentUser, setFreeEntryModalOpen, contests, setSelectedContest } = useApp();

  const handleStartNow = () => {
    if (!currentUser) {
      setAuthModalMode('register');
      setAuthModalOpen(true);
    } else {
      const active = contests.find((c) => c.status === 'active') || contests[0];
      if (active) {
        setSelectedContest(active);
        setFreeEntryModalOpen(true);
      }
    }
  };

  const steps = [
    {
      step: '১',
      title: 'বিনামূল্যে অ্যাকাউন্ট তৈরি করুন',
      desc: 'আপনার সচল মোবাইল নম্বর দিয়ে ১ মিনিটে একটি ফ্রি অ্যাকাউন্ট খুলুন। কোনো প্রকার রেজিস্ট্রেশন ফি বা গোপন খরচ নেই।',
      icon: UserCheck,
      badge: 'সহজ ও ফ্রি',
    },
    {
      step: '২',
      title: 'পছন্দের মোবাইল ও টিকিট কোড নিন',
      desc: 'স্যামসাং, আইফোন বা শাওমি যা আপনার পছন্দ, নির্বাচন করে ৫০ টাকায় টিকিট বুক করুন। সাথে সাথে আপনার ড্যাশবোর্ডে লাকি টিকিট কোড যুক্ত হবে।',
      icon: Ticket,
      badge: 'ইনস্ট্যান্ট টিকিট',
    },
    {
      step: '৩',
      title: 'ফলাফল ঘোষণা ও মোবাইল বুঝে নিন',
      desc: 'কাউন্টডাউন শেষ হলে সম্পূর্ণ স্বচ্ছ ও নিরপেক্ষ কোডের মাধ্যমে ফলাফল বের হবে। বিজয়ী হলে আমাদের টিম ফ্রি হোম ডেলিভারি দিয়ে যাবে।',
      icon: Gift,
      badge: 'ফ্রি হোম ডেলিভারি',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-950 via-[#0B132B] to-[#080E1E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>৩টি সহজ ধাপে সম্পন্ন করুন</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            কীভাবে <span className="text-amber-400">অংশগ্রহণ করবেন?</span>
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            কোনো জটিলতা ছাড়াই মাত্র ২ মিনিটে এই সহজ প্রক্রিয়ার মাধ্যমে অংশ নিয়ে আপনার স্বপ্নের ফোন জেতার চেষ্টা শুরু করুন।
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
              >
                {/* Step Number Watermark */}
                <div className="absolute top-4 right-5 text-4xl sm:text-5xl font-black text-slate-800/80 select-none group-hover:text-amber-500/10 transition-colors">
                  {item.step}
                </div>

                <div>
                  {/* Step Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Badge */}
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-amber-300 border border-slate-700 mb-2.5">
                    {item.badge}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>ধাপ {item.step} সম্পূর্ণ করুন</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Start Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleStartNow}
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>এখনই অংশগ্রহণ শুরু করুন</span>
          </button>
        </div>

      </div>
    </section>
  );
};
