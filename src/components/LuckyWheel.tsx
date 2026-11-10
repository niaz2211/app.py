import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, Volume2, VolumeX, RotateCw, CheckCircle2 } from 'lucide-react';

export interface WheelCandidate {
  id: string;
  name: string;
  ticketNumber: string;
  phone: string;
  avatar?: string;
  color?: string;
}

interface LuckyWheelProps {
  candidates: WheelCandidate[];
  onWinnerSelected: (winner: WheelCandidate) => void;
  targetIndex?: number | null; // Optional: specify exact winner index
  isSpinningExternal?: boolean;
  onSpinStart?: () => void;
  prizeTitle?: string;
}

const SEGMENT_COLORS = [
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#6366F1', // Indigo
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#8B5CF6', // Purple
  '#EF4444', // Red
  '#14B8A6', // Teal
  '#F97316', // Orange
  '#3B82F6', // Blue
];

export const LuckyWheel: React.FC<LuckyWheelProps> = ({
  candidates,
  onWinnerSelected,
  targetIndex = null,
  prizeTitle = 'স্মার্টফোন মেগা ড্র',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedWinner, setSelectedWinner] = useState<WheelCandidate | null>(null);
  const [currentAngle, setCurrentAngle] = useState(0);

  // Audio Context for synthetic sound effects (works offline, zero external dependencies)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playTickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio fallback safe
    }
  };

  const playWinFanfare = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]; // C4, E4, G4, C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + idx * 0.1 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.45);
      });
    } catch {
      // safe
    }
  };

  // Provide fallback candidates if fewer than 4 exist
  const items: WheelCandidate[] = candidates.length >= 2 ? candidates : [
    { id: '1', name: 'মোঃ তানভীর আহমেদ', ticketNumber: 'TKT-78291', phone: '০১৭১১-****৮৯' },
    { id: '2', name: 'ফারহানা ইসলাম তন্বী', ticketNumber: 'TKT-45210', phone: '০১৮২২-****১২' },
    { id: '3', name: 'সাকিব আল হাসান', ticketNumber: 'TKT-90184', phone: '০১৯১১-****৪৫' },
    { id: '4', name: 'কামরুল ইসলাম', ticketNumber: 'TKT-33419', phone: '০১৭০১-****১২' },
    { id: '5', name: 'নুসরাত জাহান মিম', ticketNumber: 'TKT-88123', phone: '০১৮১২-****৩৪' },
    { id: '6', name: 'রাকিবুল হাসান', ticketNumber: 'TKT-67018', phone: '০১৯১৫-****৭৮' },
  ];

  const totalSegments = items.length;
  const arcSize = (2 * Math.PI) / totalSegments;

  // Draw the wheel on canvas
  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 25;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Outer Gold Bezel
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 15, 0, 2 * Math.PI);
    const bezelGrad = ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius + 15);
    bezelGrad.addColorStop(0, '#B45309');
    bezelGrad.addColorStop(0.5, '#F59E0B');
    bezelGrad.addColorStop(1, '#78350F');
    ctx.fillStyle = bezelGrad;
    ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.restore();

    // 2. Draw Outer Rim Flashing LED Bulbs
    const numBulbs = 24;
    for (let i = 0; i < numBulbs; i++) {
      const bulbAngle = (i * (2 * Math.PI)) / numBulbs;
      const bx = centerX + (radius + 8) * Math.cos(bulbAngle);
      const by = centerY + (radius + 8) * Math.sin(bulbAngle);
      const isLit = (Math.floor(angle * 10) + i) % 2 === 0;

      ctx.beginPath();
      ctx.arc(bx, by, 3.5, 0, 2 * Math.PI);
      ctx.fillStyle = isLit ? '#FEF08A' : '#713F12';
      ctx.shadowColor = isLit ? '#FACC15' : 'transparent';
      ctx.shadowBlur = isLit ? 8 : 0;
      ctx.fill();
    }

    // 3. Draw Segments
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    for (let i = 0; i < totalSegments; i++) {
      const startAngle = i * arcSize;
      const endAngle = startAngle + arcSize;
      const color = items[i].color || SEGMENT_COLORS[i % SEGMENT_COLORS.length];

      // Segment wedge
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Inner divider line
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#0B132B';
      ctx.stroke();

      // Segment text & ticket
      ctx.save();
      ctx.rotate(startAngle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      // Candidate name
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 13px "Hind Siliguri", sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 4;
      const displayName = items[i].name.length > 13 ? items[i].name.substring(0, 12) + '..' : items[i].name;
      ctx.fillText(displayName, radius - 28, -6);

      // Ticket number
      ctx.fillStyle = '#FEF08A';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(items[i].ticketNumber, radius - 28, 10);

      // Small peg pin at the rim
      ctx.beginPath();
      ctx.arc(radius - 6, 0, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();
    }

    // 4. Center Gold Hub / Badge
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, 2 * Math.PI);
    const centerGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 42);
    centerGrad.addColorStop(0, '#FDE047');
    centerGrad.addColorStop(0.7, '#D97706');
    centerGrad.addColorStop(1, '#78350F');
    ctx.fillStyle = centerGrad;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 10;
    ctx.fill();

    // Center rim
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FEF08A';
    ctx.stroke();

    // Center star / icon
    ctx.fillStyle = '#0B132B';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('লাকি ড্র', 0, 0);

    ctx.restore();

    // 5. Top Pointer Needle (pointing down at 12 o'clock, which is -Math.PI / 2)
    ctx.save();
    ctx.translate(centerX, centerY - radius - 5);
    ctx.beginPath();
    ctx.moveTo(0, 22); // pointer tip
    ctx.lineTo(-14, -12);
    ctx.lineTo(14, -12);
    ctx.closePath();

    const pointerGrad = ctx.createLinearGradient(0, -12, 0, 22);
    pointerGrad.addColorStop(0, '#EF4444');
    pointerGrad.addColorStop(1, '#991B1B');
    ctx.fillStyle = pointerGrad;
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    // Pointer pivot bulb
    ctx.beginPath();
    ctx.arc(0, -12, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();
    ctx.restore();
  };

  useEffect(() => {
    drawWheel(currentAngle);
  }, [candidates, currentAngle]);

  // Spin physics engine
  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedWinner(null);
    getAudioContext();

    // Determine winning index: either admin targeted or pure random
    let winningIdx = targetIndex !== null && targetIndex >= 0 && targetIndex < totalSegments
      ? targetIndex
      : Math.floor(Math.random() * totalSegments);

    // Pointer points at -Math.PI / 2 (top: 270 degrees)
    // When wheel rotates by angle θ, segment at top is:
    // ( -Math.PI/2 - θ ) mod 2π
    // To land on winningIdx (whose center is winningIdx * arcSize + arcSize/2):
    // Target θ = -Math.PI/2 - (winningIdx * arcSize + arcSize / 2)
    const segmentCenter = winningIdx * arcSize + arcSize / 2;
    const baseTargetAngle = (3 * Math.PI) / 2 - segmentCenter;

    // Add 6 to 9 full rotations for realistic spin duration
    const fullRotations = 7 * (2 * Math.PI);
    // Add tiny random jitter within segment bounds (+- 35% of arc)
    const jitter = (Math.random() - 0.5) * (arcSize * 0.7);
    const finalAngle = currentAngle + fullRotations + ((baseTargetAngle - (currentAngle % (2 * Math.PI)) + 4 * Math.PI) % (2 * Math.PI)) + jitter;

    const startAngle = currentAngle;
    const duration = 6500; // 6.5 seconds smooth physics
    const startTime = performance.now();
    let lastPegIndex = -1;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic / quintic deceleration
      const ease = 1 - Math.pow(1 - progress, 4.2);
      const newAngle = startAngle + (finalAngle - startAngle) * ease;

      // Calculate which peg is passing to play tick sound
      const pegIndex = Math.floor((newAngle / arcSize));
      if (pegIndex !== lastPegIndex) {
        lastPegIndex = pegIndex;
        playTickSound();
      }

      setCurrentAngle(newAngle);
      drawWheel(newAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const winner = items[winningIdx];
        setSelectedWinner(winner);
        playWinFanfare();

        // Celebratory Confetti
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.55 },
          colors: ['#F59E0B', '#10B981', '#6366F1', '#EC4899', '#FEF08A'],
        });

        onWinnerSelected(winner);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-col items-center">
      
      {/* Sound toggle & status pill */}
      <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3 px-2">
        <div className="flex items-center gap-1.5 font-semibold text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{prizeTitle}</span>
        </div>
        <button
          type="button"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-1 hover:text-white px-2 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 transition-colors cursor-pointer"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          <span>{soundEnabled ? 'সাউন্ড অন' : 'মিউট'}</span>
        </button>
      </div>

      {/* Wheel Canvas Container */}
      <div className="relative p-2 rounded-full bg-slate-950/80 border-2 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
        <canvas
          ref={canvasRef}
          width={380}
          height={380}
          className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] block"
        />

        {/* Center overlay button for mobile/touch */}
        {!isSpinning && !selectedWinner && (
          <button
            type="button"
            onClick={spinWheel}
            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-transparent cursor-pointer z-10 flex items-center justify-center group"
            title="চাক্কি ঘোরান"
          >
            <span className="sr-only">ঘোরান</span>
          </button>
        )}
      </div>

      {/* Spin Trigger Button */}
      <div className="mt-5 w-full max-w-sm">
        <button
          type="button"
          disabled={isSpinning}
          onClick={spinWheel}
          className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
            isSpinning
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-amber-500/25'
          }`}
        >
          <RotateCw className={`w-4 h-4 text-slate-950 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'লাকি ড্র চাক্কি ঘুরছে...' : '🎡 হুইল অফ ফরচুন ঘোরান (Spin Wheel)'}</span>
        </button>
      </div>

      {/* Winner Fanfare Banner */}
      {selectedWinner && (
        <div className="mt-5 w-full p-4 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border-2 border-emerald-500/60 rounded-2xl shadow-2xl text-center space-y-2 animate-bounce-subtle">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>অভিনন্দন! বিজয়ী নির্বাচিত হয়েছে</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">
            {selectedWinner.name}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className="text-slate-400">টিকিট নম্বর:</span>
            <span className="font-mono font-black text-amber-400 px-2 py-0.5 bg-slate-950 rounded border border-amber-500/40">
              {selectedWinner.ticketNumber}
            </span>
          </div>
          <div className="text-xs text-slate-400">
            মোবাইল: <span className="font-mono text-slate-300">{selectedWinner.phone}</span>
          </div>
        </div>
      )}

    </div>
  );
};
