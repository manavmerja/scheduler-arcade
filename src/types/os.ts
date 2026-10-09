export type SchedulerType = 'FCFS' | 'SJF' | 'PRIORITY' | 'RR';

export interface Process {
  id: string; // e.g. "P1"
  name?: string;
  arrivalTime: number; // AT
  burstTime: number; // BT
  remainingTime: number; // For SRTF/RR execution
  priority: number; // Lower number = higher priority (or 1-5 scale)
  color: string;
  deadline?: number;
  
  // Results
  startTime?: number;
  completionTime?: number;
  waitingTime?: number;
  turnaroundTime?: number;
  responseTime?: number;
}

export interface GanttBlock {
  processId: string;
  startTime: number;
  endTime: number;
  color: string;
}

export interface SimulationResult {
  processes: Process[];
  ganttChart: GanttBlock[];
  totalTime: number;
  idleTime: number;
  cpuUtilization: number;
  avgWaitingTime: number;
  avgTurnaroundTime: number;
  avgResponseTime: number;
  throughput: number; // processes per unit time
}

export interface HeroInfo {
  id: SchedulerType;
  name: string;
  title: string;
  avatar: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  glowColor: string;
  archetype: string;
  osAlgorithm: string;
  algorithmType: 'Non-Preemptive' | 'Preemptive' | 'Preemptive / Non-Preemptive';
  quote: string;
  passiveName: string;
  passiveDesc: string;
  skillName: string;
  skillDesc: string;
  skillCooldown: number; // seconds
  ultimateName: string;
  ultimateDesc: string;
  ultimateChargeNeeded: number;
  keyStrength: string;
  weakness: string;
  simpleAnalogy: string;
}

export interface ProcessMonster {
  id: string;
  pid: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  hp: number;
  maxHp: number;
  arrivalTime: number;
  burstTime: number;
  priority: number;
  color: string;
  isBoss?: boolean;
  age: number; // for aging mechanic
  state: 'arriving' | 'queued' | 'executing' | 'defeated' | 'leaked';
}

export interface GameLevel {
  level: number;
  title: string;
  description: string;
  recommendedHero: SchedulerType;
  targetAWT: number;
  waveCount: number;
  spawnInterval: number;
  burstRange: [number, number];
  priorityRange: [number, number];
  hasBoss?: boolean;
}
