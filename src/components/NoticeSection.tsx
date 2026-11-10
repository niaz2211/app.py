import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, AlertCircle, Info, Calendar, Sparkles } from 'lucide-react';

export const NoticeSection: React.FC = () => {
  const { notices } = useApp();

  return (
    <section className="py-16 sm:py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Bell className="w-4 h-4" />
            <span>অফিসিয়াল বার্তা</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            সর্বশেষ <span className="text-amber-400">নোটিস ও আপডেট</span>
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            প্ল্যাটফর্মের গুরুত্বপূর্ণ ঘোষণা, আইনি নির্দেশনা ও ড্র সম্পর্কিত সর্বশেষ তথ্য জানুন।
          </p>
        </div>

        {/* Notices List */}
        <div className="space-y-4">
          {notices.map((notice) => {
            const isUrgent = notice.type === 'urgent';
            return (
              <div
                key={notice.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isUrgent
                    ? 'bg-rose-500/5 border-rose-500/30 hover:border-rose-500/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {isUrgent ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> জরুরি সতর্কবার্তা
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> সাধারণ ঘোষণা
                      </span>
                    )}

                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {notice.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{notice.date}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {notice.content}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
