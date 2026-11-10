import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Smartphone, Sparkles, Trophy, User } from 'lucide-react';

export const BottomMobileNav: React.FC = () => {
  const { view, setView, currentUser, isAdmin, setAuthModalOpen, setSelectedContest, contests, setFreeEntryModalOpen } = useApp();

  const handleQuickFreeEntry = () => {
    // Pick the featured active contest or first active
    const featured = contests.find((c) => c.featured && c.status === 'active') || contests[0];
    if (featured) {
      setSelectedContest(featured);
      setFreeEntryModalOpen(true);
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B132B]/95 backdrop-blur-lg border-t border-amber-500/20 px-2 py-1 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* Home */}
        <button
          onClick={() => {
            setView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${
            view === 'home' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">হোম</span>
        </button>

        {/* Contests */}
        <button
          onClick={() => {
            setView('contests');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${
            view === 'contests' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smartphone className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">মোবাইল</span>
        </button>

        {/* Center Floating Action Button: Quick Paid Entry */}
        <button
          onClick={handleQuickFreeEntry}
          className="relative -top-3 flex flex-col items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] border-2 border-[#0B132B] active:scale-95 transition-transform cursor-pointer"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="text-[9px] font-black -mt-0.5">টিকিট কিনুন</span>
        </button>

        {/* Winners */}
        <button
          onClick={() => {
            setView('winners');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${
            view === 'winners' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">বিজয়ী</span>
        </button>

        {/* Profile / Dashboard with Strict RBAC */}
        <button
          onClick={() => {
            if (isAdmin && currentUser?.role === 'admin') {
              setView('admin-dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (currentUser) {
              setView('user-dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              setAuthModalOpen(true);
            }
          }}
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${
            view === 'user-dashboard' || view === 'admin-dashboard' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">
            {isAdmin && currentUser?.role === 'admin' ? 'অ্যাডমিন' : currentUser ? 'প্রোফাইল' : 'লগইন'}
          </span>
        </button>

      </div>
    </div>
  );
};
