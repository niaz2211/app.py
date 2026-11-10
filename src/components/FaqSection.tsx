import React, { useState } from 'react';
import { initialFaqs } from '../data/mockData';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>সচরাচর জিজ্ঞাসা</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            সাধারণ <span className="text-amber-400">প্রশ্নোত্তর (FAQ)</span>
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            প্রতিযোগিতা, ফ্রি টিকিট, ফলাফল প্রকাশ এবং ডেলিভারি সম্পর্কে সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নের উত্তর।
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {initialFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-800 text-amber-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-amber-500/20' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 whitespace-pre-line animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
