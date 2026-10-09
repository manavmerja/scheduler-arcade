'use client';

import React from 'react';
import { SCHEDULER_HEROES } from '@/lib/heroes';
import { SchedulerType } from '@/types/os';
import { 
  Printer, 
  Sparkles, 
  CheckCircle, 
  AlertOctagon, 
  Clock, 
  Zap, 
  Cpu, 
  HelpCircle,
  Award,
  BookOpen
} from 'lucide-react';
import { soundFX } from '@/lib/sound';

export const ConceptChart: React.FC = () => {
  const handlePrint = () => {
    soundFX.playLaser(500, 0.1);
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const matrixData = [
    {
      name: 'First-Come, First-Served (FCFS)',
      hero: 'Frank "The FIFO"',
      type: 'Non-Preemptive',
      criteria: 'Arrival Time (FIFO Queue)',
      overhead: 'Minimum (O(1))',
      starvation: 'None (Zero Starvation)',
      throughput: 'Low / Moderate',
      bestFor: 'Batch Processing & Background Daemons',
      flaw: 'Convoy Effect (Short jobs trapped behind huge tasks)',
      heroSkill: 'FIFO Hammer + Convoy Buster',
      color: 'border-cyan-500/40 text-cyan-400',
    },
    {
      name: 'Shortest Job First / SRTF',
      hero: 'Swift "SJF" Flash',
      type: 'Preemptive (SRTF) / Non-Preemptive',
      criteria: 'Shortest Burst Time (BT / Remaining BT)',
      overhead: 'High (Requires predicting burst times)',
      starvation: 'High Risk for long processes',
      throughput: 'Maximum (Optimal AWT)',
      bestFor: 'Long-term job scheduling & Fast interactive jobs',
      flaw: 'Starvation of long jobs & difficulty predicting BT',
      heroSkill: 'Short-Burst Snipe + Zero-Wait Matrix',
      color: 'border-emerald-500/40 text-emerald-400',
    },
    {
      name: 'Priority Scheduling',
      hero: 'Commander Priority',
      type: 'Preemptive / Non-Preemptive',
      criteria: 'Process Urgency / Priority Rank',
      overhead: 'Moderate',
      starvation: 'High Risk (Solvable with Aging)',
      throughput: 'High for critical tasks',
      bestFor: 'Real-time OS, Kernel interrupts, VIP tasks',
      flaw: 'Indefinite blocking / Starvation of low priority',
      heroSkill: 'Aging Beam + Imperial Preemption Strike',
      color: 'border-amber-500/40 text-amber-400',
    },
    {
      name: 'Round Robin (RR)',
      hero: 'Robin "Round Robin"',
      type: 'Preemptive (Fixed Time Quantum q)',
      criteria: 'FIFO Queue with Clock Interrupts',
      overhead: 'Moderate to High (Frequent Context Switches)',
      starvation: 'Zero Starvation (Guaranteed Fair Share)',
      throughput: 'High responsiveness',
      bestFor: 'Time-sharing modern OS (Windows, Linux, macOS)',
      flaw: 'Sensitive to quantum size q (too small = huge overhead, too large = degrades to FCFS)',
      heroSkill: 'Quantum Slice + Time Slice Whirlwind',
      color: 'border-pink-500/40 text-pink-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title & Print Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl glass-panel">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Award className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-wide">
              OS Concept Chart & Algorithm Matrix
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Comprehensive academic mapping of CPU scheduling algorithms, mathematical formulations, and game character mechanics.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="no-print flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-semibold shadow-lg transition-all"
        >
          <Printer className="w-4 h-4 text-cyan-400" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* 1. Comparison Matrix Table */}
      <div className="p-5 rounded-2xl glass-panel space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          1. Algorithmic Comparison Matrix
        </h3>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/50">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/90 text-slate-300 font-mono">
                <th className="p-3">Algorithm</th>
                <th className="p-3">Scheduler Hero</th>
                <th className="p-3">Preemption</th>
                <th className="p-3">Selection Criteria</th>
                <th className="p-3">Starvation Risk</th>
                <th className="p-3">Key Strength</th>
                <th className="p-3">Primary Vulnerability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {matrixData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 font-bold text-white">{row.name}</td>
                  <td className={`p-3 font-semibold font-mono ${row.color}`}>{row.hero}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                      {row.type}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">{row.criteria}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      row.starvation.includes('Zero') || row.starvation.includes('None')
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {row.starvation}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">{row.bestFor}</td>
                  <td className="p-3 text-red-300/90">{row.flaw}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Mathematical Reference & Formula Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-cyan-400">Turnaround Time (TAT)</h4>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="p-3 rounded-xl bg-slate-950 font-mono text-sm text-cyan-200 border border-white/5">
            TAT = Completion Time (CT) − Arrival Time (AT)
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The total interval from the moment a process is submitted until its completion.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-fuchsia-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-fuchsia-400">Waiting Time (WT)</h4>
            <Zap className="w-4 h-4 text-fuchsia-400" />
          </div>
          <div className="p-3 rounded-xl bg-slate-950 font-mono text-sm text-fuchsia-200 border border-white/5">
            WT = Turnaround Time (TAT) − Burst Time (BT)
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The total amount of time a process spends waiting inside the Ready Queue.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-emerald-400">Average Metrics (AWT / ATAT)</h4>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="p-3 rounded-xl bg-slate-950 font-mono text-sm text-emerald-200 border border-white/5">
            AWT = (Σ WT) / n &nbsp;|&nbsp; ATAT = (Σ TAT) / n
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Where <code className="text-emerald-300">n</code> is the total number of processes executed.
          </p>
        </div>
      </div>

      {/* 3. Detailed Character Lore & OS Power Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          2. The 4 Scheduler Heroes & OS Power Mapping
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['FCFS', 'SJF', 'PRIORITY', 'RR'] as SchedulerType[]).map((key) => {
            const h = SCHEDULER_HEROES[key];
            return (
              <div
                key={key}
                className={`p-5 rounded-2xl glass-panel border ${h.borderColor} space-y-3 relative overflow-hidden`}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-white/10">
                      {h.avatar}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-white">{h.name}</h4>
                      <p className="text-xs text-slate-400 font-mono">{h.osAlgorithm}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                    {h.archetype.split('/')[0]}
                  </span>
                </div>

                <p className="text-xs italic text-slate-400 border-l-2 border-slate-700 pl-3">
                  {h.quote}
                </p>

                {/* Powers Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                    <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Passive: {h.passiveName}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{h.passiveDesc}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Active: {h.skillName}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{h.skillDesc}</p>
                  </div>
                </div>

                {/* Ultimate */}
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-xs">
                  <span className="font-bold text-purple-300">Ultimate: {h.ultimateName}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">{h.ultimateDesc}</p>
                </div>

                {/* Simple Real Life Analogy */}
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 text-xs flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-300">Real-Life Analogy: </span>
                    <span className="text-slate-400">{h.simpleAnalogy}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
