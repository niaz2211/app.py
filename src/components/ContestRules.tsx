import React from 'react';
import { ShieldCheck, AlertTriangle, Scale, CheckCircle2, FileText, Lock } from 'lucide-react';

export const ContestRules: React.FC = () => {
  const rulesList = [
    {
      title: '১. অংশগ্রহণকারীর যোগ্যতা',
      desc: 'প্রতিযোগিতায় অংশগ্রহণের জন্য বাংলাদেশি নাগরিক হতে হবে এবং একটি সক্রিয় সচল মোবাইল নম্বর থাকতে হবে। প্রতিটি অ্যাকাউন্ট থেকে স্বচ্ছতার সাথে টিকিট কোড সংগ্রহ করা যাবে।',
      icon: CheckCircle2,
    },
    {
      title: '২. নিরাপদ পেমেন্ট ও টিকিট অনুমোদন',
      desc: '৫০ টাকার পেইড টিকিট নিশ্চিত করতে বিকাশ, নগদ বা রকেটের মাধ্যমে ফি পরিশোধ করে ট্রানজেকশন আইডি (TrxID) সাবমিট করুন। অ্যাডমিন ভেরিফিকেশনের পর টিকিট নিশ্চিত হবে।',
      icon: Scale,
    },
    {
      title: '৩. স্বচ্ছ ফলাফল ও ড্র পদ্ধতি',
      desc: 'কাউন্টডাউন শেষ হওয়ার পর ক্রিপ্টোগ্রাফিক র্যান্ডম সিড অ্যালগরিদমের মাধ্যমে ফলাফল নির্ধারিত হয়, যা সম্পূর্ণ নিরপেক্ষ এবং মানুষের হস্তক্ষেপ মুক্ত।',
      icon: Lock,
    },
    {
      title: '৪. বিজয়ীর পরিচয় যাচাই ও পুরস্কার হস্তান্তর',
      desc: 'বিজয়ী ঘোষিত ব্যক্তির নিবন্ধিত ফোন নম্বরে সরাসরি কল দিয়ে ভেরিফাই করা হবে। জাতীয় পরিচয়পত্র (NID) প্রদর্শনের মাধ্যমে সম্পূর্ণ বিনামূল্যে মোবাইল হস্তান্তর করা হবে।',
      icon: ShieldCheck,
    },
    {
      title: '৫. প্রতারণা রোধ ও কঠোর নীতিমালা',
      desc: 'একই ব্যক্তি ভুয়া নম্বর বা বট ব্যবহার করে একাধিক অ্যাকাউন্ট খুললে স্বয়ংক্রিয়ভাবে তার সকল এন্ট্রি বাতিল এবং আইপি ব্লক করা হবে।',
      icon: AlertTriangle,
    },
    {
      title: '৬. কর ও ডেলিভারি চার্জ',
      desc: 'পুরস্কারের মোবাইলের কোনো প্রকার কুরিয়ার চার্জ, প্যাকিং ফি বা ডেলিভারি বাবদ টাকা অংশগ্রহণকারীকে দিতে হবে না। সম্পূর্ণ খরচ প্ল্যাটফর্ম বহন করবে।',
      icon: FileText,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Scale className="w-4 h-4" />
            <span>স্বচ্ছতা ও সমঅধিকার</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            প্রতিযোগিতার <span className="text-amber-400">অফিসিয়াল নিয়মাবলি ও শর্তাবলি</span>
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            সকল অংশগ্রহণকারীর ন্যায্য অধিকার ও নিরাপত্তা বজায় রাখতে আমাদের সুনির্দিষ্ট নির্দেশিকাগুলো মনোযোগ দিয়ে পড়ুন।
          </p>
        </div>

        {/* Warning Callout Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm leading-relaxed mb-10 flex items-start gap-3.5 shadow-lg">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300 block mb-1">
              অফিশিয়াল নিরাপত্তা ও গ্রাহক সুরক্ষা বার্তা:
            </span>
            <span>
              “৫০ টাকায় মোবাইল জিতুন” প্ল্যাটফর্মের অফিশিয়াল বিকাশ, নগদ ও রকেট নম্বর শুধুমাত্র এই ওয়েবসাইটে এবং টিকিট কাউন্টারে প্রদর্শিত হবে। অন্য কোনো ব্যক্তিগত নম্বরে টাকা পাঠাবেন না এবং প্রয়োজনে হেল্পলাইনে যোগাযোগ করুন।
            </span>
          </div>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rulesList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-start space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-1">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
