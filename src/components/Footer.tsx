import React from 'react';
import { useApp } from '../context/AppContext';
import { Smartphone, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setView, siteSettings, setAdminLoginModalOpen, isAdmin, currentUser } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070D1F] border-t border-amber-500/20 text-slate-400 text-xs relative pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="text-base font-black text-white block">
                  <span className="text-amber-400">৫০ টাকায়</span> মোবাইল জিতুন
                </span>
                <span className="text-[10px] text-slate-500">স্মার্টফোন কনটেস্ট প্ল্যাটফর্ম</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              বাংলাদেশের প্রথম প্রিমিয়াম ৫০ টাকায় মোবাইল প্রতিযোগিতা পোর্টাল। স্বচ্ছতা, সততা ও উন্নত প্রযুক্তি আমাদের মূল চালিকাশক্তি।
            </p>

            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>যাচাইকৃত অফিশিয়াল কনটেস্ট প্ল্যাটফর্ম</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-amber-400">
              গুরুত্বপূর্ণ লিঙ্ক
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setView('home'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  হোম পেজ
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('contests'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  পুরস্কারের মোবাইল তালিকা
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('how-to'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  কীভাবে অংশগ্রহণ করবেন
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('winners'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  বিজয়ীদের তালিকা ও গ্যালারি
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('faq'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  সাধারণ প্রশ্নোত্তর (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal and Rules */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-amber-400">
              নীতিমালা ও শর্তাবলি
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setView('certifications'); scrollToTop(); }}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ট্রেড লাইসেন্স ও সরকারি সনদ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('rules'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  প্রতিযোগিতার অফিসিয়াল নিয়ম
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('terms'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  ব্যবহারের নিয়ম ও শর্তাবলি (Terms)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('privacy'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  প্রাইভেসি ও তথ্য সুরক্ষা নীতি
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('notices'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  আইনি নির্দেশনা ও নোটিস
                </button>
              </li>
              <li>
                {isAdmin && currentUser?.role === 'admin' ? (
                  <button
                    onClick={() => { setView('admin-dashboard'); scrollToTop(); }}
                    className="text-rose-400 hover:underline font-bold"
                  >
                    অ্যাডমিন কন্ট্রোল প্যানেল
                  </button>
                ) : (
                  <button
                    onClick={() => setAdminLoginModalOpen(true)}
                    className="text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    অ্যাডমিন লগইন (অনুমোদিত স্টাফ)
                  </button>
                )}
              </li>
            </ul>
          </div>

          {/* Help & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-amber-400">
              যোগাযোগ ও সহায়তা
            </h4>
            <p className="text-slate-400 text-xs">
              যেকোনো জিজ্ঞাসা বা মতামতের জন্য সরাসরি হেল্পলাইনে কল করুন।
            </p>
            <div className="pt-1">
              <span className="block text-slate-500 text-[11px]">হেল্পলাইন:</span>
              <span className="text-amber-400 font-bold font-mono text-sm">
                {siteSettings.helplinePhone}
              </span>
            </div>
            <div>
              <span className="block text-slate-500 text-[11px]">ইমেইল:</span>
              <span className="text-slate-300 font-mono text-xs">
                {siteSettings.supportEmail}
              </span>
            </div>
            <div className="pt-2">
              <span className="block text-slate-500 text-[11px]">ঠিকানা:</span>
              <span className="text-slate-300 text-xs">
                {siteSettings.officeAddress}
              </span>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Box in Footer */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed mb-8">
          <span className="font-bold text-slate-300 block mb-0.5">নিরাপত্তা ও স্বচ্ছতা নীতি:</span>
          আমাদের ওয়েবসাইটে সকল ড্র সম্পূর্ণ নিরপেক্ষ সফটওয়্যার অ্যালগরিদমের মাধ্যমে সরাসরি পরিচালিত হয়। ব্যবহারকারীগণের সুবিধা ও নিরাপত্তার জন্য অফিসিয়াল বিকাশ, নগদ ও রকেট পেমেন্ট ভেরিফিকেশন ব্যবস্থা রাখা হয়েছে। কোনো প্রকার অসদুপায় বা জালিয়াতি কঠোরভাবে নিষিদ্ধ।
        </div>

        {/* Copyright and back to top */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © ২০২৪-২০২৬ “৫০ টাকায় মোবাইল জিতুন”। সর্বস্বত্ব সংরক্ষিত।
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors p-1"
          >
            <span>উপরে যান</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
