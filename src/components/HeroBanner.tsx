import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Flame,
  ArrowRight,
  Gift,
  CheckCircle,
  Smartphone,
  Award,
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const {
    contests,
    setFreeEntryModalOpen,
    setSelectedContest,
    setView,
    siteSettings,
    currentUser,
    setDepositModalOpen,
    setAuthModalOpen,
    setAuthModalMode,
    showToast,
    setLuckyWheelModalOpen,
  } = useApp();

  // Find the top featured contest (Samsung Galaxy S25 Ultra or iPhone)
  const featured = contests.find((c) => c.featured && c.status === 'active') || contests[0];

  // Countdown timer state initialized from siteSettings
  const [timeLeft, setTimeLeft] = useState(() => {
    if (siteSettings.countdownTargetDate) {
      const diff = new Date(siteSettings.countdownTargetDate).getTime() - Date.now();
      if (diff > 0) {
        return {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        };
      }
    }
    return {
      days: siteSettings.countdownDays ?? 3,
      hours: siteSettings.countdownHours ?? 14,
      minutes: siteSettings.countdownMinutes ?? 42,
      seconds: siteSettings.countdownSeconds ?? 18,
    };
  });

  // Re-sync when admin updates countdown timer in siteSettings
  useEffect(() => {
    if (siteSettings.countdownTargetDate) {
      const diff = new Date(siteSettings.countdownTargetDate).getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
        return;
      }
    }
    setTimeLeft({
      days: siteSettings.countdownDays ?? 3,
      hours: siteSettings.countdownHours ?? 14,
      minutes: siteSettings.countdownMinutes ?? 42,
      seconds: siteSettings.countdownSeconds ?? 18,
    });
  }, [
    siteSettings.countdownDays,
    siteSettings.countdownHours,
    siteSettings.countdownMinutes,
    siteSettings.countdownSeconds,
    siteSettings.countdownTargetDate,
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBuyTicket = () => {
    // 1. If user is not logged in -> open login modal
    if (!currentUser) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      showToast('টিকিট কিনতে অনুগ্রহ করে আগে আপনার অ্যাকাউন্টে লগইন বা রেজিস্ট্রেশন করুন।', 'info');
      return;
    }

    const fee = parseInt(siteSettings.entryFeeAmount || '50', 10) || 50;
    const balance = currentUser.balance || 0;

    // 2. If user account does not have enough balance -> redirect directly to deposit modal
    if (balance < fee) {
      showToast(`আপনার অ্যাকাউন্টে পর্যাপ্ত টাকা নেই (বর্তমান ব্যালেন্স: ৳${balance})। টিকিট কিনতে আগে ৳${fee} ডিপোজিট করুন।`, 'error');
      setDepositModalOpen(true);
      return;
    }

    // 3. User has enough balance -> proceed to buy ticket!
    if (featured) {
      setSelectedContest(featured);
      setFreeEntryModalOpen(true);
    }
  };

  // Convert numbers to Bengali digits
  const toBn = (num: number) => {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num
      .toString()
      .padStart(2, '0')
      .split('')
      .map((d) => bnDigits[parseInt(d, 10)] || d)
      .join('');
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 bg-gradient-to-b from-[#0B132B] via-[#0E1A3D] to-[#070D1E]">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Floating Alert / Notification Banner */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-md text-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> মেগা অফার:
            </span>
            <span className="text-slate-200 truncate max-w-xs sm:max-w-md font-medium">
              {siteSettings.marqueeNotice}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>১০০% নিরপেক্ষ ও সুরক্ষিত অফিশিয়াল প্রতিযোগিতা</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <span className="block text-amber-400 text-base sm:text-xl font-bold tracking-wide">
                🔥 {siteSettings.tagline || 'বাংলাদেশের সবচেয়ে বিশ্বস্ত ড্র প্ল্যাটফর্ম'}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                  {siteSettings.heroHeadline || 'আপনার স্বপ্নের মোবাইল জিতুন!'}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {siteSettings.heroSubheadline || 'স্যামসাং গ্যালাক্সি S25 আল্ট্রা এবং আইফোন ১৬ প্রো ম্যাক্স এর মতো প্রিমিয়াম ফ্ল্যাগশিপ স্মার্টফোন এখন আপনার হাতের নাগালে। আজই অংশ নিন!'}
            </p>

            {/* Live Countdown Timer Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-amber-500/40 backdrop-blur-md shadow-[0_0_30px_rgba(245,158,11,0.12)] max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="flex items-center gap-1.5 font-bold text-amber-300">
                  <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                  {siteSettings.countdownTitle || 'লাইভ মেগা ড্র শেষ হতে বাকি:'}
                </span>
                <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  সক্রিয় রাউন্ড
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 shadow-inner group hover:border-amber-500/40 transition-colors">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">{toBn(timeLeft.days)}</div>
                  <div className="text-[10px] text-slate-400 font-medium">দিন</div>
                </div>
                <div className="bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 shadow-inner group hover:border-amber-500/40 transition-colors">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">{toBn(timeLeft.hours)}</div>
                  <div className="text-[10px] text-slate-400 font-medium">ঘণ্টা</div>
                </div>
                <div className="bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 shadow-inner group hover:border-amber-500/40 transition-colors">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">{toBn(timeLeft.minutes)}</div>
                  <div className="text-[10px] text-slate-400 font-medium">মিনিট</div>
                </div>
                <div className="bg-slate-950/90 p-2.5 rounded-xl border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono tracking-tight animate-pulse">{toBn(timeLeft.seconds)}</div>
                  <div className="text-[10px] text-amber-300/80 font-medium">সেকেন্ড</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
              <button
                onClick={handleBuyTicket}
                className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
                <span>টিকিট কিনুন</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setView('contests');
                  window.scrollTo({ top: 700, behavior: 'smooth' });
                }}
                className="py-3.5 px-5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>সবগুলো মোবাইল</span>
              </button>

              <button
                onClick={() => setLuckyWheelModalOpen(true)}
                className={`py-3.5 px-5 rounded-2xl font-bold text-sm border transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg group ${
                  siteSettings.luckyWheelEnabled !== false
                    ? 'bg-gradient-to-r from-purple-900/40 via-amber-900/30 to-purple-900/40 hover:from-purple-900/60 hover:to-amber-900/50 text-amber-300 border-amber-500/40 shadow-purple-500/10'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                <span className="text-base group-hover:rotate-45 transition-transform">🎡</span>
                <span>{siteSettings.luckyWheelEnabled !== false ? 'লাইভ হুইল ড্র' : 'হুইল ড্র (স্থগিত)'}</span>
              </button>
            </div>

            {/* Quick Guarantees checklist */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
              <button
                onClick={() => {
                  setView('certifications');
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer font-semibold"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>ট্রেড লাইসেন্স ও সরকারি ভেরিফাইড</span>
              </button>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>ফ্রি হোম ডেলিভারি</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Android Phone Presentation Device Frame */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Glowing circular backdrop */}
            <div className="relative w-72 sm:w-84 md:w-92">
              
              {/* Outer decorative card */}
              <div className="relative z-10 bg-gradient-to-b from-slate-900 via-slate-900 to-[#101C3D] p-3.5 rounded-[40px] border-2 border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.25)]">
                
                {/* Phone Notch / Speaker bar */}
                <div className="w-24 h-4 bg-slate-950 mx-auto rounded-b-xl mb-2 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-800 mr-2" />
                  <div className="w-8 h-1 bg-slate-800 rounded-full" />
                </div>

                {/* Main Phone Image Display */}
                <div className="relative rounded-[28px] overflow-hidden bg-slate-950 aspect-[9/16] max-h-[460px]">
                  <img
                    src={siteSettings.heroCustomMobile?.image || siteSettings.heroPhoneImage || featured?.image || 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80'}
                    alt={siteSettings.heroCustomMobile?.model || featured?.model || 'Smart Phone'}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />

                  {/* Top floating badge on phone screen */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md rounded-full text-[10px] font-bold text-amber-300 border border-amber-500/40">
                      {siteSettings.heroCustomMobile?.badge || '🏆 গ্র্যান্ড প্রাইজ'}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 rounded-full text-[10px] font-black">
                      {siteSettings.heroCustomMobile?.entryFee || '৫০ টাকা ড্র'}
                    </span>
                  </div>

                  {/* Bottom glass overlay on phone screen */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                    <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                      {siteSettings.heroCustomMobile?.brand || featured?.brand || 'Smartphone'}
                    </div>
                    <div className="text-white text-lg font-black">
                      {siteSettings.heroCustomMobile?.model || featured?.model}
                    </div>
                    <div className="text-slate-300 text-xs mt-0.5">
                      বাজার মূল্য: <span className="text-amber-300 font-bold">{siteSettings.heroCustomMobile?.marketPrice || featured?.marketPrice}</span>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">অংশগ্রহণকারী:</span>
                      <span className="text-emerald-400 font-bold font-mono">
                        {siteSettings.heroCustomMobile?.totalParticipants || featured?.totalParticipants || 1842}+ জন
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Winner notification chip on side */}
              <div className="absolute -bottom-4 -left-4 sm:-left-8 z-20 bg-slate-900/95 border border-amber-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white">সর্বশেষ বিজয়ী: তানভীর</div>
                  <div className="text-amber-400 font-medium text-[10px]">Samsung S24 Ultra (ঢাকা)</div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
