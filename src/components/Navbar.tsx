import React, { useState } from 'react';
import { useApp, AppView } from '../context/AppContext';
import {
  Smartphone,
  Menu,
  X,
  User,
  ShieldAlert,
  LogOut,
  Sparkles,
  Ticket,
  CheckCircle2,
  ChevronRight,
  Wallet,
  PlusCircle,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    view,
    setView,
    currentUser,
    logoutUser,
    isAdmin,
    adminLogout,
    setAuthModalOpen,
    setAuthModalMode,
    setAdminLoginModalOpen,
    siteSettings,
    getUserEntries,
    setDepositModalOpen,
    setLuckyWheelModalOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const myEntries = getUserEntries();

  const navLinks: { label: string; viewTarget: AppView }[] = [
    { label: 'হোম', viewTarget: 'home' },
    { label: 'প্রতিযোগিতা', viewTarget: 'contests' },
    { label: 'সরকারি অনুমোদন', viewTarget: 'certifications' },
    { label: 'অংশগ্রহণের নিয়ম', viewTarget: 'how-to' },
    { label: 'আগের বিজয়ী', viewTarget: 'winners' },
    { label: 'নিয়মাবলি', viewTarget: 'rules' },
    { label: 'নোটিস', viewTarget: 'notices' },
    { label: 'FAQ', viewTarget: 'faq' },
    { label: 'যোগাযোগ', viewTarget: 'contact' },
  ];

  const handleNavClick = (target: AppView) => {
    setView(target);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B132B]/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl transition-all">
      {/* Top micro-bar for Verified Status and Legal Disclaimer info */}
      <div className="bg-gradient-to-r from-[#070E20] via-[#101C3D] to-[#070E20] border-b border-slate-800 text-[11px] py-1 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavClick('certifications')}
              className="flex items-center gap-1.5 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>ট্রেড লাইসেন্স ও সরকারি অনুমোদন ভেরিফাইড (ক্লিক করুন)</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-slate-400">
              হেল্পলাইন: <span className="text-amber-400 font-mono">{siteSettings.helplinePhone}</span>
            </span>
            
            {/* Admin entry trigger with Strict RBAC */}
            {!(isAdmin && currentUser?.role === 'admin') ? (
              <button
                onClick={() => setAdminLoginModalOpen(true)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-300 transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-slate-800/60"
                title="অ্যাডমিন অ্যাক্সেস"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400/80" />
                <span className="hidden xs:inline">অ্যাডমিন</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="flex items-center gap-1 text-[11px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded font-bold hover:bg-rose-500/30 transition-colors cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                অ্যাডমিন ড্যাশবোর্ড
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.35)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0B132B] rounded-[14px] flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-amber-400 group-hover:rotate-6 transition-transform" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0B132B] flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                <span className="text-amber-400">৫০ টাকায়</span> মোবাইল জিতুন
              </h1>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              আপনার স্বপ্নের স্মার্টফোন জেতার সেরা কনটেস্ট
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => {
            const isActive = view === item.viewTarget;
            return (
              <button
                key={item.viewTarget}
                onClick={() => handleNavClick(item.viewTarget)}
                className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10 shadow-[inset_0_0_12px_rgba(245,158,11,0.15)] border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => setLuckyWheelModalOpen(true)}
            className={`ml-1 px-3 py-1.5 rounded-xl text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              siteSettings.luckyWheelEnabled !== false
                ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/10 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-slate-800/80 text-slate-400 border border-slate-700 hover:text-slate-200'
            }`}
          >
            <span>🎡</span>
            <span>{siteSettings.luckyWheelEnabled !== false ? 'লাকি হুইল ড্র' : 'হুইল ড্র (স্থগিত)'}</span>
          </button>
        </nav>

        {/* User Auth / Dashboard Controls */}
        {/* User Auth / Dashboard Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              {isAdmin && currentUser.role === 'admin' ? (
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-black border transition-all cursor-pointer ${
                    view === 'admin-dashboard'
                      ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-500/25'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>অ্যাডমিন ড্যাশবোর্ড</span>
                </button>
              ) : (
                <>
                  {/* Wallet Balance & Quick Deposit */}
                  <div className="flex items-center gap-2 bg-slate-900/90 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs">
                    <Wallet className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="text-[10px] text-slate-400 block leading-tight">ব্যালেন্স</span>
                      <span className="font-bold text-amber-400 font-mono text-sm leading-tight">৳{currentUser.balance || 0}</span>
                    </div>
                    <button
                      onClick={() => setDepositModalOpen(true)}
                      className="ml-1 px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-lg text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      ডিপোজিট
                    </button>
                  </div>

                  <button
                    onClick={() => handleNavClick('user-dashboard')}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                      view === 'user-dashboard'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                        : 'bg-slate-800/80 text-amber-300 border-amber-500/30 hover:bg-slate-700'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>{currentUser.name}</span>
                    {myEntries.length > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] bg-amber-400 text-slate-950 rounded-full font-black">
                        {myEntries.length}
                      </span>
                    )}
                  </button>
                </>
              )}

              <button
                onClick={logoutUser}
                title="লগআউট"
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                }}
                className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all cursor-pointer"
              >
                লগইন
              </button>
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setAuthModalOpen(true);
                }}
                className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                রেজিস্ট্রেশন
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {currentUser && (
            <button
              onClick={() => handleNavClick(isAdmin && currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard')}
              className={`p-2 rounded-xl ${
                isAdmin && currentUser.role === 'admin'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
              }`}
              title={isAdmin && currentUser.role === 'admin' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'আমার প্রোফাইল'}
            >
              {isAdmin && currentUser.role === 'admin' ? <ShieldAlert className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-slate-300 hover:text-white bg-slate-800/60 rounded-xl border border-slate-700/60 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B132B] border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-3 animate-fade-in shadow-2xl">
          {currentUser ? (
            <div className="p-3 bg-slate-800/70 rounded-2xl border border-amber-500/20 mb-2 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{currentUser.name}</div>
                    <div className="text-xs text-amber-400 font-mono">{currentUser.phone}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleNavClick('user-dashboard')}
                  className="px-3 py-1.5 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg cursor-pointer"
                >
                  ড্যাশবোর্ড
                </button>
              </div>

              {currentUser.role !== 'admin' && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                  <div className="text-xs text-slate-300">
                    ব্যালেন্স: <span className="font-bold text-amber-400 font-mono">৳{currentUser.balance || 0}</span>
                  </div>
                  <button
                    onClick={() => {
                      setDepositModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    ডিপোজিট করুন
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-sm font-bold bg-slate-800 text-slate-200 rounded-xl border border-slate-700"
              >
                লগইন
              </button>
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-sm font-bold bg-amber-500 text-slate-950 rounded-xl"
              >
                রেজিস্ট্রেশন
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setLuckyWheelModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className={`w-full py-2.5 px-3 font-black text-sm rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer ${
              siteSettings.luckyWheelEnabled !== false
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <span className="text-base">🎡</span>
            <span>{siteSettings.luckyWheelEnabled !== false ? 'লাইভ লাকি হুইল ড্র দেখুন' : 'লাকি হুইল ড্র (বর্তমানে স্থগিত)'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <button
                key={item.viewTarget}
                onClick={() => handleNavClick(item.viewTarget)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  view === item.viewTarget
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-900/60 text-slate-300 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            ))}
          </div>

          {/* Admin link inside mobile drawer */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>হেল্পলাইন: {siteSettings.helplinePhone}</span>
            {isAdmin && currentUser?.role === 'admin' ? (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="text-rose-400 font-bold"
              >
                অ্যাডমিন প্যানেল
              </button>
            ) : (
              <button
                onClick={() => {
                  setAdminLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-amber-400 hover:underline"
              >
                অ্যাডমিন লগইন
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
