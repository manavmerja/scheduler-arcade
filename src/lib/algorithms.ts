import { Process, GanttBlock, SimulationResult } from '@/types/os';

export const PROCESS_COLORS = [
  '#00f0ff', // Cyber Cyan
  '#ff007f', // Cyber Magenta
  '#ffd700', // Cyber Gold
  '#10b981', // Cyber Emerald
  '#a855f7', // Cyber Purple
  '#f97316', // Cyber Orange
  '#3b82f6', // Cyber Blue
  '#ec4899', // Cyber Pink
];

// Helper to clone processes array safely
function cloneProcesses(processes: Process[]): Process[] {
  return processes.map((p, idx) => ({
    ...p,
    remainingTime: p.burstTime,
    color: p.color || PROCESS_COLORS[idx % PROCESS_COLORS.length],
    startTime: undefined,
    completionTime: undefined,
    waitingTime: undefined,
    turnaroundTime: undefined,
    responseTime: undefined,
  }));
}

// 1. FCFS (First-Come, First-Served)
export function calculateFCFS(inputProcesses: Process[]): SimulationResult {
  const processes = cloneProcesses(inputProcesses);
  // Sort primarily by arrival time, then by ID
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime || a.id.localeCompare(b.id));

  const ganttChart: GanttBlock[] = [];
  let currentTime = 0;
  let totalIdleTime = 0;

  for (const p of processes) {
    if (currentTime < p.arrivalTime) {
      // CPU is idle
      ganttChart.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: p.arrivalTime,
        color: '#334155',
      });
      totalIdleTime += p.arrivalTime - currentTime;
      currentTime = p.arrivalTime;
    }

    p.startTime = currentTime;
    p.responseTime = p.startTime - p.arrivalTime;
    p.completionTime = currentTime + p.burstTime;
    p.turnaroundTime = p.completionTime - p.arrivalTime;
    p.waitingTime = p.turnaroundTime - p.burstTime;

    ganttChart.push({
      processId: p.id,
      startTime: currentTime,
      endTime: p.completionTime,
      color: p.color,
    });

    currentTime = p.completionTime;
  }

  return calculateMetrics(processes, ganttChart, currentTime, totalIdleTime);
}

// 2. SJF (Shortest Job First - Preemptive SRTF)
export function calculateSRTF(inputProcesses: Process[]): SimulationResult {
  const processes = cloneProcesses(inputProcesses);
  const n = processes.length;
  if (n === 0) {
    return calculateMetrics([], [], 0, 0);
  }

  const ganttChart: GanttBlock[] = [];
  let currentTime = 0;
  let completed = 0;
  let totalIdleTime = 0;
  let lastPid: string | null = null;
  let currentBlockStart = 0;
  let currentBlockColor = '';

  const maxTimeLimit = 2000; // safety ceiling

  while (completed < n && currentTime < maxTimeLimit) {
    // Find all processes arrived by currentTime with remainingTime > 0
    const available = processes.filter(
      (p) => p.arrivalTime <= currentTime && p.remainingTime > 0
    );

    if (available.length === 0) {
      // Find next arrival time
      const unarrived = processes.filter((p) => p.remainingTime > 0);
      if (unarrived.length === 0) break;
      const nextArrival = Math.min(...unarrived.map((p) => p.arrivalTime));

      if (lastPid !== 'IDLE') {
        if (lastPid !== null) {
          ganttChart.push({
            processId: lastPid,
            startTime: currentBlockStart,
            endTime: currentTime,
            color: currentBlockColor,
          });
        }
        lastPid = 'IDLE';
        currentBlockStart = currentTime;
        currentBlockColor = '#334155';
      }

      totalIdleTime += nextArrival - currentTime;
      currentTime = nextArrival;
      continue;
    }

    // Pick process with shortest remaining time
    available.sort(
      (a, b) =>
        a.remainingTime - b.remainingTime ||
        a.arrivalTime - b.arrivalTime ||
        a.id.localeCompare(b.id)
    );
    const selected = available[0];

    if (selected.startTime === undefined) {
      selected.startTime = currentTime;
      selected.responseTime = currentTime - selected.arrivalTime;
    }

    if (lastPid !== selected.id) {
      if (lastPid !== null) {
        ganttChart.push({
          processId: lastPid,
          startTime: currentBlockStart,
          endTime: currentTime,
          color: currentBlockColor,
        });
      }
      lastPid = selected.id;
      currentBlockStart = currentTime;
      currentBlockColor = selected.color;
    }

    // Execute 1 unit of time
    selected.remainingTime -= 1;
    currentTime += 1;

    if (selected.remainingTime === 0) {
      completed++;
      selected.completionTime = currentTime;
      selected.turnaroundTime = selected.completionTime - selected.arrivalTime;
      selected.waitingTime = selected.turnaroundTime - selected.burstTime;
    }
  }

  if (lastPid !== null && currentTime > currentBlockStart) {
    ganttChart.push({
      processId: lastPid,
      startTime: currentBlockStart,
      endTime: currentTime,
      color: currentBlockColor,
    });
  }

  return calculateMetrics(processes, ganttChart, currentTime, totalIdleTime);
}

