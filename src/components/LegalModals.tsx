import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

export const LegalView: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const { setView } = useApp();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-slate-200">
      <button
        onClick={() => setView('home')}
        className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 mb-6 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        হোম পেজে ফিরে যান
      </button>

      {type === 'privacy' ? (
        <div className="bg-slate-900/90 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-6 text-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">গোপনীয়তা ও তথ্য সুরক্ষা নীতি (Privacy Policy)</h1>
              <p className="text-xs text-slate-400">সর্বশেষ সংস্করণ: নভেম্বর ২০২৪</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h3 className="text-base font-bold text-amber-400">১. তথ্যের সংগ্রহ ও ব্যবহার</h3>
            <p>
              “৫০ টাকায় মোবাইল জিতুন” আপনার গোপনীয়তাকে সর্বোচ্চ অগ্রাধিকার দেয়। রেজিস্ট্রেশনের সময় সংগৃহীত নাম, মোবাইল নম্বর এবং জেলা শুধুমাত্র লটারির টিকিট ইস্যু এবং বিজয়ী যাচাইকরণের উদ্দেশ্যে ব্যবহার করা হয়।
            </p>

            <h3 className="text-base font-bold text-amber-400">২. তথ্যের নিরাপত্তা</h3>
            <p>
              আপনার কোনো ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের মার্কেটিং বা বাণিজ্যিক এজেন্সির সাথে ভাগ বা বিক্রি করা হয় না। সমস্ত ডেটা এনক্রিপ্ট করে সুরক্ষিত সার্ভারে সংরক্ষণ করা হয়।
            </p>

            <h3 className="text-base font-bold text-amber-400">৩. আর্থিক তথ্যের শূন্য সংগ্রহ</h3>
            <p>
              যেহেতু আমাদের সাইটে কোনো অর্থ প্রদান বা অনলাইন পেমেন্ট গেটওয়ে নেই, তাই আমরা ব্যবহারকারীদের কোনো ব্যাংক একাউন্ট, ক্রেডিট কার্ড বা বিকাশ/নগদ পিন নম্বর কখনোই চাই না বা সংরক্ষণ করি না।
            </p>

            <h3 className="text-base font-bold text-amber-400">৪. কুকিজ ও সেশন ডেটা</h3>
            <p>
              ব্রাউজিং অভিজ্ঞতা সহজ ও দ্রুত করার জন্য ব্রাউজারের লোকাল স্টোরেজ ও কুকিজ ব্যবহার করা হয়, যা ব্যবহারকারী যেকোনো সময় ক্লিয়ার করতে পারেন।
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/90 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-6 text-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">ব্যবহারের নিয়ম ও শর্তাবলি (Terms and Conditions)</h1>
              <p className="text-xs text-slate-400">আইনগত রূপরেখা ও কার্যপ্রণালী</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h3 className="text-base font-bold text-amber-400">১. সম্মতি প্রদান</h3>
            <p>
              আমাদের ওয়েবসাইট ভিজিট ও ব্যবহার করার মাধ্যমে আপনি আমাদের উল্লেখিত শর্তাবলিতে একমত পোষণ করছেন। আপনি যদি কোনো শর্তে অসম্মতি জানান, তবে এই প্ল্যাটফর্ম ব্যবহার থেকে বিরত থাকার অনুরোধ করা হচ্ছে।
            </p>

            <h3 className="text-base font-bold text-amber-400">২. অফিশিয়াল টিকিট ও ড্র নীতিমালা</h3>
            <p>
              ব্যবহারকারী নিজ দায়িত্বে সঠিক মোবাইল নম্বর ও পেমেন্ট ট্রানজেকশন আইডি (TrxID) দিয়ে টিকিট কনফার্ম করবেন। প্রতিটি ড্র সময়সীমা বা টিকিট কোটা অনুযায়ী স্বয়ংক্রিয়ভাবে অনুষ্ঠিত হবে।
            </p>

            <h3 className="text-base font-bold text-amber-400">৩. ফেয়ার প্লে ও একাউন্ট রুলস</h3>
            <p>
              বট, অটোমেটেড স্ক্রিপ্ট বা ভুয়া একাধিক সিম কার্ড ব্যবহার করে অস্বাভাবিক টিকিট সংগ্রহ নিষিদ্ধ। সিস্টেম দ্বারা এমন কার্যকলাপ শনাক্ত হলে সমস্ত টিকিট বাতিল বলে গণ্য হবে।
            </p>

            <h3 className="text-base font-bold text-amber-400">৪. পুরস্কার ডেলিভারি ও দায়মুক্তি</h3>
            <p>
              ঘোষিত বিজয়ীকে অবশ্যই তার বৈধ জাতীয় পরিচয়পত্র বা জন্ম নিবন্ধন সনদ দেখাতে হবে। কুরিয়ার বা কোম্পানি নিজ খরচে পুরস্কার পৌঁছে দেবে। কোনো অপ্রত্যাশিত প্রাকৃতিক দুর্যোগ বা সরকারি বিধিনিষেধের কারণে সময়সীমা বিলম্বিত হতে পারে।
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
