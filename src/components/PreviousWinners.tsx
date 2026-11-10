import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Star, MapPin, Calendar, Ticket, CheckCircle2, Quote } from 'lucide-react';

export const PreviousWinners: React.FC = () => {
  const { winners } = useApp();

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-950 via-[#0B132B] to-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>সফলতার গল্প</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            আমাদের সৌভাগ্যবান <span className="text-amber-400">বিজয়ীদের তালিকা</span>
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            যারা সততা ও আত্মবিশ্বাসের সাথে অংশ নিয়ে জিতে নিয়েছেন তাদের স্বপ্নের মোবাইল ফোন। দেখুন তাদের অনুভূতি।
          </p>
        </div>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {winners.map((winner) => {
            return (
              <div
                key={winner.id}
                className="bg-slate-900/90 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Winner Top Header with Photo & Prize Thumb */}
                  <div className="relative p-6 pb-4 bg-gradient-to-b from-[#111A35] to-slate-900 border-b border-slate-800 flex items-center gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={winner.userPhoto}
                        alt={winner.winnerName}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/50 shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow">
                        🏆
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-white text-base truncate">
                          {winner.winnerName}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{winner.location}</span>
                      </div>
                      <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">
                        {winner.phoneMasked}
                      </div>
                    </div>
                  </div>

                  {/* Won Prize Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                      <img
                        src={winner.prizeImage}
                        alt={winner.prizeModel}
                        className="w-12 h-12 rounded-xl object-cover border border-amber-500/30 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] text-amber-400 font-bold block uppercase">
                          জয়ী পুরস্কার
                        </span>
                        <div className="text-xs font-bold text-white truncate">
                          {winner.prizeModel}
                        </div>
                      </div>
                    </div>

                    {/* Meta info: Ticket & Date */}
                    <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800 text-slate-400">
                      <div className="flex items-center gap-1">
                        <Ticket className="w-3.5 h-3.5 text-amber-400" />
                        <span>টিকিট:</span>
                        <span className="font-mono font-bold text-amber-300">{winner.ticketNumber}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{winner.wonDate}</span>
                      </div>
                    </div>

                    {/* Story / Quote */}
                    <div className="relative pt-2">
                      <Quote className="w-5 h-5 text-amber-500/20 absolute -top-1 -left-1" />
                      <p className="text-xs text-slate-300 leading-relaxed italic pl-4">
                        "{winner.story}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rating Footer */}
                <div className="px-6 py-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">রেটিং ও সন্তুষ্টি:</span>
                  <div className="flex text-amber-400">
                    {[...Array(winner.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