// 3. Priority Scheduling (Preemptive with optional Aging)
export function calculatePriority(
  inputProcesses: Process[],
  agingRate = 0 // if > 0, priority decrements (improves) every N ticks in wait
): SimulationResult {
  const processes = cloneProcesses(inputProcesses);
  const n = processes.length;
  if (n === 0) return calculateMetrics([], [], 0, 0);

  const ganttChart: GanttBlock[] = [];
  let currentTime = 0;
  let completed = 0;
  let totalIdleTime = 0;
  let lastPid: string | null = null;
  let currentBlockStart = 0;
  let currentBlockColor = '';

  const maxTimeLimit = 2000;

  // Track dynamic priorities for aging
  const dynamicPriorities = new Map<string, number>();
  processes.forEach((p) => dynamicPriorities.set(p.id, p.priority));

  while (completed < n && currentTime < maxTimeLimit) {
    // Apply aging to waiting arrived processes
    if (agingRate > 0) {
      processes.forEach((p) => {
        if (p.arrivalTime <= currentTime && p.remainingTime > 0) {
          const currentP = dynamicPriorities.get(p.id) || p.priority;
          if (currentTime > p.arrivalTime && (currentTime - p.arrivalTime) % agingRate === 0) {
            dynamicPriorities.set(p.id, Math.max(1, currentP - 1)); // Lower number = higher priority
          }
        }
      });
    }

    const available = processes.filter(
      (p) => p.arrivalTime <= currentTime && p.remainingTime > 0
    );

    if (available.length === 0) {
      const unarrived = processes.filter((p) => p.remainingTime > 0);
      if (unarrived.length === 0) break;
      const nextArrival = Math.min(...unarrived.map((p) => p.arrivalTime));

      if (lastPid !== 'IDLE') {
        if (lastPid !== null) {
          ganttChart.push({
            processId: lastPid,
            startTime: currentBlockStart,
            endTime: currentTime,
            color: currentBlockColor,
          });
        }
        lastPid = 'IDLE';
        currentBlockStart = currentTime;
        currentBlockColor = '#334155';
      }

      totalIdleTime += nextArrival - currentTime;
      currentTime = nextArrival;
      continue;
    }

    // Select lowest priority number (highest priority)
    available.sort((a, b) => {
      const prioA = dynamicPriorities.get(a.id) ?? a.priority;
      const prioB = dynamicPriorities.get(b.id) ?? b.priority;
      if (prioA !== prioB) return prioA - prioB;
      if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
      return a.id.localeCompare(b.id);
    });

    const selected = available[0];

    if (selected.startTime === undefined) {
      selected.startTime = currentTime;
      selected.responseTime = currentTime - selected.arrivalTime;
    }

    if (lastPid !== selected.id) {
      if (lastPid !== null) {
        ganttChart.push({
          processId: lastPid,
          startTime: currentBlockStart,
          endTime: currentTime,
          color: currentBlockColor,
        });
      }
      lastPid = selected.id;
      currentBlockStart = currentTime;
      currentBlockColor = selected.color;
    }

    selected.remainingTime -= 1;
    currentTime += 1;

    if (selected.remainingTime === 0) {
      completed++;
      selected.completionTime = currentTime;
      selected.turnaroundTime = selected.completionTime - selected.arrivalTime;
      selected.waitingTime = selected.turnaroundTime - selected.burstTime;
    }
  }

  if (lastPid !== null && currentTime > currentBlockStart) {
    ganttChart.push({
      processId: lastPid,
      startTime: currentBlockStart,
      endTime: currentTime,
      color: currentBlockColor,
    });
  }

  return calculateMetrics(processes, ganttChart, currentTime, totalIdleTime);
}

