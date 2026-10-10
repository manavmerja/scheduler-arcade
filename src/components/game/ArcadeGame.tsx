'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { SchedulerType } from '@/types/os';
import { SCHEDULER_HEROES } from '@/lib/heroes';
import { soundFX } from '@/lib/sound';
import { GameTourModal } from './GameTourModal';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Sparkles, 
  Shield, 
  Heart, 
  Flame, 
  Award,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Monster {
  id: string;
  pid: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  burstTime: number;
  remainingTime: number;
  arrivalTime: number;
  priority: number;
  color: string;
  speed: number;
  isBoss?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
}

interface LiveGanttSlice {
  pid: string;
  hero: SchedulerType;
  color: string;
  duration: number;
}

export const ArcadeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeHero, setActiveHero] = useState<SchedulerType>('FCFS');
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [wave, setWave] = useState<number>(1);
  const [cpuHealth, setCpuHealth] = useState<number>(100);
  const [ultimateCharge, setUltimateCharge] = useState<number>(0);
  const [skillCooldown, setSkillCooldown] = useState<number>(0);
  const [defeatedCount, setDefeatedCount] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [liveGantt, setLiveGantt] = useState<LiveGanttSlice[]>([]);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  // Auto show tour on first visit
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('scheduler_arcade_tour_seen');
      if (!seen) {
        setIsTourOpen(true);
        localStorage.setItem('scheduler_arcade_tour_seen', 'true');
      }
    }
  }, []);

  // Internal Game Refs
  const monstersRef = useRef<Monster[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const gameLoopRef = useRef<number | null>(null);
  const lastSpawnTimeRef = useRef<number>(0);
  const nextPidRef = useRef<number>(1);
  const rrIndexRef = useRef<number>(0);
  const attackTimerRef = useRef<number>(0);
  const isUltimateActiveRef = useRef<boolean>(false);
  const ultimateDurationRef = useRef<number>(0);

  const hero = SCHEDULER_HEROES[activeHero];

  // Helper to spawn a single process monster with custom specs
  const createMonster = useCallback((canvas: HTMLCanvasElement, config?: {
    burst?: number;
    priority?: number;
    color?: string;
    xOffset?: number;
    yPos?: number;
    isBoss?: boolean;
  }): Monster => {
    const pid = `P${nextPidRef.current++}`;
    const burst = config?.burst ?? (config?.isBoss ? 25 : Math.floor(Math.random() * 6) + 2);
    const priority = config?.priority ?? (config?.isBoss ? 1 : Math.floor(Math.random() * 5) + 1);
    const colors = ['#00f0ff', '#ff007f', '#ffd700', '#10b981', '#a855f7', '#f97316'];
    const color = config?.color ?? (config?.isBoss ? '#ef4444' : colors[Math.floor(Math.random() * colors.length)]);
    const xOffset = config?.xOffset ?? 0;
    const y = config?.yPos ?? (80 + Math.random() * (canvas.height - 160));

    return {
      id: Math.random().toString(),
      pid,
      x: canvas.width + 30 + xOffset,
      y,
      targetX: 120,
      targetY: y,
      burstTime: burst,
      remainingTime: burst,
      arrivalTime: Date.now(),
      priority,
      color,
      speed: config?.isBoss ? 0.35 : 0.5 + Math.random() * 0.3,
      isBoss: config?.isBoss ?? false,
    };
  }, []);

  // Spawn an educational batch of 2-3 diverse processes
  const spawnProcessBatch = useCallback((count = 3, isBossWave = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isBossWave) {
      monstersRef.current.push(createMonster(canvas, { isBoss: true, burst: 30, priority: 1, yPos: canvas.height / 2 }));
      return;
    }

    // Diverse preset batches so all 4 algorithms have clear strategic targets
    const yStep = (canvas.height - 160) / Math.max(count, 1);
    
    // Process 1: Low Burst Time (SJF Target!)
    monstersRef.current.push(createMonster(canvas, {
      burst: 2,
      priority: 4,
      color: '#10b981', // Emerald
      xOffset: 0,
      yPos: 70 + 0 * yStep,
    }));

    // Process 2: High Priority VIP (Priority Target!)
    if (count >= 2) {
      monstersRef.current.push(createMonster(canvas, {
        burst: 6,
        priority: 1, // P1 VIP!
        color: '#ffd700', // Gold
        xOffset: 45,
        yPos: 70 + 1 * yStep,
      }));
    }

    // Process 3: High Burst Heavy Job (FCFS Convoy / RR multi-slice)
    if (count >= 3) {
      monstersRef.current.push(createMonster(canvas, {
        burst: 9,
        priority: 3,
        color: '#ff007f', // Magenta
        xOffset: 90,
        yPos: 70 + 2 * yStep,
      }));
    }

    // Process 4: Medium Interactive Job
    if (count >= 4) {
      monstersRef.current.push(createMonster(canvas, {
        burst: 4,
        priority: 2,
        color: '#00f0ff', // Cyan
        xOffset: 135,
        yPos: 70 + 1.5 * yStep,
      }));
    }
  }, [createMonster]);

  // Start / Reset Game
  const handleStartGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setCpuHealth(100);
    setScore(0);
    setCombo(0);
    setWave(1);
    setDefeatedCount(0);
    setUltimateCharge(0);
    setSkillCooldown(0);
    setLiveGantt([]);
    monstersRef.current = [];
    particlesRef.current = [];
    nextPidRef.current = 1;
    rrIndexRef.current = 0;
    lastSpawnTimeRef.current = Date.now();
    soundFX.playLaser(700, 0.15);

    // Instantly spawn an initial wave of 3 diverse processes!
    setTimeout(() => {
      spawnProcessBatch(3);
    }, 100);
  };

  // Use Skill
  const handleUseSkill = () => {
    if (skillCooldown > 0 || !isPlaying || monstersRef.current.length === 0) return;
    setSkillCooldown(hero.skillCooldown);
    soundFX.playLaser(800, 0.2);

    const monsters = monstersRef.current;

    if (activeHero === 'FCFS') {
      const sorted = [...monsters].sort((a, b) => a.arrivalTime - b.arrivalTime);
      if (sorted[0]) {
        sorted[0].remainingTime = Math.max(0, sorted[0].remainingTime - 8);
        createExplosion(sorted[0].x, sorted[0].y, sorted[0].color, 15);
      }
    } else if (activeHero === 'SJF') {
      const sorted = [...monsters].sort((a, b) => a.remainingTime - b.remainingTime);
      if (sorted[0]) {
        sorted[0].remainingTime = 0;
        createExplosion(sorted[0].x, sorted[0].y, '#10b981', 20);
      }
    } else if (activeHero === 'PRIORITY') {
      monsters.forEach((m) => {
        m.priority = Math.max(1, m.priority - 2);
        m.remainingTime = Math.max(0, m.remainingTime - 4);
        createExplosion(m.x, m.y, '#ffd700', 8);
      });
    } else if (activeHero === 'RR') {
      monsters.forEach((m) => {
        m.remainingTime = Math.max(0, m.remainingTime - 3);
        createExplosion(m.x, m.y, '#ff007f', 8);
      });
    }
  };

  // Use Ultimate
  const handleUseUltimate = () => {
    if (ultimateCharge < 100 || !isPlaying) return;
    setUltimateCharge(0);
    isUltimateActiveRef.current = true;
    ultimateDurationRef.current = 180;
    soundFX.playUltimate();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}

    monstersRef.current.forEach((m) => {
      m.remainingTime = Math.max(0, m.remainingTime - 12);
      createExplosion(m.x, m.y, '#ffd700', 15);
    });
  };

  const createExplosion = (x: number, y: number, color: string, count = 10) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        alpha: 1,
        size: Math.random() * 4 + 2,
      });
    }
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setSkillCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Main Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = Math.min(460, Math.max(340, window.innerHeight * 0.45));
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid Background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw CPU Core
      const cpuX = 60;
      const cpuY = canvas.height / 2;
      const cpuRadius = 45;

      const grad = ctx.createRadialGradient(cpuX, cpuY, 10, cpuX, cpuY, cpuRadius + 15);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.3)');
      grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cpuX, cpuY, cpuRadius + 15, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cpuX, cpuY, cpuRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CPU CORE', cpuX, cpuY - 8);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`${cpuHealth}% HP`, cpuX, cpuY + 12);

      ctx.font = '28px sans-serif';
      ctx.fillText(hero.avatar, cpuX + 50, cpuY + 10);

      if (isPlaying) {
        const now = Date.now();
        // Spawn batches of 2-3 processes periodically
        const spawnDelay = Math.max(3000, 5000 - wave * 300);
        if (now - lastSpawnTimeRef.current > spawnDelay) {
          const isBoss = wave % 5 === 0 && monstersRef.current.length === 0;
          spawnProcessBatch(isBoss ? 1 : Math.min(3, 2 + Math.floor(wave / 2)), isBoss);
          lastSpawnTimeRef.current = now;
        }

        // Determine target based on active OS hero
        let target: Monster | null = null;
        const monsters = monstersRef.current;

        if (monsters.length > 0) {
          if (activeHero === 'FCFS') {
            target = [...monsters].sort((a, b) => a.arrivalTime - b.arrivalTime)[0];
          } else if (activeHero === 'SJF') {
            target = [...monsters].sort((a, b) => a.remainingTime - b.remainingTime)[0];
          } else if (activeHero === 'PRIORITY') {
            target = [...monsters].sort((a, b) => a.priority - b.priority)[0];
          } else if (activeHero === 'RR') {
            const validIndex = rrIndexRef.current % monsters.length;
            target = monsters[validIndex] || monsters[0];
          }
        }

        // Attack Tick Speed (Swift and Robin shoot faster!)
        const attackInterval = activeHero === 'RR' ? 22 : activeHero === 'SJF' ? 26 : 34;

        attackTimerRef.current++;
        if (attackTimerRef.current % attackInterval === 0 && target) {
          // In RR, advance the round robin quantum index after each slice
          if (activeHero === 'RR') {
            rrIndexRef.current = (rrIndexRef.current + 1) % monsters.length;
          }

          const damage = activeHero === 'FCFS' ? 2.5 : activeHero === 'PRIORITY' ? 2 : 1.6;
          target.remainingTime = Math.max(0, target.remainingTime - damage);
          soundFX.playLaser(activeHero === 'RR' ? 750 : 550, 0.06);

          // Draw laser line
          ctx.strokeStyle = hero.color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(cpuX + 65, cpuY);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();

          createExplosion(target.x, target.y, target.color, 4);

          setLiveGantt((prev) => [
            ...prev.slice(-12),
            {
              pid: target!.pid,
              hero: activeHero,
              color: target!.color,
              duration: 1,
            },
          ]);

          setUltimateCharge((prev) => Math.min(100, prev + 5));
        }

        // Update & Render Monsters
        for (let i = monstersRef.current.length - 1; i >= 0; i--) {
          const m = monstersRef.current[i];
          m.x -= m.speed;

          if (m.x <= cpuX + cpuRadius + 10) {
            setCpuHealth((prev) => {
              const next = Math.max(0, prev - (m.isBoss ? 25 : 10));
              if (next <= 0) {
                setIsPlaying(false);
                setIsGameOver(true);
                soundFX.playExplode();
              }
              return next;
            });
            soundFX.playHit();
            createExplosion(m.x, m.y, '#ef4444', 15);
            monstersRef.current.splice(i, 1);
            setCombo(0);
            continue;
          }

          if (m.remainingTime <= 0) {
            soundFX.playHit();
            createExplosion(m.x, m.y, m.color, 20);
            setScore((prev) => prev + (m.isBoss ? 500 : 100) + combo * 10);
            setCombo((prev) => prev + 1);
            setDefeatedCount((prev) => {
              const nextCount = prev + 1;
              if (nextCount % 6 === 0) {
                setWave((w) => w + 1);
                soundFX.playVictory();
              }
              return nextCount;
            });
            monstersRef.current.splice(i, 1);
            continue;
          }

          const radius = m.isBoss ? 28 : 18;
          const isTargeted = target && target.id === m.id;

          // Target lock-on reticle highlight around actively scheduled process
          if (isTargeted) {
            ctx.save();
            ctx.strokeStyle = hero.color;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.arc(m.x, m.y, radius + 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // Label targeting logic above
            ctx.fillStyle = hero.color;
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            const targetReason = activeHero === 'SJF' ? 'MIN BT' : activeHero === 'PRIORITY' ? 'VIP P1' : activeHero === 'RR' ? 'QUANTUM' : 'FIFO';
            ctx.fillText(`TARGET [${targetReason}]`, m.x, m.y - radius - 20);
          }

          // Shadow / Glow
          ctx.fillStyle = m.color + '22';
          ctx.beginPath();
          ctx.arc(m.x, m.y, radius + 6, 0, Math.PI * 2);
          ctx.fill();

          // Body
          ctx.fillStyle = '#0f172a';
          ctx.strokeStyle = m.color;
          ctx.lineWidth = isTargeted ? 3 : 2;
          ctx.beginPath();
          ctx.arc(m.x, m.y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // PID Label
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${m.isBoss ? '12px' : '10px'} monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(m.pid, m.x, m.y + 3);

          // Priority Badge & Burst
          ctx.fillStyle = '#ffd700';
          ctx.font = '9px monospace';
          ctx.fillText(`P${m.priority} • BT:${Math.ceil(m.remainingTime)}`, m.x, m.y - radius - 8);

          // HP / Remaining Burst Bar
          const barWidth = radius * 2.2;
          const barHeight = 4;
          const hpRatio = m.remainingTime / m.burstTime;

          ctx.fillStyle = '#334155';
          ctx.fillRect(m.x - barWidth / 2, m.y - radius - 4, barWidth, barHeight);

          ctx.fillStyle = m.color;
          ctx.fillRect(m.x - barWidth / 2, m.y - radius - 4, barWidth * hpRatio, barHeight);
        }

        // Update Particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.03;

          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
          } else {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      }

      gameLoopRef.current = requestAnimationFrame(render);
    };

    gameLoopRef.current = requestAnimationFrame(render);

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [isPlaying, activeHero, hero, wave, cpuHealth, combo, spawnProcessBatch]);

  return (
    <div className="space-y-4">
      {/* Interactive Tour Modal */}
      <GameTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onStartGame={handleStartGame}
      />

      {/* Top Game HUD Bar */}
      <div className="p-4 rounded-2xl glass-panel flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            <div className="w-28 sm:w-36 h-3 bg-slate-900 rounded-full overflow-hidden border border-white/10 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${cpuHealth}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-white">{cpuHealth}%</span>
          </div>

          <div className="flex items-center gap-2 pl-3 border-l border-white/10">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-400">Score:</span>
            <span className="text-sm font-mono font-black text-cyan-300">{score}</span>
          </div>

          {combo > 1 && (
            <div className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold animate-bounce flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              {combo}x Combo!
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* How to Play Button */}
          <button
            onClick={() => {
              setIsTourOpen(true);
              soundFX.playQuantumTick();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How to Play</span>
          </button>

          {!isPlaying ? (
            <button
              onClick={handleStartGame}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/30 transition-all uppercase tracking-wider"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              {isGameOver ? 'Play Again' : 'Start Defense'}
            </button>
          ) : (
            <button
              onClick={() => setIsPlaying(false)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-semibold"
            >
              <Pause className="w-4 h-4" /> Pause
            </button>
          )}

          <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300">
            Wave {wave} • {defeatedCount} Cleared
          </div>
        </div>
      </div>

      {/* Main Canvas Arena Box */}
      <div className="relative rounded-2xl overflow-hidden glass-panel border border-cyan-500/30 shadow-2xl">
        <canvas ref={canvasRef} className="w-full block bg-[#090d16]" />

        {/* Start Overlay if paused/game over */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            {isGameOver ? (
              <>
                <span className="text-4xl">💥</span>
                <h3 className="text-2xl font-black text-red-400">CPU Core Starved!</h3>
                <p className="text-xs text-slate-400 max-w-md">
                  Process queues overwhelmed the registers! Final Score: <span className="text-cyan-300 font-bold font-mono">{score}</span>
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleStartGame}
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/40 uppercase tracking-wider transition-all"
                  >
                    Restart Wave Defense
                  </button>
                  <button
                    onClick={() => setIsTourOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    Review Tour
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="text-4xl animate-bounce">🕹️</span>
                <h3 className="text-2xl font-black text-white">Scheduler Arcade Defense</h3>
                <p className="text-xs text-slate-400 max-w-md">
                  Multiple processes with different Burst Times & Priorities enter together. Switch heroes dynamically to counter them!
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleStartGame}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:brightness-110 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/40 uppercase tracking-wider transition-all"
                  >
                    Deploy CPU Heroes
                  </button>
                  <button
                    onClick={() => setIsTourOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    How to Play
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile-First Interactive Hero Switcher & Power Pad */}
      <div className="p-4 rounded-2xl glass-panel space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            Switch Active Scheduler Hero (Touch / Keys 1-4):
          </span>
          <span className="hidden sm:inline font-mono text-cyan-400">
            Active: {hero.name} ({hero.osAlgorithm})
          </span>
        </div>

        {/* 4 Hero Switch Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['FCFS', 'SJF', 'PRIORITY', 'RR'] as SchedulerType[]).map((key, idx) => {
            const h = SCHEDULER_HEROES[key];
            const isSelected = activeHero === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveHero(key);
                  soundFX.playLaser(500 + idx * 80, 0.08);
                }}
                className={`p-3 rounded-xl flex items-center gap-3 transition-all text-left border ${
                  isSelected
                    ? `bg-slate-800/90 ${h.borderColor} shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400`
                    : 'bg-slate-900/40 border-white/5 hover:border-white/20 text-slate-400'
                }`}
              >
                <span className="text-2xl">{h.avatar}</span>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                    <span>{h.name.split(' ')[0]}</span>
                    <span className="text-[10px] px-1 rounded bg-slate-800 text-slate-400 font-mono">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="text-[10px] text-cyan-400 truncate">{h.id}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Skill & Ultimate Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleUseSkill}
            disabled={skillCooldown > 0 || !isPlaying}
            className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all shadow-lg ${
              skillCooldown === 0 && isPlaying
                ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/40 text-amber-300 hover:brightness-125'
                : 'bg-slate-900/50 border-white/5 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{hero.skillName}</span>
            {skillCooldown > 0 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                {skillCooldown}s
              </span>
            )}
          </button>

          <button
            onClick={handleUseUltimate}
            disabled={ultimateCharge < 100 || !isPlaying}
            className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all shadow-lg ${
              ultimateCharge >= 100 && isPlaying
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 border-fuchsia-400 text-white animate-pulse shadow-fuchsia-500/40'
                : 'bg-slate-900/50 border-white/5 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Zap className="w-4 h-4 text-fuchsia-400" />
            <span>{hero.ultimateName}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-fuchsia-300">
              {ultimateCharge}%
            </span>
          </button>
        </div>
      </div>

      {/* Live In-Game Gantt Stream */}
      {liveGantt.length > 0 && (
        <div className="p-3.5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Execution Gantt Buffer:
            </span>
            <span className="text-[11px] font-mono">Auto-generated via Combat</span>
          </div>

          <div className="flex gap-1 overflow-x-auto pb-1">
            {liveGantt.map((slice, idx) => (
              <div
                key={idx}
                className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-slate-950 shrink-0 shadow-sm"
                style={{ backgroundColor: slice.color }}
              >
                {slice.pid} ({slice.hero})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
