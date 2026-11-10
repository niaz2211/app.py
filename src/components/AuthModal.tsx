import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Phone, Mail, User as UserIcon, MapPin, Sparkles, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    loginUser,
    registerUser,
  } = useApp();

  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regDistrict, setRegDistrict] = useState('ঢাকা');

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginUser(phoneOrEmail, password);
    if (success) {
      setAuthModalOpen(false);
      setPhoneOrEmail('');
      setPassword('');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = registerUser({
      name: regName,
      phone: regPhone,
      email: regEmail,
      district: regDistrict,
      password: regPassword,
    });
    if (success) {
      setAuthModalOpen(false);
      setRegName('');
      setRegPhone('');
      setRegEmail('');
      setRegPassword('');
    }
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-[#0B132B] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            {authModalMode === 'login' ? 'অ্যাকাউন্টে লগইন' : 'নতুন অ্যাকাউন্ট তৈরি'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            সঠিক পারমিশন ও রোল অনুযায়ী সরাসরি স্বয়ংক্রিয় ড্যাশবোর্ডে নিয়ে যাওয়া হবে
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex bg-slate-800/60 p-1 rounded-2xl mb-5 border border-slate-700/60">
          <button
            type="button"
            onClick={() => setAuthModalMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              authModalMode === 'login'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            লগইন
          </button>
          <button
            type="button"
            onClick={() => setAuthModalMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              authModalMode === 'register'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            রেজিস্ট্রেশন (ইউজার ডাটাবেস)
          </button>
        </div>

        {/* Login Form */}
        {authModalMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Strict Security Callout */}
            <div className="p-3 bg-slate-950/80 border border-amber-500/30 rounded-2xl text-[11px] text-amber-300 leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>কড়া সিকিউরিটি চেক:</span>
              </div>
              <p className="text-slate-300">
                সাইন-আপ করা ছাড়া সরাসরি লগইন করা যাবে না। আপনার আগে অ্যাকাউন্ট না থাকলে প্রথমে <b>"রেজিস্ট্রেশন"</b> ট্যাবে গিয়ে সাইন-আপ করুন।
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                মোবাইল নম্বর অথবা ইমেইল এড্রেস
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="০১৭০১-১২৩৪৫৬ অথবা email@domain.com"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="আপনার পাসওয়ার্ড দিন"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  title={showPassword ? 'পাসওয়ার্ড হাইড করুন' : 'পাসওয়ার্ড দেখুন'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              লগইন করুন
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setAuthModalMode('register')}
                className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer"
              >
                নতুন ইউজার? আগে এখানে সাইন-আপ করুন →
              </button>
            </div>

            </form>
        )}

        {/* Register Form */}
        {authModalMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                আপনার পুরো নাম
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="আপনার পুরো নাম লিখুন"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                মোবাইল নম্বর
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="০১৭১১-xxxxxx"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                পাসওয়ার্ড তৈরি করুন
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  required
                  placeholder="কমপক্ষে ৪ অক্ষরের পাসওয়ার্ড"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  title={showRegPassword ? 'পাসওয়ার্ড হাইড করুন' : 'পাসওয়ার্ড দেখুন'}
                >
                  {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ইমেইল (ঐচ্ছিক)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                জেলা / শহর
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <select
                  value={regDistrict}
                  onChange={(e) => setRegDistrict(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="ঢাকা">ঢাকা</option>
                  <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                  <option value="সিলেট">সিলেট</option>
                  <option value="রাজশাহী">রাজশাহী</option>
                  <option value="খুলনা">খুলনা</option>
                  <option value="বরিশাল">বরিশাল</option>
                  <option value="রংপুর">রংপুর</option>
                  <option value="ময়মনসিংহ">ময়মনসিংহ</option>
                  <option value="কুমিল্লা">কুমিল্লা</option>
                  <option value="গাজীপুর">গাজীপুর</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer text-xs"
            >
              রেজিস্ট্রেশন সম্পন্ন করে ড্যাশবোর্ডে প্রবেশ করুন
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setAuthModalMode('login')}
                className="text-xs text-slate-400 hover:text-amber-300 underline font-semibold cursor-pointer"
              >
                ইতিমধ্যে একাউন্ট তৈরি করেছেন? সরাসরি লগইন করুন →
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