// 4. Round Robin (RR with Time Quantum q)
export function calculateRoundRobin(
  inputProcesses: Process[],
  timeQuantum = 2
): SimulationResult {
  const processes = cloneProcesses(inputProcesses);
  const n = processes.length;
  if (n === 0) return calculateMetrics([], [], 0, 0);

  const ganttChart: GanttBlock[] = [];
  let currentTime = 0;
  let totalIdleTime = 0;
  const readyQueue: Process[] = [];
  const inQueue = new Set<string>();

  // Sort initially by arrival time
  const remainingArrivals = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

  // Function to push arrived processes into readyQueue
  const checkArrivals = (time: number) => {
    while (remainingArrivals.length > 0 && remainingArrivals[0].arrivalTime <= time) {
      const arriving = remainingArrivals.shift()!;
      if (!inQueue.has(arriving.id)) {
        readyQueue.push(arriving);
        inQueue.add(arriving.id);
      }
    }
  };

  checkArrivals(currentTime);

  const maxTimeLimit = 3000;

  while ((readyQueue.length > 0 || remainingArrivals.length > 0) && currentTime < maxTimeLimit) {
    if (readyQueue.length === 0) {
      // CPU Idle until next arrival
      const nextArrival = remainingArrivals[0].arrivalTime;
      ganttChart.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: nextArrival,
        color: '#334155',
      });
      totalIdleTime += nextArrival - currentTime;
      currentTime = nextArrival;
      checkArrivals(currentTime);
      continue;
    }

    const currentProcess = readyQueue.shift()!;
    inQueue.delete(currentProcess.id);

    if (currentProcess.startTime === undefined) {
      currentProcess.startTime = currentTime;
      currentProcess.responseTime = currentTime - currentProcess.arrivalTime;
    }

    const execTime = Math.min(currentProcess.remainingTime, timeQuantum);
    const startExec = currentTime;
    currentTime += execTime;
    currentProcess.remainingTime -= execTime;

    ganttChart.push({
      processId: currentProcess.id,
      startTime: startExec,
      endTime: currentTime,
      color: currentProcess.color,
    });

    // Enqueue any newly arrived processes before re-enqueueing current process
    checkArrivals(currentTime);

    if (currentProcess.remainingTime > 0) {
      readyQueue.push(currentProcess);
      inQueue.add(currentProcess.id);
    } else {
      currentProcess.completionTime = currentTime;
      currentProcess.turnaroundTime = currentProcess.completionTime - currentProcess.arrivalTime;
      currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
    }
  }

  return calculateMetrics(processes, ganttChart, currentTime, totalIdleTime);
}

// Calculate statistical metrics
function calculateMetrics(
  processes: Process[],
  ganttChart: GanttBlock[],
  totalTime: number,
  idleTime: number
): SimulationResult {
  const n = processes.length || 1;
  const totalWT = processes.reduce((sum, p) => sum + (p.waitingTime ?? 0), 0);
  const totalTAT = processes.reduce((sum, p) => sum + (p.turnaroundTime ?? 0), 0);
  const totalRT = processes.reduce((sum, p) => sum + (p.responseTime ?? 0), 0);

  const busyTime = Math.max(0, totalTime - idleTime);
  const cpuUtilization = totalTime > 0 ? (busyTime / totalTime) * 100 : 0;
  const throughput = totalTime > 0 ? (processes.length / totalTime) : 0;

  return {
    processes,
    ganttChart,
    totalTime,
    idleTime,
    cpuUtilization: Number(cpuUtilization.toFixed(2)),
    avgWaitingTime: Number((totalWT / n).toFixed(2)),
    avgTurnaroundTime: Number((totalTAT / n).toFixed(2)),
    avgResponseTime: Number((totalRT / n).toFixed(2)),
    throughput: Number(throughput.toFixed(3)),
  };
}
