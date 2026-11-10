import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, ShieldAlert, KeyRound, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { adminLoginModalOpen, setAdminLoginModalOpen, adminLogin, siteSettings } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  if (!adminLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(email, password);
    if (success) {
      setAdminLoginModalOpen(false);
      setErrorCount(0);
      setPassword('');
    } else {
      setErrorCount((prev) => prev + 1);
    }
  };

  const autofillCredentials = () => {
    setEmail(siteSettings.adminEmail || 'niazuddinmd1@gmail.com');
    setPassword(siteSettings.adminPassword || '67373');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-[#070D1F] border border-rose-500/30 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(225,29,72,0.15)] text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={() => setAdminLoginModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-3 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            অ্যাডমিন সিকিউর অ্যাক্সেস
          </h2>
          <p className="text-xs text-rose-300/80 mt-1 font-medium">
            অনুমোদিত অ্যাডমিনিস্ট্রেটরদের জন্য সংরক্ষিত এলাকা
          </p>
        </div>

        {/* Security Warning */}
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-200 mb-6 flex items-start gap-2">
          <KeyRound className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
          <div>
            <span>সাধারণ দর্শকদের জন্য এটি নয়। অননুমোদিত প্রবেশের চেষ্টা আইপি ট্র্যাক ও লগ করা হবে।</span>
            {errorCount > 0 && (
              <span className="block text-rose-400 font-bold mt-1">
                ⚠️ ভুল প্রচেষ্টা: {errorCount}/৩
              </span>
            )}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              অ্যাডমিন ইমেইল / ইউজারনেম
            </label>
            <input
              type="text"
              required
              placeholder="অ্যাডমিন ইমেইল / ইউজারনেম"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors"
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              সিক্রেট পাসওয়ার্ড
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                placeholder="সিক্রেট পাসওয়ার্ড দিন"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3.5 pr-10 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                title={showPassword ? 'পাসওয়ার্ড হাইড করুন' : 'পাসওয়ার্ড দেখুন'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-rose-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            অ্যাডমিন প্যানেলে প্রবেশ করুন
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Admin Credentials hint */}
        <div className="mt-5 pt-4 border-t border-slate-800 text-center">
          <div className="text-[11px] text-slate-400 mb-1.5 flex items-center justify-between">
            <span>আপনার অ্যাডমিন অ্যাকাউন্ট:</span>
            <button
              type="button"
              onClick={autofillCredentials}
              className="text-amber-400 hover:underline font-bold text-[10px] cursor-pointer"
            >
              স্বয়ংক্রিয় পূরণ করুন
            </button>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-xl text-xs font-mono text-amber-300 border border-slate-700 space-y-0.5">
            <div>ইমেইল: <b className="text-white">admin@contest.bd</b></div>
            <div>পাসওয়ার্ড: <b className="text-emerald-400 tracking-widest">••••• (গোপন সংরক্ষিত)</b></div>
          </div>
        </div>

      </div>
    </div>
  );
};
