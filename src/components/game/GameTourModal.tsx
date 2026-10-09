'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Cpu, 
  Zap, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  X, 
  Flame, 
  ShieldCheck,
  RotateCw
} from 'lucide-react';
import { soundFX } from '@/lib/sound';
import confetti from 'canvas-confetti';

interface GameTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: () => void;
}

export const GameTourModal: React.FC<GameTourModalProps> = ({
  isOpen,
  onClose,
  onStartGame,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      title: 'Defend the CPU Core 🛡️',
      subtitle: 'The Core Mission',
      badge: 'Step 1 of 5',
      icon: Cpu,
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500/40',
      description:
        'Incoming Process Monsters (P1, P2, P3...) are flooding the system bus! If they reach your CPU Core on the left, your CPU will starve and take damage. Destroy them before CPU Health drops to 0%!',
      visual: (
        <div className="p-4 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>CPU CORE (100% HP)</span>
          </div>
          <div className="text-slate-500 flex items-center gap-1 font-bold">
            <span>◄◄◄ Laser Defense</span>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>P1 [BT: 5]</span>
          </div>
        </div>
      ),
    },
    {
      title: 'The 4 Scheduler Heroes & OS Powers ⚔️',
      subtitle: 'Match Hero to Threat',
      badge: 'Step 2 of 5',
      icon: Layers,
      color: 'from-fuchsia-500 to-pink-600',
      borderColor: 'border-fuchsia-500/40',
      description:
        'Each Hero uses a real CPU Scheduling algorithm to attack enemies differently:',
      visual: (
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-500/30">
            <div className="font-bold text-cyan-300 flex items-center gap-1">🛡️ 1. Frank (FCFS)</div>
            <p className="text-[11px] text-slate-400 mt-1">Hits front of queue in arrival order.</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/30">
            <div className="font-bold text-emerald-300 flex items-center gap-1">⚡ 2. Swift (SJF)</div>
            <p className="text-[11px] text-slate-400 mt-1">Snipes lowest remaining burst time.</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-amber-500/30">
            <div className="font-bold text-amber-300 flex items-center gap-1">👑 3. Priority</div>
            <p className="text-[11px] text-slate-400 mt-1">Focuses high-urgency VIP tasks (P1/P2).</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-pink-500/30">
            <div className="font-bold text-pink-300 flex items-center gap-1">🌀 4. Robin (RR)</div>
            <p className="text-[11px] text-slate-400 mt-1">Cycles equal damage across all enemies.</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Instant Hero Switching 🔄',
      subtitle: 'Dynamic Multi-Tasking',
      badge: 'Step 3 of 5',
      icon: RotateCw,
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-500/40',
      description:
        'Switch heroes at any second using the on-screen buttons (or keyboard keys 1, 2, 3, 4 on PC). If a swarm of tiny burst tasks arrives, switch to Swift (SJF)! If high priority bosses appear, switch to Commander Priority!',
      visual: (
        <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 text-center space-y-2">
          <div className="text-xs text-slate-300 font-medium">On PC / Mobile:</div>
          <div className="flex justify-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs">
              [1] FCFS
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs">
              [2] SJF
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs">
              [3] PRIO
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-pink-500/40 text-pink-300 font-mono font-bold text-xs">
              [4] RR
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Active Skills & 100% Ultimate Blast 💥',
      subtitle: 'Special Abilities',
      badge: 'Step 4 of 5',
      icon: Zap,
      color: 'from-purple-500 to-indigo-600',
      borderColor: 'border-purple-500/40',
      description:
        'Each hero has a unique Active Skill (like Aging Beam or Short-Burst Snipe). Attacking charges your Ultimate gauge up to 100%. When charged, tap the glowing Ultimate button for an AOE screen-wipe!',
      visual: (
        <div className="flex gap-2 text-xs">
          <div className="flex-1 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold">Active Skill</div>
              <div className="text-[10px] text-slate-400">Short Cooldown</div>
            </div>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center gap-2 text-fuchsia-300">
            <Zap className="w-4 h-4 text-fuchsia-400 shrink-0" />
            <div>
              <div className="font-bold">Ultimate (100%)</div>
              <div className="text-[10px] text-slate-400">Screen Wipe</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Live Combat Gantt Buffer 📊',
      subtitle: 'Real OS Execution',
      badge: 'Step 5 of 5',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500/40',
      description:
        'As you fight, the game records your attacks in real time into a live OS Gantt Chart buffer at the bottom of the arena. You are scheduling processes in real-time!',
      visual: (
        <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1.5">
          <div className="text-[11px] font-mono text-slate-400">Live Gantt Stream Output:</div>
          <div className="flex gap-1 overflow-hidden">
            <div className="px-2 py-1 rounded bg-cyan-400 text-slate-950 font-mono font-bold text-[10px]">
              P1 (FCFS)
            </div>
            <div className="px-2 py-1 rounded bg-emerald-400 text-slate-950 font-mono font-bold text-[10px]">
              P2 (SJF)
            </div>
            <div className="px-2 py-1 rounded bg-pink-400 text-slate-950 font-mono font-bold text-[10px]">
              P3 (RR)
            </div>
          </div>
        </div>
      ),
    },
  ];

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      soundFX.playQuantumTick();
    } else {
      // Finish Tour
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      } catch {}
      soundFX.playVictory();
      onClose();
      onStartGame();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      soundFX.playQuantumTick();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', duration: 0.35 }}
          className={`w-full max-w-lg rounded-3xl glass-panel border ${step.borderColor} p-6 space-y-5 shadow-2xl relative overflow-hidden bg-[#0d121f]`}
        >
          {/* Top Bar with Step Badge & Close */}
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[11px] font-semibold">
              {step.badge}
            </span>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step Content with Motion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                  <span>{step.title}</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{step.subtitle}</p>
              </div>

              {/* Interactive Visual Preview */}
              {step.visual}

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {step.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators & Navigation Buttons */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentStep(idx);
                    soundFX.playQuantumTick();
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentStep === idx
                      ? 'w-6 bg-cyan-400'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 text-xs font-semibold flex items-center gap-1 border border-white/[0.08] transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:brightness-110 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <Check className="w-4 h-4" /> Start Playing!
                  </>
                ) : (
                  <>
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
