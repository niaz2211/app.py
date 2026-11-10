import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Ticket,
  Bell,
  Settings,
  Lock,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
  Calendar,
  Smartphone,
  ShieldCheck,
  Printer,
  ChevronRight,
  Gift,
  Wallet,
  ArrowRight,
} from 'lucide-react';
import { ContestEntry } from '../types';

export const UserDashboard: React.FC = () => {
  const {
    currentUser,
    updateUserProfile,
    getUserEntries,
    getUserDeposits,
    setDepositModalOpen,
    contests,
    setSelectedContest,
    setFreeEntryModalOpen,
    setAuthModalOpen,
    setView,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'entries' | 'deposits' | 'profile' | 'notifications' | 'settings'>('entries');
  const userDeposits = getUserDeposits();

  // Form states for profile editing
  const [name, setName] = useState(currentUser?.name || '');
  const [district, setDistrict] = useState(currentUser?.district || 'ঢাকা');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const entries = getUserEntries();

  if (!currentUser) {
    return (
      <div className="py-20 px-4 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">অনুগ্রহ করে লগইন করুন</h2>
        <p className="text-xs text-slate-400 mb-6">
          আপনার প্রোফাইল, টিকিট এবং ওয়ালেট ব্যালেন্স দেখতে অনুগ্রহ করে অ্যাকাউন্টে লগইন করুন অথবা নতুন অ্যাকাউন্ট তৈরি করুন।
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setAuthModalOpen(true)}
            className="py-2.5 px-6 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
          >
            লগইন / রেজিস্টার করুন
          </button>
          <button
            onClick={() => setView('home')}
            className="py-2.5 px-6 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm border border-slate-700 active:scale-95 transition-all cursor-pointer"
          >
            হোম পেজে যান
          </button>
        </div>
      </div>
    );
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, district, address });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || newPass.length < 6) {
      showToast('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!', 'error');
      return;
    }
    if (newPass !== confirmPass) {
      showToast('পাসওয়ার্ড দুটি মেলেনি!', 'error');
      return;
    }
    showToast('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!', 'success');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const handleClaimMore = (contestId: string) => {
    const contest = contests.find((c) => c.id === contestId);
    if (contest) {
      setSelectedContest(contest);
      setFreeEntryModalOpen(true);
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* User Header Profile Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-[#101C3D] to-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl mb-8">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
          
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-1 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
              <div className="w-full h-full bg-[#0B132B] rounded-[22px] flex items-center justify-center text-3xl font-black text-amber-400">
                {currentUser.name.charAt(0)}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-emerald-500 rounded-full text-[10px] font-bold text-slate-950 border-2 border-slate-950">
              সক্রিয়
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {currentUser.name}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 w-fit mx-auto sm:mx-0">
                <ShieldCheck className="w-3.5 h-3.5" />
                যাচাইকৃত ব্যবহারকারী
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1 font-mono text-amber-300">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                {currentUser.phone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {currentUser.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {currentUser.district}
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs">
              <div className="px-3 py-1.5 bg-slate-950/80 rounded-xl border border-emerald-500/40 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400">ব্যালেন্স: </span>
                <span className="font-bold text-emerald-400 font-mono text-sm">৳{currentUser.balance || 0}</span>
              </div>
              <div className="px-3 py-1.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">মোট টিকিট: </span>
                <span className="font-bold text-amber-400 font-mono text-sm">{entries.length} টি</span>
              </div>
              <div className="px-3 py-1.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">যোগদান: </span>
                <span className="font-medium text-slate-300">{currentUser.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Quick CTA to Claim Ticket & Deposit */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:self-center">
            <button
              onClick={() => setDepositModalOpen(true)}
              className="py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Wallet className="w-4 h-4 text-slate-950" />
              <span>টাকা ডিপোজিট করুন</span>
            </button>

            <button
              onClick={() => {
                const active = contests.find((c) => c.status === 'active' && !entries.some((e) => e.contestId === c.id)) || contests[0];
                if (active) {
                  setSelectedContest(active);
                  setFreeEntryModalOpen(true);
                }
              }}
              className="py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>৫০ টাকায় টিকিট নিন</span>
            </button>
          </div>

        </div>
      </div>

      {/* Dashboard Tabs & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-slate-900/80 p-2 rounded-2xl border border-slate-800 space-y-1">
            <button
              onClick={() => setActiveTab('entries')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'entries'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Ticket className="w-4 h-4" />
                <span>আমার অংশগ্রহণের টিকিট</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-black ${activeTab === 'entries' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                {entries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('deposits')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'deposits'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Wallet className="w-4 h-4" />
                <span>ডিপোজিট ও লেনদেন</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-black ${activeTab === 'deposits' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                {userDeposits.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>ব্যক্তিগত প্রোফাইল</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'notifications'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4" />
                <span>নোটিফিকেশন ও ড্র আপডেট</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>অ্যাকাউন্ট ও পাসওয়ার্ড</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
          </div>

          {/* Quick Legal Card in Sidebar */}
          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>নিরাপদ ও স্বচ্ছ প্ল্যাটফর্ম</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              আপনার টিকিটগুলো স্বয়ংক্রিয়ভাবে সিস্টেমের নিরপেক্ষ ড্র ডাটাবেজে সংরক্ষিত রয়েছে। ড্র শেষ হলে ফলাফল নোটিফিকেশন পাবেন।
            </p>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="lg:col-span-9">
          
          {/* TAB 1: My Tickets & Entries */}
          {activeTab === 'entries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">আমার নিবন্ধিত টিকিটসমূহ</h2>
                  <p className="text-xs text-slate-400">আপনার সংরক্ষিত সকল লাকি টিকিট কোড ও ফলাফল স্ট্যাটাস</p>
                </div>
                <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30 w-fit">
                  ✓ অফিসিয়াল পেইড টিকিট
                </span>
              </div>

              {entries.length === 0 ? (
                <div className="bg-slate-900/80 rounded-3xl p-10 text-center border border-slate-800 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center">
                    <Ticket className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">আপনার কোনো সক্রিয় টিকিট নেই!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    চলতি সপ্তাহের আকর্ষণীয় স্যামসাং বা আইফোন ড্র তে অংশ নিতে এখনই ৫০ টাকায় অফিসিয়াল টিকিট সংগ্রহ করুন।
                  </p>
                  <button
                    onClick={() => {
                      setView('contests');
                      window.scrollTo({ top: 500, behavior: 'smooth' });
                    }}
                    className="py-3 px-6 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
                  >
                    মোবাইল তালিকা দেখুন
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entries.map((ticket) => {
                    const contest = contests.find((c) => c.id === ticket.contestId);
                    const isWinner = ticket.status === 'winner';

                    return (
                      <div
                        key={ticket.id}
                        className={`relative overflow-hidden rounded-3xl p-5 border transition-all ${
                          isWinner
                            ? 'bg-gradient-to-br from-amber-500/20 via-slate-900 to-[#101C3D] border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                            : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40'
                        }`}
                      >
                        {/* Status Badge */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            PAID TICKET (৳৫০)
                          </span>

                          {isWinner ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 flex items-center gap-1 shadow">
                              🏆 বিজয়ী টিকিট!
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> অপেক্ষমান
                            </span>
                          )}
                        </div>

                        {/* Contest details */}
                        <div className="flex items-center gap-3 mb-4">
                          {contest?.image && (
                            <img
                              src={contest.image}
                              alt={contest.model}
                              className="w-12 h-12 object-cover rounded-xl border border-slate-700 shrink-0"
                            />
                          )}
                          <div>
                            <span className="text-[10px] text-amber-400 font-bold block uppercase">
                              লক্ষ্য মোবাইল
                            </span>
                            <div className="text-sm font-bold text-white">
                              {ticket.contestTitle}
                            </div>
                          </div>
                        </div>

                        {/* Ticket Golden Box */}
                        <div className="p-3 bg-slate-950/80 rounded-2xl border border-amber-500/40 text-center mb-3">
                          <span className="text-[10px] text-amber-300/80 uppercase tracking-widest block font-bold">
                            আপনার টিকিট কোড
                          </span>
                          <span className="text-xl font-black text-amber-400 font-mono tracking-wider">
                            {ticket.ticketNumber}
                          </span>
                        </div>

                        {/* Meta time info */}
                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                          <span>নিবন্ধন: {ticket.timestamp}</span>
                          <span className="text-emerald-400 font-medium">যাচাইকৃত</span>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

              {/* Other Contests quick claim bar (Hidden as requested) */}
              <div className="hidden mt-8 pt-6 border-t border-slate-800">
                <h3 className="hidden text-sm font-bold text-white mb-3">
                  অন্যান্য মোবাইলের জন্য ফ্রি এন্ট্রি নিন:
                </h3>
                <div className="hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {contests
                    .filter((c) => !entries.some((e) => e.contestId === c.id))
                    .slice(0, 2)
                    .map((c) => (
                      <div
                        key={c.id}
                        className="hidden flex items-center justify-between p-3 bg-slate-900/60 rounded-2xl border border-slate-800"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={c.image}
                            alt={c.model}
                            className="w-10 h-10 object-cover rounded-lg border border-slate-700"
                          />
                          <div className="text-xs">
                            <div className="font-bold text-white truncate max-w-[130px] sm:max-w-[170px]">{c.model}</div>
                            <div className="text-slate-400 font-mono">{c.marketPrice}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleClaimMore(c.id)}
                          className="hidden px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-slate-950 rounded-xl text-xs font-bold transition-all border border-amber-500/30 cursor-pointer"
                        >
                          এন্ট্রি নিন
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Deposits & Wallet Transactions */}
          {activeTab === 'deposits' && (
            <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-emerald-400" />
                    <span>ডিপোজিট ও ওয়ালেট ব্যালেন্স</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    বিকাশ, নগদ, রকেট ও বাইন্যান্সের মাধ্যমে ডিপোজিট করে এক ক্লিকে ৫০ টাকার টিকিট কিনুন।
                  </p>
                </div>

                <button
                  onClick={() => setDepositModalOpen(true)}
                  className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95 transition-all shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>নতুন ডিপোজিট করুন</span>
                </button>
              </div>

              {/* Balance Card */}
              <div className="p-5 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400 mb-1">মোট উপলব্ধ ওয়ালেট ব্যালেন্স:</div>
                  <div className="text-3xl font-black text-emerald-400 font-mono">
                    ৳{currentUser.balance || 0} <span className="text-sm font-normal text-slate-400">টাকা</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <div>✓ এই ব্যালেন্স দিয়ে যেকোনো মোবাইলের টিকিট কেনা যাবে</div>
                  <div>✓ কোনো অতিরিক্ত ফি বা চার্জ নেই</div>
                </div>
              </div>

              {/* Deposit History Table */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3">
                  আপনার ডিপোজিট হিস্ট্রি ({userDeposits.length} টি লেনদেন):
                </h3>

                {userDeposits.length === 0 ? (
                  <div className="text-center py-10 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-3">
                    <Wallet className="w-8 h-8 text-slate-600 mx-auto" />
                    <p>আপনার কোনো ডিপোজিট রেকর্ড নেই। ৫০ টাকা ডিপোজিট করে টিকিট সংগ্রহ করুন!</p>
                    <button
                      onClick={() => setDepositModalOpen(true)}
                      className="py-2 px-4 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>এখনই ডিপোজিট করুন</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                        <tr>
                          <th className="p-3">গেটওয়ে</th>
                          <th className="p-3">পরিমাণ</th>
                          <th className="p-3">প্রেরক / বাইন্যান্স আইডি</th>
                          <th className="p-3">TrxID / Hash</th>
                          <th className="p-3">তারিখ ও সময়</th>
                          <th className="p-3">স্ট্যাটাস</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-950/40 font-mono">
                        {userDeposits.map((dep) => (
                          <tr key={dep.id} className="hover:bg-slate-900/60 transition-colors">
                            <td className="p-3 font-bold uppercase">
                              <span className={`px-2 py-0.5 rounded text-[10px] ${
                                dep.gateway === 'bkash' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' :
                                dep.gateway === 'nagad' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                                dep.gateway === 'rocket' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                                'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                              }`}>
                                {dep.gateway}
                              </span>
                            </td>
                            <td className="p-3 font-bold text-emerald-400 text-sm">৳{dep.amount}</td>
                            <td className="p-3 text-slate-300 font-sans text-xs">{dep.senderAccount}</td>
                            <td className="p-3 text-amber-300 select-all">{dep.trxId}</td>
                            <td className="p-3 text-slate-400 font-sans text-[11px]">{dep.timestamp}</td>
                            <td className="p-3">
                              {dep.status === 'approved' && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                  ✓ অনুমোদিত
                                </span>
                              )}
                              {dep.status === 'pending' && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                  ⏳ যাচাইাধীন
                                </span>
                              )}
                              {dep.status === 'rejected' && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                  ✕ বাতিল
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Profile Edit */}
          {activeTab === 'profile' && (
            <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-1">ব্যক্তিগত প্রোফাইল সম্পাদনা</h2>
              <p className="text-xs text-slate-400 mb-6">
                আপনার যোগাযোগের সঠিক তথ্য দিয়ে প্রোফাইল আপডেট রাখুন যাতে বিজয়ী হলে সহজেই আপনার সাথে যোগাযোগ করা যায়।
              </p>

              <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    আপনার পুরো নাম (এনআইডি অনুযায়ী)
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    মোবাইল নম্বর (পরিবর্তনযোগ্য নয়)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentUser.phone}
                    className="w-full px-3.5 py-2.5 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-400 text-sm cursor-not-allowed font-mono"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    নিরাপত্তার স্বার্থে নিবন্ধিত মোবাইল নম্বর পরিবর্তন করতে হেল্পলাইনে কল করুন।
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    জেলা / শহর
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
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

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    পুরো ঠিকানা (ডেলিভারি পাওয়ার জন্য)
                  </label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="বাড়ি নং, রোড নং, এলাকা..."
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
                >
                  প্রোফাইল আপডেট করুন
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: Notifications */}
          {activeTab === 'notifications' && (
            <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">বিজ্ঞপ্তি ও লাইভ আপডেট</h2>
                <span className="text-xs text-amber-400 font-medium">সর্বশেষ আপডেটসমূহ</span>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="font-bold text-white">অ্যাকাউন্ট ভেরিফিকেশন সফল হয়েছে</div>
                    <p className="text-slate-400">আপনার মোবাইল নম্বরটি আমাদের সিস্টেমে পরীক্ষামূলক ড্র-এর জন্য ভেরিফাইড হিসেবে তালিকাভুক্ত হয়েছে।</p>
                    <span className="text-[10px] text-slate-500 block">আজ</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/70 rounded-2xl border border-amber-500/30 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="font-bold text-white">মেগা ড্রয়ের আর মাত্র ৩ দিন বাকি!</div>
                    <p className="text-slate-400">স্যামসাং গ্যালাক্সি S25 আল্ট্রা মেগা ড্র খুব শীঘ্রই অনুষ্ঠিত হবে। ড্র এর পর সরাসরি বিজয়ীর নাম প্রকাশিত হবে।</p>
                    <span className="text-[10px] text-slate-500 block">গতকাল</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="font-bold text-white">নতুন মোবাইল কনটেস্ট যুক্ত হয়েছে</div>
                    <p className="text-slate-400">আইফোন ১৬ প্রো ম্যাক্স এর জন্য ৫০ টাকার টিকিট সংগ্রহ শুরু হয়েছে। এখনই সংগ্রহ করুন।</p>
                    <span className="text-[10px] text-slate-500 block">০৩ নভেম্বর</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Security & Settings */}
          {activeTab === 'settings' && (
            <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-1">নিরাপত্তা ও পাসওয়ার্ড পরিবর্তন</h2>
              <p className="text-xs text-slate-400 mb-6">
                আপনার অ্যাকাউন্ট সুরক্ষিত রাখতে নিয়মিত পাসওয়ার্ড পরিবর্তন করুন।
              </p>

              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    বর্তমান পাসওয়ার্ড
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="বর্তমান পাসওয়ার্ড দিন"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    নতুন পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="নতুন পাসওয়ার্ড দিন"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    নতুন পাসওয়ার্ড পুনরায় দিন
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="পুনরায় নতুন পাসওয়ার্ড লিখুন"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  পাসওয়ার্ড পরিবর্তন করুন
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
