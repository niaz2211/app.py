import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, Volume2, VolumeX, Sparkles, Smartphone, ShieldCheck, Maximize2, Ticket } from 'lucide-react';

export const AnimationVideoSection: React.FC = () => {
  const { siteSettings, setFreeEntryModalOpen, setSelectedContest, contests, currentUser, setAuthModalOpen, setAuthModalMode } = useApp();
  const videoConfig = siteSettings.animationVideo;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(videoConfig?.muted ?? true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play on mount when enabled
  useEffect(() => {
    if (videoRef.current && (videoConfig?.autoplay ?? true)) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback (browser requires user interaction if not muted)
      });
    }
  }, [videoConfig?.videoUrl, videoConfig?.autoplay]);

  if (!videoConfig || videoConfig.enabled === false) {
    return null;
  }

  const {
    title = 'ফ্ল্যাগশিপ মোবাইল রিভিউ ও লাইভ ড্র শোকেস',
    subtitle = 'দেখুন স্যামসাং গ্যালাক্সি S25 আল্ট্রা এবং আইফোন ১৬ প্রো ম্যাক্স এর এক্সক্লুসিভ আনবক্সিং রিভিউ ও ৫০ টাকার নিরপেক্ষ লাইভ ড্র।',
    badge = '📱 অফিসিয়াল মোবাইল রিভিউ ও লাইভ ড্র',
    videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-device-in-a-studio-41775-large.mp4',
    posterUrl = 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=80',
    autoplay = true,
    loop = true,
  } = videoConfig;

  // Extract YouTube ID supporting standard links, youtu.be, embed, and shorts
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch && shortsMatch[1]) return shortsMatch[1];
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYouTubeId(videoUrl);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleBuyTicket = () => {
    if (!currentUser) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return;
    }
    const target = contests.find((c) => c.status === 'active') || contests[0];
    if (target) {
      setSelectedContest(target);
      setFreeEntryModalOpen(true);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#070D1E] via-[#0E1736] to-slate-950 relative overflow-hidden border-y border-amber-500/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Smartphone className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Video Player Display Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.25)] bg-slate-950 group">
            
            {/* YouTube Embed Player (with auto-play enabled) */}
            {youtubeId ? (
              <div className="relative w-full aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&mute=1&playsinline=1&loop=${loop ? 1 : 0}&playlist=${youtubeId}&controls=1&rel=0&modestbranding=1`}
                  title={title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              /* HTML5 Responsive MP4/WebM Mobile Review Player with Auto-Play */
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  poster={posterUrl}
                  autoPlay={autoplay}
                  loop={loop}
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Floating Sound Toggle Pill (always visible on corner for easy audio on/off) */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-slate-800 transition-all cursor-pointer"
                  title={isMuted ? 'সাউন্ড চালু করুন' : 'সাউন্ড বন্ধ করুন'}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-rose-400" />
                      <span>সাউন্ড অন করুন</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span>সাউন্ড চলছে</span>
                    </>
                  )}
                </button>

                {/* Overlaid Custom Controls Bar (hover/interaction) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full text-[11px] font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      লাইভ ভিডিও প্রিভিউ
                    </span>
                    <span className="text-xs text-slate-300 bg-slate-900/70 backdrop-blur-md px-2.5 py-1 rounded-lg font-mono">
                      1080p HD
                    </span>
                  </div>

                  {/* Bottom Controls */}
                  <div className="flex items-center justify-between pointer-events-auto">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-transform active:scale-95 shadow cursor-pointer"
                        title={isPlaying ? 'পজ করুন' : 'প্লে করুন'}
                      >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={toggleMute}
                        className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                        title={isMuted ? 'সাউন্ড চালু করুন' : 'মিউট করুন'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleFullscreen}
                      className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                      title="ফুলস্ক্রিন দেখুন"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Center Large Play Button if paused */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-110 transition-transform cursor-pointer"
                    title="প্লে করুন"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                )}
              </div>
            )}

            {/* Video Footer Banner */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-[#101A36] to-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>১০০% অফিসিয়াল ইনট্যাক্ট বক্স ফোন</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.2 rounded-full font-bold">
                      অফিসিয়াল ওয়ারেন্টি
                    </span>
                  </div>
                  <div className="text-slate-400 mt-0.5">
                    ভিডিওর দেখানো মডেলটি মাত্র ৫০ টাকার টিকিট বুকিংয়ের মাধ্যমে আপনার হতে পারে
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBuyTicket}
                className="py-2.5 px-5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all shrink-0 cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-slate-950" />
                <span>৫০ টাকায় টিকিট বুক করুন</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
