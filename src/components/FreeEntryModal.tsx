import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Sparkles,
  CheckCircle,
  Ticket,
  AlertTriangle,
  Smartphone,
  CreditCard,
  Copy,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContestEntry } from '../types';

export const FreeEntryModal: React.FC = () => {
  const {
    freeEntryModalOpen,
    setFreeEntryModalOpen,
    selectedContest,
    currentUser,
    claimFreeEntry,
    claimPaidEntry,
    setAuthModalOpen,
    setDepositModalOpen,
    setView,
    siteSettings,
    showToast,
  } = useApp();

  const [entryType, setEntryType] = useState<'free' | 'paid'>('paid');
  const [selectedGateway, setSelectedGateway] = useState<'bkash' | 'nagad' | 'rocket' | 'binance' | 'wallet_balance'>('bkash');
  const [senderAccount, setSenderAccount] = useState('');
  const [trxId, setTrxId] = useState('');
  const [generatedTicket, setGeneratedTicket] = useState<ContestEntry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-select wallet_balance if user has enough balance
  useEffect(() => {
    if (currentUser && (currentUser.balance || 0) >= 50) {
      setSelectedGateway('wallet_balance');
    }
  }, [currentUser, freeEntryModalOpen]);

  if (!freeEntryModalOpen || !selectedContest) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#38BDF8', '#10B981', '#FFFFFF'],
      });
    } catch {
      // fallback safe
    }
  };

  const getGatewayNumber = () => {
    if (selectedGateway === 'bkash') return siteSettings.bkashNumber || '01863440490';
    if (selectedGateway === 'nagad') return siteSettings.nagadNumber || '01863440490';
    if (selectedGateway === 'rocket') return siteSettings.rocketNumber || '01863440490';
    if (selectedGateway === 'binance') return siteSettings.binancePayId || '89420184 (Binance Pay)';
    return 'অ্যাকাউন্ট ব্যালেন্স';
  };

  const copyGatewayNumber = () => {
    navigator.clipboard.writeText(getGatewayNumber());
    setCopied(true);
    showToast('পেমেন্ট নম্বর কপি করা হয়েছে!', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setFreeEntryModalOpen(false);
      setAuthModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = claimPaidEntry(
        selectedContest.id,
        selectedGateway,
        trxId,
        siteSettings.entryFeeAmount || '৫০',
        senderAccount || currentUser.phone
      );

      setIsSubmitting(false);
      if (result.success && result.ticket) {
        setGeneratedTicket(result.ticket);
        triggerConfetti();
      } else if (result.ticket) {
        setGeneratedTicket(result.ticket);
      }
    }, 450);
  };

  const handleClose = () => {
    setFreeEntryModalOpen(false);
    setGeneratedTicket(null);
    setTrxId('');
  };

  const goToDashboard = () => {
    handleClose();
    setView('user-dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-[#0B132B] border border-amber-500/40 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] text-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!generatedTicket ? (
          <div>
            {/* Modal Header */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 mb-2 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                <Smartphone className="w-7 h-7" />
              </div>

              <h2 className="text-2xl font-black text-white">
                {selectedContest.brand} {selectedContest.model}
              </h2>
              <p className="text-xs text-amber-300 font-medium mt-0.5">
                বাজার মূল্য: {selectedContest.marketPrice}
              </p>
            </div>

            {/* Strict Paid Ticket Policy Notice */}
            <div className="mb-4 bg-gradient-to-r from-amber-500/15 via-slate-800 to-amber-500/15 p-3 rounded-2xl border border-amber-500/40 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-black text-amber-300">
                <Ticket className="w-4 h-4 text-amber-400" />
                <span>অফিসিয়াল টিকিট মূল্য: {siteSettings.entryFeeAmount || '৫০'} টাকা</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                🔒 ফ্রিতে কোনো এন্ট্রি গ্রহণযোগ্য নয়। আপনার ওয়ালেট ব্যালেন্স অথবা বিকাশ/নগদে ফি পরিশোধ করে অফিশিয়াল টিকিট সংগ্রহ করুন।
              </p>
            </div>

            {/* Prize Quick Preview Card */}
            <div className="flex items-center gap-4 p-3.5 bg-slate-800/60 rounded-2xl border border-slate-700/60 mb-4">
              <img
                src={selectedContest.image}
                alt={selectedContest.model}
                className="w-14 h-14 object-cover rounded-xl border border-amber-500/30 shrink-0"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-slate-200">
                  ডিসপ্লে: {selectedContest.specs.display}
                </div>
                <div className="text-slate-400">
                  র‍্যাম/রম: {selectedContest.specs.ramRom}
                </div>
                <div className="text-emerald-400 font-medium">
                  ক্যামেরা: {selectedContest.specs.camera}
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Paid Ticket Gateway Selector & TrxID Input */}
              {entryType === 'paid' && siteSettings.isPaidEnabled && (
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-amber-500/40 space-y-3.5 animate-fade-in text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300">
                      পেমেন্ট মেথড নির্বাচন করুন:
                    </span>
                    {currentUser && (currentUser.balance || 0) >= 50 && (
                      <span className="text-[11px] text-emerald-400 font-bold">
                        ওয়ালেট ব্যালেন্স: ৳{currentUser.balance}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: 'bkash', label: 'বিকাশ' },
                      { key: 'nagad', label: 'নগদ' },
                      { key: 'rocket', label: 'রকেট' },
                      { key: 'binance', label: 'বাইন্যান্স' },
                    ].map((gw) => (
                      <button
                        key={gw.key}
                        type="button"
                        onClick={() => setSelectedGateway(gw.key as any)}
                        className={`py-2 px-2.5 rounded-xl font-bold text-xs transition-all border cursor-pointer ${
                          selectedGateway === gw.key
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {gw.label}
                      </button>
                    ))}
                  </div>

                  {/* Option to pay with Wallet Balance if balance >= 50 */}
                  {currentUser && (currentUser.balance || 0) >= 50 && (
                    <button
                      type="button"
                      onClick={() => setSelectedGateway('wallet_balance')}
                      className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition-all border flex items-center justify-between cursor-pointer ${
                        selectedGateway === 'wallet_balance'
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow'
                          : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/60'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">⚡ ওয়ালেট ব্যালেন্স দিয়ে কাটুন (উপলব্ধ: ৳{currentUser.balance})</span>
                      <span className="font-mono font-bold">৳৫০ টাকা</span>
                    </button>
                  )}

                  {/* Low balance quick deposit redirect */}
                  {currentUser && (currentUser.balance || 0) < 50 && (
                    <div className="flex items-center justify-between p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs">
                      <span className="text-rose-300">ওয়ালেট ব্যালেন্স: ৳{currentUser.balance || 0} (অপর্যাপ্ত)</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFreeEntryModalOpen(false);
                          setDepositModalOpen(true);
                        }}
                        className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs cursor-pointer shadow"
                      >
                        + ডিপোজিট করুন
                      </button>
                    </div>
                  )}

                  {selectedGateway !== 'wallet_balance' && (
                    <>
                      {/* Payment instruction & copy number */}
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1.5">
                        <div className="text-[11px] text-slate-400">
                          নিচের নম্বরে <b>{siteSettings.entryFeeAmount || '৫০'} টাকা</b> Send Money বা পেমেন্ট করুন:
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-950 rounded-lg border border-slate-700 font-mono text-sm font-bold text-amber-400">
                          <span>{getGatewayNumber()}</span>
                          <button
                            type="button"
                            onClick={copyGatewayNumber}
                            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="কপি করুন"
                          >
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Sender Account Input */}
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          আপনার প্রেরক নম্বর অথবা বাইন্যান্স আইডি
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="যেমন: ০১৭০১-১২৩৪৫৬ অথবা Binance Pay ID"
                          value={senderAccount}
                          onChange={(e) => setSenderAccount(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:border-amber-400"
                        />
                      </div>

                      {/* TrxID Input */}
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          টাকা পাঠানোর পর প্রাপ্ত Transaction ID (TrxID)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="যেমন: 9J7K2L8MN বা Order ID"
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono uppercase text-xs focus:border-amber-400"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Free Demo Info callout when free */}
              {entryType === 'free' && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-200/90 leading-relaxed space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    অফিসিয়াল এন্ট্রি নির্দেশিকা:
                  </div>
                  <p>
                    {siteSettings.legalNoticeBanner || 'সঠিক তথ্য প্রদান করে আপনার লাকি টিকিট সংগ্রহ করুন। ড্র শেষ হওয়া মাত্র সফটওয়্যার অ্যালগরিদমে বিজয়ী নির্বাচিত হবে।'}
                  </p>
                </div>
              )}

              {/* User preview */}
              {currentUser ? (
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400">অংশগ্রহণকারী: </span>
                    <span className="font-semibold text-white">{currentUser.name}</span>
                  </div>
                  <div className="text-amber-400 font-mono">{currentUser.phone}</div>
                </div>
              ) : (
                <div className="text-center text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  ⚠️ টিকিট নিতে আগে আপনার মোবাইল নম্বর দিয়ে লগইন করুন
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                {isSubmitting
                  ? 'টিকিট প্রস্তুত হচ্ছে...'
                  : currentUser
                  ? (selectedGateway === 'wallet_balance'
                      ? `৳${siteSettings.entryFeeAmount || '৫০'} ব্যালেন্স দিয়ে টিকিট বুক করুন`
                      : `৫০ টাকার টিকিট সাবমিট করুন`)
                  : 'লগইন করে টিকিট কিনুন'}
              </button>
            </form>
          </div>
        ) : (
          /* Celebratory Ticket Reveal */
          <div className="text-center py-2 animate-fade-in">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white">অভিনন্দন! 🎉</h3>
            <p className="text-xs text-emerald-400 font-medium mt-1 mb-5">
              {generatedTicket.isFreeDemo
                ? 'আপনার অফিশিয়াল লাকি টিকিট সফলভাবে নিবন্ধিত হয়েছে'
                : 'আপনার পেইড টিকিট বুকিং সফল হয়েছে! অ্যাডমিন যাচাই করার পর চূড়ান্ত অনুমোদন পাবে।'}
            </p>

            {/* Render Ticket Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-[#101C3D] border-2 border-dashed border-amber-500/60 rounded-3xl p-6 text-left shadow-2xl mb-6">
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-[10px] font-bold text-amber-300">
                {generatedTicket.isFreeDemo ? 'FREE PASS' : 'PAID TICKET'}
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
                <Ticket className="w-4 h-4" />
                <span>৫০ টাকায় মোবাইল জিতুন - অফিসিয়াল টিকিট</span>
              </div>

              <div className="text-lg font-black text-white mb-1">
                {generatedTicket.contestTitle}
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-700/60 my-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">অংশগ্রহণকারী</span>
                  <span className="font-semibold text-white">{generatedTicket.userName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">মোবাইল নম্বর</span>
                  <span className="font-semibold text-white">{generatedTicket.userPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">তারিখ ও সময়</span>
                  <span className="font-medium text-slate-300">{generatedTicket.timestamp}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">স্ট্যাটাস</span>
                  <span className="inline-block font-bold text-emerald-400">
                    {generatedTicket.status === 'confirmed' ? '✓ সক্রিয় ও যাচাইকৃত' : '⏳ যাচাইাধীন (Pending)'}
                  </span>
                </div>
              </div>

              {/* Big Golden Ticket Number */}
              <div className="bg-slate-950/80 rounded-xl p-3 text-center border border-amber-500/40">
                <span className="text-[10px] text-amber-300/80 uppercase tracking-widest block font-bold">
                  আপনার লাকি টিকিট কোড
                </span>
                <span className="text-2xl md:text-3xl font-black text-amber-400 tracking-wider font-mono">
                  {generatedTicket.ticketNumber}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={goToDashboard}
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                আমার সকল টিকিট দেখুন
              </button>
              <button
                onClick={handleClose}
                className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-all border border-slate-700 cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
