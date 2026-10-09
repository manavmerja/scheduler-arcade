'use client';

import React, { useState, useMemo } from 'react';
import { Process, SchedulerType, SimulationResult } from '@/types/os';
import { 
  calculateFCFS, 
  calculateSRTF, 
  calculatePriority, 
  calculateRoundRobin, 
  PROCESS_COLORS 
} from '@/lib/algorithms';
import { 
  SCHEDULER_HEROES, 
  DEFAULT_PRESET_PROCESSES, 
  CONVOY_EFFECT_PRESET, 
  STARVATION_PRESET 
} from '@/lib/heroes';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  Clock, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Layers,
  Sliders,
  Flame
} from 'lucide-react';
import { soundFX } from '@/lib/sound';
import { motion, AnimatePresence } from 'framer-motion';

export const GanttVisualizer: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<SchedulerType>('FCFS');
  const [processes, setProcesses] = useState<Process[]>(DEFAULT_PRESET_PROCESSES);
  const [timeQuantum, setTimeQuantum] = useState<number>(2);
  const [agingRate, setAgingRate] = useState<number>(0);

  // Compute simulation result based on active algorithm
  const result: SimulationResult = useMemo(() => {
    switch (selectedAlgo) {
      case 'FCFS':
        return calculateFCFS(processes);
      case 'SJF':
        return calculateSRTF(processes);
      case 'PRIORITY':
        return calculatePriority(processes, agingRate);
      case 'RR':
        return calculateRoundRobin(processes, timeQuantum);
      default:
        return calculateFCFS(processes);
    }
  }, [selectedAlgo, processes, timeQuantum, agingRate]);

  const hero = SCHEDULER_HEROES[selectedAlgo];

  // Handlers for modifying processes
  const handleAddProcess = () => {
    const nextNum = processes.length + 1;
    const newP: Process = {
      id: `P${nextNum}`,
      arrivalTime: Math.floor(Math.random() * 4),
      burstTime: Math.floor(Math.random() * 6) + 1,
      remainingTime: 1,
      priority: Math.floor(Math.random() * 5) + 1,
      color: PROCESS_COLORS[(nextNum - 1) % PROCESS_COLORS.length],
    };
    newP.remainingTime = newP.burstTime;
    setProcesses([...processes, newP]);
    soundFX.playQuantumTick();
  };

  const handleUpdateProcess = (index: number, field: keyof Process, value: number) => {
    const updated = [...processes];
    const val = Math.max(0, Number(value) || 0);
    updated[index] = {
      ...updated[index],
      [field]: val,
      remainingTime: field === 'burstTime' ? val : updated[index].remainingTime,
    };
    setProcesses(updated);
  };

  const handleDeleteProcess = (id: string) => {
    if (processes.length <= 1) return;
    setProcesses(processes.filter((p) => p.id !== id));
    soundFX.playQuantumTick();
  };

  const handleLoadPreset = (preset: Process[]) => {
    setProcesses(preset.map((p) => ({ ...p })));
    soundFX.playLaser(450, 0.08);
  };

  return (
    <div className="space-y-6">
      {/* Header & Hero Info Banner */}
      <div className={`p-5 rounded-2xl glass-panel border ${hero.borderColor} relative overflow-hidden transition-all duration-300`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <motion.div 
              key={hero.id}
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="w-13 h-13 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-center text-3xl shadow-xl p-2.5"
            >
              {hero.avatar}
            </motion.div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white tracking-wide">{hero.name}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono border border-cyan-500/20">
                  {hero.osAlgorithm}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/[0.04] text-slate-300 font-mono border border-white/[0.08]">
                  {hero.algorithmType}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{hero.quote}</p>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <span className="text-xs text-slate-400 font-medium">Test Presets:</span>
            <button
              onClick={() => handleLoadPreset(DEFAULT_PRESET_PROCESSES)}
              className="text-xs px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] transition-all"
            >
              Standard Mix
            </button>
            <button
              onClick={() => {
                handleLoadPreset(CONVOY_EFFECT_PRESET);
                setSelectedAlgo('FCFS');
              }}
              className="text-xs px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all flex items-center gap-1.5"
            >
              <Flame className="w-3 h-3" />
              Convoy Effect
            </button>
            <button
              onClick={() => {
                handleLoadPreset(STARVATION_PRESET);
                setSelectedAlgo('SJF');
              }}
              className="text-xs px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3 h-3" />
              Starvation Test
            </button>
          </div>
        </div>

        {/* Algorithm Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
          {(['FCFS', 'SJF', 'PRIORITY', 'RR'] as SchedulerType[]).map((algoKey) => {
            const h = SCHEDULER_HEROES[algoKey];
            const isSelected = selectedAlgo === algoKey;
            return (
              <button
                key={algoKey}
                onClick={() => {
                  setSelectedAlgo(algoKey);
                  soundFX.playLaser(600, 0.06);
                }}
                className={`p-3 rounded-xl flex items-center gap-2.5 transition-all duration-200 text-left border ${
                  isSelected
                    ? `bg-slate-800/90 border-cyan-400/80 shadow-lg shadow-cyan-500/15`
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 text-slate-400'
                }`}
              >
                <span className="text-xl">{h.avatar}</span>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{algoKey}</div>
                  <div className="text-[10px] text-slate-400 truncate">{h.name.split(' ')[0]}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Parameters for RR and Priority */}
        {(selectedAlgo === 'RR' || selectedAlgo === 'PRIORITY') && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between gap-4 flex-wrap"
          >
            {selectedAlgo === 'RR' && (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Sliders className="w-4 h-4 text-fuchsia-400" />
                <span className="text-xs font-medium text-slate-300">Time Quantum ($q$):</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={timeQuantum}
                  onChange={(e) => setTimeQuantum(Number(e.target.value))}
                  className="w-32 accent-fuchsia-400 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                  {timeQuantum} units
                </span>
              </div>
            )}

            {selectedAlgo === 'PRIORITY' && (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium text-slate-300">Aging Factor:</span>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={agingRate}
                  onChange={(e) => setAgingRate(Number(e.target.value))}
                  className="w-32 accent-amber-400 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {agingRate === 0 ? 'OFF (Standard)' : `Boost every ${agingRate} ticks`}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Real-time Metrics Dashboard (4 KPI Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl glass-card border border-cyan-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Avg Waiting Time (AWT)</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-300 font-mono">
            {result.avgWaitingTime} <span className="text-xs text-slate-400 font-normal">units</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Average time spent in Ready Queue</p>
        </div>

        <div className="p-4 rounded-xl glass-card border border-fuchsia-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Avg Turnaround (TAT)</span>
            <CheckCircle2 className="w-4 h-4 text-fuchsia-400" />
          </div>
          <div className="text-2xl font-black text-fuchsia-300 font-mono">
            {result.avgTurnaroundTime} <span className="text-xs text-slate-400 font-normal">units</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Completion Time − Arrival Time</p>
        </div>

        <div className="p-4 rounded-xl glass-card border border-emerald-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>CPU Utilization</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-300 font-mono">
            {result.cpuUtilization}%
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Total active CPU time ratio</p>
        </div>

        <div className="p-4 rounded-xl glass-card border border-amber-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Throughput</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 font-mono">
            {result.throughput} <span className="text-xs text-slate-400 font-normal">proc/unit</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Processes completed per time unit</p>
        </div>
      </div>

      {/* Visual Gantt Chart Timeline */}
      <div className="p-5 rounded-2xl glass-panel space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-base font-bold text-white">Live Gantt Chart Timeline</h3>
            <span className="text-xs text-slate-400 font-mono">
              ({result.totalTime} units total)
            </span>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-[#334155]" /> CPU Idle
            </span>
          </div>
        </div>

        {/* Scrollable Gantt Bar */}
        <div className="overflow-x-auto pb-3 pt-1">
          <div className="min-w-[650px] space-y-1">
            {/* The Bars with Motion */}
            <div className="h-14 w-full bg-slate-950 rounded-xl border border-white/10 flex overflow-hidden p-1 gap-1 shadow-inner">
              {result.ganttChart.map((block, idx) => {
                const duration = block.endTime - block.startTime;
                const isIdle = block.processId === 'IDLE';

                return (
                  <motion.div
                    key={`${selectedAlgo}-${idx}-${block.startTime}`}
                    initial={{ opacity: 0, scaleY: 0.6 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.25, delay: idx * 0.02 }}
                    style={{ flex: `${duration} 0 auto`, minWidth: '40px' }}
                    className={`h-full rounded-lg flex flex-col items-center justify-center relative group transition-all ${
                      isIdle
                        ? 'bg-slate-800/80 text-slate-500 border border-slate-700/50 border-dashed'
                        : 'text-slate-900 font-bold shadow-md hover:brightness-110'
                    }`}
                  >
                    <div
                      className="absolute inset-0 rounded-lg opacity-90"
                      style={{ backgroundColor: block.color }}
                    />
                    <div className="relative z-10 text-xs font-black tracking-wider text-slate-950 drop-shadow-sm">
                      {block.processId}
                    </div>
                    <div className="relative z-10 text-[9px] font-mono text-slate-900/80">
                      [{block.startTime}-{block.endTime}]
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Time Axis Markers */}
            <div className="flex justify-between text-[11px] font-mono text-slate-400 px-1 pt-1">
              <span>0</span>
              {result.ganttChart.map((block, idx) => (
                <span key={idx} style={{ flex: `${block.endTime - block.startTime} 0 auto`, textAlign: 'right' }}>
                  {block.endTime}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Process Configuration Table */}
      <div className="p-5 rounded-2xl glass-panel space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-base font-bold text-white">Process Queue & Calculation Table</h3>
            <p className="text-xs text-slate-400">
              Edit Arrival Time ($AT$), Burst Time ($BT$), or Priority ($P$) to test scenarios in real-time.
            </p>
          </div>

          <button
            onClick={handleAddProcess}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all duration-200"
          >
            <Plus className="w-4 h-4" /> Add Process
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/40">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/80 text-slate-400 font-mono">
                <th className="p-3">Process</th>
                <th className="p-3">Arrival Time (AT)</th>
                <th className="p-3">Burst Time (BT)</th>
                <th className="p-3">Priority (P)</th>
                <th className="p-3 text-cyan-400 font-semibold">Completion (CT)</th>
                <th className="p-3 text-fuchsia-400 font-semibold">Turnaround (TAT)</th>
                <th className="p-3 text-emerald-400 font-semibold">Waiting (WT)</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {result.processes.map((p, idx) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 font-bold flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shadow"
                      style={{ backgroundColor: p.color }}
                    />
                    <span className="text-white">{p.id}</span>
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      value={p.arrivalTime}
                      onChange={(e) => handleUpdateProcess(idx, 'arrivalTime', Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="1"
                      value={p.burstTime}
                      onChange={(e) => handleUpdateProcess(idx, 'burstTime', Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={p.priority}
                      onChange={(e) => handleUpdateProcess(idx, 'priority', Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded bg-slate-900 border border-white/10 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    />
                  </td>
                  <td className="p-3 text-cyan-300 font-bold">{p.completionTime ?? '-'}</td>
                  <td className="p-3 text-fuchsia-300 font-bold">{p.turnaroundTime ?? '-'}</td>
                  <td className="p-3 text-emerald-300 font-bold">{p.waitingTime ?? '-'}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDeleteProcess(p.id)}
                      disabled={processes.length <= 1}
                      className="p-1 text-slate-500 hover:text-red-400 disabled:opacity-30 transition-colors"
                      title="Delete process"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
