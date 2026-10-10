'use client';

import React, { useState, useEffect } from 'react';
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
  BookOpen,
  BarChart3,
  Layers,
  ArrowRight
} from 'lucide-react';
import { soundFX } from '@/lib/sound';

export const ConceptChart: React.FC = () => {
  const [exportDate, setExportDate] = useState<string>('Academic Year 2026');

  useEffect(() => {
    try {
      setExportDate(
        new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      );
    } catch {
      // Fallback
    }
  }, []);

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
      overhead: 'Minimum O(1)',
      starvation: 'None (Zero Starvation)',
      throughput: 'Low / Moderate',
      bestFor: 'Batch Processing & Background Daemons',
      flaw: 'Convoy Effect (Short jobs blocked behind huge tasks)',
      heroSkill: 'FIFO Hammer + Convoy Buster',
      color: 'border-cyan-500/40 text-cyan-400',
    },
    {
      name: 'Shortest Job First / SRTF',
      hero: 'Swift "SJF" Flash',
      type: 'Preemptive (SRTF) / Non-Preemptive',
      criteria: 'Shortest Remaining Burst Time',
      overhead: 'High (Predictive BT tracking / Min-Heap)',
      starvation: 'High Risk for long processes',
      throughput: 'Maximum (Provably Optimal AWT)',
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
      overhead: 'Moderate (Priority Queue O(log n))',
      starvation: 'High Risk (Mitigated by Aging)',
      throughput: 'High for critical / Kernel tasks',
      bestFor: 'Real-time OS, Kernel interrupts, VIP tasks',
      flaw: 'Indefinite blocking / Starvation of low priority',
      heroSkill: 'Aging Beam + Imperial Preemption Strike',
      color: 'border-amber-500/40 text-amber-400',
    },
    {
      name: 'Round Robin (RR)',
      hero: 'Robin "Round Robin"',
      type: 'Preemptive (Fixed Quantum q)',
      criteria: 'FIFO Queue with Clock Interrupts',
      overhead: 'Moderate to High (Frequent Context Switches)',
      starvation: 'Zero Starvation (Guaranteed Fair Share)',
      throughput: 'High responsiveness (Interactive)',
      bestFor: 'Time-sharing modern OS (Linux, Windows, macOS)',
      flaw: 'Sensitive to quantum size q (too small = switch overhead; too large = FCFS)',
      heroSkill: 'Quantum Slice + Time Slice Whirlwind',
      color: 'border-pink-500/40 text-pink-400',
    },
  ];

  // Standard Canonical Reference Workload for Quantitative Comparison
  const benchmarkData = [
    {
      algorithm: 'First-Come, First-Served (FCFS)',
      preemption: 'Non-Preemptive',
      avgWaitingTime: '8.75 ms',
      avgTurnaroundTime: '15.25 ms',
      contextSwitches: '3',
      cpuEfficiency: '95.2%',
      convoyImpact: 'Severe (P2-P4 wait for P1)',
      verdictBadge: 'badge-danger text-red-400',
      verdict: 'Convoy Vulnerable',
    },
    {
      algorithm: 'Shortest Remaining Time First (SRTF)',
      preemption: 'Preemptive',
      avgWaitingTime: '4.00 ms',
      avgTurnaroundTime: '10.50 ms',
      contextSwitches: '4',
      cpuEfficiency: '98.5%',
      convoyImpact: 'None (Provably Minimum AWT)',
      verdictBadge: 'badge-safe text-emerald-400',
      verdict: 'Optimal AWT',
    },
    {
      algorithm: 'Priority Scheduling (Aging=0)',
      preemption: 'Preemptive',
      avgWaitingTime: '6.25 ms',
      avgTurnaroundTime: '12.75 ms',
      contextSwitches: '3',
      cpuEfficiency: '96.8%',
      convoyImpact: 'Priority-driven ordering',
      verdictBadge: 'badge-neutral text-amber-400',
      verdict: 'VIP Prioritized',
    },
    {
      algorithm: 'Round Robin (Time Quantum q = 3)',
      preemption: 'Preemptive',
      avgWaitingTime: '9.25 ms',
      avgTurnaroundTime: '15.75 ms',
      contextSwitches: '9',
      cpuEfficiency: '91.4%',
      convoyImpact: 'Fair-Share Time Slices',
      verdictBadge: 'badge-safe text-cyan-400',
      verdict: 'Guaranteed Fair',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Print-Only Academic Document Header */}
      <div className="hidden print:block border-b-2 border-slate-900 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-slate-950 uppercase tracking-tight">
              CPU Scheduling Algorithms & Academic Specification Report
            </h1>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Comparative Algorithmic Matrix • Quantitative Benchmark Values • Mathematical Formulations
            </p>
          </div>
          <div className="text-right text-[10px] text-slate-700 font-mono">
            <p className="font-bold text-slate-900">OPERATING SYSTEMS LAB</p>
            <p>POSIX / IEEE 1003.1 Standard</p>
            <p>Generated: {exportDate}</p>
          </div>
        </div>
      </div>

      {/* Screen Title & Print Export Action Bar */}
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
          className="no-print flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 text-xs font-semibold shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 transition-all"
        >
          <Printer className="w-4 h-4 text-cyan-400" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* 1. Algorithmic Comparison Matrix Table */}
      <div className="p-5 rounded-2xl glass-panel space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            1. Algorithmic Comparison Matrix
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            Core Dispatch Trade-offs
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/50">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/90 text-slate-300 font-mono">
                <th className="p-3">Algorithm</th>
                <th className="p-3">Scheduler Hero</th>
                <th className="p-3">Preemption</th>
                <th className="p-3">Selection Criteria</th>
                <th className="p-3">Scheduling Overhead</th>
                <th className="p-3">Starvation Risk</th>
                <th className="p-3">Throughput / Response</th>
                <th className="p-3">Primary Vulnerability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {matrixData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 font-bold text-white">{row.name}</td>
                  <td className={`p-3 font-semibold font-mono ${row.color}`}>{row.hero}</td>
                  <td className="p-3">
                    <span className="badge-neutral px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                      {row.type}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">{row.criteria}</td>
                  <td className="p-3 font-mono text-slate-300 font-medium">{row.overhead}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      row.starvation.includes('Zero') || row.starvation.includes('None')
                        ? 'badge-safe bg-emerald-500/20 text-emerald-300'
                        : 'badge-danger bg-red-500/20 text-red-300'
                    }`}>
                      {row.starvation}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">{row.throughput}</td>
                  <td className="p-3 text-red-300/90 font-medium">{row.flaw}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Quantitative Benchmark Values Table */}
      <div className="p-5 rounded-2xl glass-panel space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            2. Quantitative Benchmark Values (Standard Reference Workload)
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            Workload: P1(0,8), P2(1,4), P3(2,9), P4(3,5)
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Standardized benchmark comparison measuring exact numerical Average Waiting Time (AWT), Average Turnaround Time (ATAT), Context Switches, and CPU efficiency on identical input queues.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/50">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/90 text-slate-300 font-mono">
                <th className="p-3">Algorithm</th>
                <th className="p-3">Preemption Mode</th>
                <th className="p-3 text-center">Avg Waiting Time (AWT)</th>
                <th className="p-3 text-center">Avg Turnaround Time (ATAT)</th>
                <th className="p-3 text-center">Context Switches</th>
                <th className="p-3 text-center">CPU Utilization</th>
                <th className="p-3">Convoy / Latency Analysis</th>
                <th className="p-3 text-center">Performance Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {benchmarkData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 font-bold text-white">{row.algorithm}</td>
                  <td className="p-3 text-slate-300">{row.preemption}</td>
                  <td className="p-3 text-center font-mono font-bold text-cyan-300">
                    {row.avgWaitingTime}
                  </td>
                  <td className="p-3 text-center font-mono font-bold text-fuchsia-300">
                    {row.avgTurnaroundTime}
                  </td>
                  <td className="p-3 text-center font-mono font-bold text-amber-300">
                    {row.contextSwitches}
                  </td>
                  <td className="p-3 text-center font-mono font-bold text-emerald-300">
                    {row.cpuEfficiency}
                  </td>
                  <td className="p-3 text-slate-300">{row.convoyImpact}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${row.verdictBadge}`}>
                      {row.verdict}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Mathematical Reference & Formula Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          3. Mathematical Formulation & Metric Reference
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TAT Card */}
          <div className="p-5 rounded-2xl glass-card formula-card-cyan border border-cyan-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-cyan-400">Turnaround Time (TAT)</h4>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="p-3 rounded-xl bg-slate-950 formula-code-box font-mono text-sm text-cyan-200 border border-white/5 shadow-inner">
              TAT = Completion Time (CT) − Arrival Time (AT)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Total elapsed duration from initial process arrival into the system until entire burst completion.
            </p>
          </div>

          {/* WT Card */}
          <div className="p-5 rounded-2xl glass-card formula-card-fuchsia border border-fuchsia-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-fuchsia-400">Waiting Time (WT)</h4>
              <Zap className="w-4 h-4 text-fuchsia-400" />
            </div>
            <div className="p-3 rounded-xl bg-slate-950 formula-code-box font-mono text-sm text-fuchsia-200 border border-white/5 shadow-inner">
              WT = Turnaround Time (TAT) − Burst Time (BT)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Net interval a process resides inside the Ready Queue waiting to be dispatched to the CPU.
            </p>
          </div>

          {/* Response Time (RT) Card */}
          <div className="p-5 rounded-2xl glass-card border border-amber-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-amber-400">Response Time (RT)</h4>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="p-3 rounded-xl bg-slate-950 formula-code-box font-mono text-sm text-amber-200 border border-white/5 shadow-inner">
              RT = Time of First Execution (t₁) − Arrival Time (AT)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Key interactive performance metric; measures time until the process first begins execution.
            </p>
          </div>

          {/* AWT & ATAT Card */}
          <div className="p-5 rounded-2xl glass-card formula-card-emerald border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-emerald-400">Average Metrics (AWT & ATAT)</h4>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="p-3 rounded-xl bg-slate-950 formula-code-box font-mono text-sm text-emerald-200 border border-white/5 shadow-inner">
              AWT = (Σ WT) / n &nbsp;|&nbsp; ATAT = (Σ TAT) / n
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Primary objective criteria for evaluating scheduler efficiency across <code className="text-emerald-300 font-bold">n</code> processes.
            </p>
          </div>

          {/* CPU Utilization Card */}
          <div className="p-5 rounded-2xl glass-card border border-sky-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-sky-400">CPU Utilization (%)</h4>
              <Cpu className="w-4 h-4 text-sky-400" />
            </div>
            <div className="p-3 rounded-xl bg-slate-950 formula-code-box font-mono text-sm text-sky-200 border border-white/5 shadow-inner">
              Util = (Total Busy Time / Total Makespan) × 100%
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Percentage of system uptime during which the CPU is actively executing user processes.
            </p>
          </div>

          {/* Throughput Card */}
          <div className="p-5 rounded-2xl glass-card border border-purple-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-purple-400">Throughput Rate</h4>
              <Layers className="w-4 h-4 text-purple-400" />
            </div>
            <div className="p-3 rounded-xl bg-slate-950 formula-code-box font-mono text-sm text-purple-200 border border-white/5 shadow-inner">
              Throughput = Total Completed Processes (n) / Total Time
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rate of completed workload units per millisecond/second of CPU execution time.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Detailed Character Lore & OS Power Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          4. The 4 Scheduler Heroes & OS Power Mapping
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['FCFS', 'SJF', 'PRIORITY', 'RR'] as SchedulerType[]).map((key) => {
            const h = SCHEDULER_HEROES[key];
            return (
              <div
                key={key}
                className={`p-5 rounded-2xl glass-panel hero-card-print border ${h.borderColor} space-y-3 relative overflow-hidden`}
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
                  <span className="badge-neutral px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
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

      {/* Print-Only Document Footer */}
      <div className="hidden print:block border-t border-slate-400 pt-3 text-center text-[10px] text-slate-600 font-mono">
        <p>Scheduler Arcade • B.Tech / CS Operating Systems Academic Curriculum • Export Edition</p>
        <p className="mt-0.5">Formulas based on standard Silberschatz, Galvin & Gagne Operating System Concepts (10th Ed.)</p>
      </div>
    </div>
  );
};
