import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { siteSettings, showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      showToast('অনুগ্রহ করে সকল তথ্য পূরণ করুন', 'error');
      return;
    }

    setSubmitted(true);
    showToast('আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। কাস্টমার সাপোর্ট দ্রুত যোগাযোগ করবে।', 'success');
    setName('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-950 via-[#0B132B] to-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <MessageSquare className="w-4 h-4" />
            <span>সরাসরি যোগাযোগ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            কাস্টমার সাপোর্ট ও <span className="text-amber-400">সহায়তা কেন্দ্র</span>
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            কোনো জিজ্ঞাসা বা সহায়তার প্রয়োজন হলে আমাদের কাস্টমার সাপোর্ট টিমের সাথে সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white mb-2">
                অফিস ও সহায়তা তথ্য
              </h3>

              <div className="flex items-start gap-3.5 text-xs sm:text-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">অফিসিয়াল হেল্পলাইন</span>
                  <a href={`tel:${siteSettings.helplinePhone}`} className="font-bold text-white hover:text-amber-400 font-mono text-sm transition-colors">
                    {siteSettings.helplinePhone}
                  </a>
                  <span className="text-[11px] text-emerald-400 block mt-0.5">সকাল ৯টা - রাত ১০টা</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs sm:text-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">ইমেইল সাপোর্ট</span>
                  <a href={`mailto:${siteSettings.supportEmail}`} className="font-bold text-white hover:text-amber-400 text-sm transition-colors">
                    {siteSettings.supportEmail}
                  </a>
                  <span className="text-[11px] text-slate-400 block mt-0.5">২৪ ঘণ্টার মধ্যে উত্তর প্রদান</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs sm:text-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">প্রধান কার্যালয়ের ঠিকানা</span>
                  <span className="font-medium text-slate-200 text-xs sm:text-sm">
                    {siteSettings.officeAddress}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs sm:text-sm pt-2 border-t border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">সাপোর্ট সময়সূচী</span>
                  <span className="font-medium text-slate-300 text-xs">
                    শনিবার থেকে বৃহস্পতিবার (শুক্রবার সাপ্তাহিক ছুটি)
                  </span>
                </div>
              </div>
            </div>

            {/* Safety callout */}
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-300 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>আমাদের প্রতিনিধির সাথে যেকোনো বিষয়ে সরাসরি কথা বলতে পারেন। কোনো সার্ভিস ফি নেই।</span>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-1">
              আমাদের সরাসরি বার্তা পাঠান
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              আপনার প্রশ্ন, অভিযোগ বা মতামত নিচে লিখে সাবমিট করুন।
            </p>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                আপনার বার্তাটি গ্রহণ করা হয়েছে। ধন্যবাদ!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    আপনার নাম
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="আপনার পুরো নাম"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="০১৭১১-xxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  আপনার বার্তা / প্রশ্ন
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="আপনার মেসেজ বিস্তারিত লিখুন..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Send className="w-4 h-4" />
                বার্তা পাঠান
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
