import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Copy, Check, Wallet, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export const DepositModal: React.FC = () => {
  const {
    depositModalOpen,
    setDepositModalOpen,
    siteSettings,
    currentUser,
    createDepositRequest,
    setAuthModalOpen,
    showToast,
  } = useApp();

  const [gateway, setGateway] = useState<'bkash' | 'nagad' | 'rocket' | 'binance'>('bkash');
  const [amount, setAmount] = useState<number>(50);
  const [senderAccount, setSenderAccount] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!depositModalOpen) return null;

  const getTargetInfo = () => {
    switch (gateway) {
      case 'bkash':
        return {
          title: 'বিকাশ (bKash) ওয়ালেট নম্বর',
          account: siteSettings.bkashNumber || '01863440490',
          color: 'from-pink-600 to-rose-600',
          borderColor: 'border-pink-500/40',
          textColor: 'text-pink-400',
          badge: 'bKash Send Money / Payment',
          iconText: 'বিকাশ',
        };
      case 'nagad':
        return {
          title: 'নগদ (Nagad) ওয়ালেট নম্বর',
          account: siteSettings.nagadNumber || '01863440490',
          color: 'from-orange-600 to-amber-600',
          borderColor: 'border-orange-500/40',
          textColor: 'text-orange-400',
          badge: 'নগদ ক্যাশ-ইন / সেন্ড মানি',
          iconText: 'নগদ',
        };
      case 'rocket':
        return {
          title: 'রকেট (Rocket) ডিবিবিএল নম্বর',
          account: siteSettings.rocketNumber || '01863440490',
          color: 'from-purple-600 to-indigo-600',
          borderColor: 'border-purple-500/40',
          textColor: 'text-purple-400',
          badge: 'রকেট সেন্ড মানি',
          iconText: 'রকেট',
        };
      case 'binance':
        return {
          title: 'বাইন্যান্স (Binance Pay ID / USDT)',
          account: siteSettings.binancePayId || '89420184 (Binance Pay)',
          color: 'from-yellow-500 to-amber-600',
          borderColor: 'border-yellow-500/40',
          textColor: 'text-yellow-400',
          badge: 'Binance Pay ID / USDT TRC20',
          iconText: 'Binance',
        };
    }
  };

  const target = getTargetInfo();

  const handleCopy = () => {
    navigator.clipboard.writeText(target.account.split(' ')[0]);
    setCopied(true);
    showToast('অফিশিয়াল অ্যাকাউন্ট নম্বর কপি করা হয়েছে!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setDepositModalOpen(false);
      setAuthModalOpen(true);
      return;
    }

    if (!senderAccount.trim()) {
      showToast('যে নম্বর/আইডি থেকে টাকা পাঠিয়েছেন তা লিখুন।', 'error');
      return;
    }

    if (!trxId.trim() || trxId.trim().length < 4) {
      showToast('সঠিক Transaction ID (TrxID) অথবা বাইন্যান্স অর্ডার আইডি দিন।', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = createDepositRequest({
        gateway,
        senderAccount: senderAccount.trim(),
        amount: Number(amount) || 50,
        trxId: trxId.trim(),
      });

      setIsSubmitting(false);
      if (res.success) {
        setDepositModalOpen(false);
        setSenderAccount('');
        setTrxId('');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-[#0B132B] border border-amber-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setDepositModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              ব্যালেন্স ডিপোজিট করুন
            </h2>
            <p className="text-xs text-amber-300/90 font-medium">
              বিকাশ, নগদ, রকেট অথবা বাইন্যান্সের মাধ্যমে দ্রুত ডিপোজিট
            </p>
          </div>
        </div>

        {/* Current Balance Bar */}
        {currentUser && (
          <div className="mb-5 p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
            <span className="text-slate-400">বর্তমান ওয়ালেট ব্যালেন্স:</span>
            <span className="text-emerald-400 font-bold font-mono text-sm">
              ৳{currentUser.balance || 0} টাকা
            </span>
          </div>
        )}

        {/* 4 Payment Gateways Selector */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-300 mb-2">
            পেমেন্ট মেথড নির্বাচন করুন (৪টি সহজ অপশন):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            
            {/* bKash */}
            <button
              type="button"
              onClick={() => setGateway('bkash')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                gateway === 'bkash'
                  ? 'bg-pink-950/60 border-pink-500 text-pink-300 shadow-md shadow-pink-500/20'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-black text-[11px]">
                ব
              </span>
              <span>বিকাশ (bKash)</span>
            </button>

            {/* Nagad */}
            <button
              type="button"
              onClick={() => setGateway('nagad')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                gateway === 'nagad'
                  ? 'bg-orange-950/60 border-orange-500 text-orange-300 shadow-md shadow-orange-500/20'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-black text-[11px]">
                ন
              </span>
              <span>নগদ (Nagad)</span>
            </button>

            {/* Rocket */}
            <button
              type="button"
              onClick={() => setGateway('rocket')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                gateway === 'rocket'
                  ? 'bg-purple-950/60 border-purple-500 text-purple-300 shadow-md shadow-purple-500/20'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-black text-[11px]">
                র
              </span>
              <span>রকেট (Rocket)</span>
            </button>

            {/* Binance */}
            <button
              type="button"
              onClick={() => setGateway('binance')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                gateway === 'binance'
                  ? 'bg-amber-950/60 border-yellow-500 text-yellow-300 shadow-md shadow-yellow-500/20'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-black text-[11px]">
                ₿
              </span>
              <span>বাইন্যান্স (Pay)</span>
            </button>

          </div>
        </div>

        {/* Selected Gateway Target Account Card */}
        <div className={`p-4 rounded-2xl bg-slate-950/90 border ${target.borderColor} mb-5 space-y-2`}>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">{target.title}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 ${target.textColor}`}>
              {target.badge}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-900 rounded-xl border border-slate-800">
            <div className="font-mono font-bold text-white text-sm sm:text-base tracking-wide select-all">
              {target.account}
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 transition-all cursor-pointer shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি'}</span>
            </button>
          </div>

          {gateway === 'binance' && siteSettings.binanceUsdtAddress && (
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <div>USDT (TRC-20 Address):</div>
              <div className="font-mono text-amber-300 break-all select-all text-[11px] mt-0.5 bg-slate-900/60 p-2 rounded">
                {siteSettings.binanceUsdtAddress}
              </div>
            </div>
          )}

          <div className="text-[11px] text-slate-400 leading-relaxed pt-1">
            💡 উপরোক্ত নম্বরে আপনার অ্যাকাউন্ট থেকে ৫০ টাকা সেন্ড মানি করুন। এরপর নিচে আপনার প্রেরক নম্বর ও ট্রানজেকশন আইডি (TrxID) দিয়ে সাবমিট করুন।
          </div>
        </div>

        {/* Deposit Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Amount selection */}
          <div>
            <label className="block font-bold text-slate-300 mb-1.5">
              ডিপোজিট পরিমাণ (টাকা):
            </label>
            <div className="flex items-center gap-2 mb-2">
              {[50, 100, 200, 500].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt)}
                  className={`flex-1 py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                    amount === amt
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ৳{amt}
                </button>
              ))}
            </div>
            <input
              type="number"
              min="50"
              required
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="কাস্টম পরিমাণ লিখুন (যেমন: ৫০, ১০০)"
              className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Sender Number / Binance ID */}
          <div>
            <label className="block font-bold text-slate-300 mb-1.5">
              আপনার প্রেরক নম্বর অথবা বাইন্যান্স আইডি (যেটি থেকে টাকা পাঠিয়েছেন):
            </label>
            <input
              type="text"
              required
              value={senderAccount}
              onChange={(e) => setSenderAccount(e.target.value)}
              placeholder="যেমন: ০১৭০১-১২৩৪৫৬ অথবা Binance Pay ID"
              className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          {/* TrxID */}
          <div>
            <label className="block font-bold text-slate-300 mb-1.5">
              ট্রানজেকশন আইডি (TrxID / Hash / Order ID):
            </label>
            <input
              type="text"
              required
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              placeholder="যেমন: BK9102451 বা 89102834"
              className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 uppercase font-mono tracking-wider"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            {isSubmitting ? 'যাচাই করা হচ্ছে...' : `৳${amount} টাকা ডিপোজিট সাবমিট করুন`}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-800 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>১০০% নিরাপদ লেনদেন • অ্যাডমিন দ্বারা সরাসরি ভেরিফায়েড</span>
        </div>

      </div>
    </div>
  );
};
