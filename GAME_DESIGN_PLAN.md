# 🕹️ Scheduler Arcade — Master Game Design Document & OS Concept Plan

## 1. Executive Summary & Game Vision

**"Scheduler Arcade"** is a retro-cyberpunk themed action-arcade game and interactive OS simulator. Players defend the **CPU Core** against waves of incoming **Process Monsters** (each with Arrival Time $AT$, Burst Time $BT$, Priority $P$, and Deadlines).

Players select and switch between 4 legendary **Scheduler Heroes**, each whose combat mechanics, abilities, and passives accurately simulate real Operating System CPU Scheduling Algorithms.

---

## 2. The 4 Scheduler Heroes & OS Power Design

```
+---------------------------------------------------------------------------------------+
|                                    SCHEDULER ARCADE                                   |
+-------------------+--------------------+--------------------+-------------------------+
|  FRANK "THE FIFO" |  SWIFT "SJF" FLASH | COMMANDER PRIORITY |   ROBIN "ROUND ROBIN"   |
|   (Heavy Paladin) |  (Agile Assassin)  |  (VIP Tactician)   |   (Multi-task Monk)     |
+-------------------+--------------------+--------------------+-------------------------+
| OS: FCFS          | OS: SJF / SRTF     | OS: Priority Sched | OS: Round Robin (RR)    |
| Power: Convoy     | Power: Short-Burst | Power: Preemption  | Power: Time Quantum     |
|   Discipline      |   Execution        |   & Aging Boost    |   Multi-Slice           |
+-------------------+--------------------+--------------------+-------------------------+
```

### 1. Frank "The First" (FCFS - First-Come, First-Served)

* **Archetype**: Heavy Paladin / Steel Brawler
* **OS Concept**: Non-preemptive, strictly FIFO order. Simple and fair arrival execution, but vulnerable to the **Convoy Effect** (short jobs stuck behind massive burst jobs).
* **Passives & Skills**:
  * **Passive — Queue Discipline**: Deals +25% bonus combo damage when eliminating processes strictly in their arrival order ($AT$).
  * **Skill 1 — FIFO Hammer**: Direct single-target heavy strike on the head of the ready queue.
  * **Ultimate — Convoy Buster**: Charges through long-burst heavy processes, converting accumulated queue waiting time into an explosive shockwave!

---

### 2. Swift "SJF" Flash (Shortest Job First / SRTF)

* **Archetype**: High-Speed Ninja / Dual-Dagger Assassin
* **OS Concept**: Preemptive Shortest Remaining Time First (SRTF). Mathematically achieves the **minimum average waiting time ($AWT$)**, but risks **Starvation** of long processes.
* **Passives & Skills**:
  * **Passive — Minimal Latency**: Gains +30% movement & attack speed for every short job ($BT \le 3$) cleared.
  * **Skill 1 — Short-Burst Snipe**: Instantly teleports to and executes the process with the lowest Remaining Burst Time.
  * **Ultimate — Zero-Wait Matrix (SRTF Overdrive)**: Freezes global clock, rapidly slicing all low-burst minions before they can reach the CPU core.

---

### 3. Commander Priority (Priority Scheduling with Aging)

* **Archetype**: Royal Battle-Mage / Tactical Officer
* **OS Concept**: Preemptive Priority Scheduling. Dispatches based on urgency levels (System > Interactive > Background). Solves starvation using the **Aging Technique**.
* **Passives & Skills**:
  * **Passive — VIP Clearance**: High-priority enemy kills immediately regenerate ability cooldowns and shield the CPU.
  * **Skill 1 — Aging Beam**: Enforces Aging on waiting lower-priority tasks, converting them into empowered friendly allies or neutralizing their threat.
  * **Ultimate — Imperial Preemption Strike**: Orbital laser beam that vaporizes all processes whose Priority exceeds the current CPU safety threshold.

---

### 4. Robin "Round Robin" (Time-Slice Acrobat)

* **Archetype**: Dual-Gunner / Whirlwind Acrobat
* **OS Concept**: Pure preemptive time-slicing using a fixed **Time Quantum ($q$)**. Guarantees zero starvation and maximum responsiveness in interactive systems.
* **Passives & Skills**:
  * **Passive — Fair-Share Cadence**: Swapping targets in rhythm with the Quantum Timer grants stacking energy shields.
  * **Skill 1 — Quantum Slice ($q=2s$)**: Fires a burst of exact time-sliced damage evenly distributed across all active enemies in the Ready Ring.
  * **Ultimate — Hyper-Clock Multi-Threader**: Sets Time Quantum to near-zero ($q \to 0$), executing micro-slices across all enemies simultaneously without dropping throughput!

---

## 3. Core Gameplay Loop & Mechanics

```WebAssembly
graph LR
    A[Process Spawner / Wave Entry] --> B[Ready Queue / Ring Buffer]
    B --> C{Player Selects Scheduler Hero}
    C -->|FCFS| D[Process in FIFO Order]
    C -->|SJF| E[Target Lowest Burst First]
    C -->|Priority| F[Target Highest Urgency]
    C -->|RR| G[Cycle with Time Quantum]
    D & E & F & G --> H[CPU Core Execution / Combat]
    H --> I[Live Gantt Chart & OS Metrics Calc]
    I --> J[Score, Throughput, AWT & Boss Clear]
```

1. **Incoming Process Monsters**:

   - **Process ID (PID)**: e.g., $P_1, P_2, P_3...$
   - **Burst Time ($BT$)**: Monster HP / execution cycles.
   - **Arrival Time ($AT$)**: Time monster enters the arena.
   - **Priority ($P$)**: 1 (Critical Boss Minion) to 5 (Low-priority Daemon).
   - **Deadline Timer**: If not processed before deadline, causes CPU Throttling or Health Loss.
2. **Real-time Live OS Dashboard (Educational HUD)**:

   - **Live Gantt Chart**: Draws in real-time as you fight and switch characters!
   - **Real-Time Metrics Bar**:
     - Average Waiting Time ($AWT = \frac{\sum WT}{n}$)
     - Average Turnaround Time ($TAT = CT - AT$)
     - CPU Utilization ($\%$)
     - Throughput (Processes completed per minute)
3. **Game Modes**:

   - **Campaign / Arcade Stages**:
     - *Level 1*: The FIFO Valley (Mastering FCFS & breaking convoys)
     - *Level 2*: Short-Burst Rapids (SJF speedrun challenges)
     - *Level 3*: VIP Fortress (Priority scheduling & managing aging)
     - *Level 4*: Quantum Arena (Round Robin quantum tuning: $q=1, 2, 4$)
     - *Level 5*: **Boss Fight: The Deadlock Dragon & The Thrashing Void** (Requires Multi-Level Feedback Queue hero switching to defeat!)
   - **Sandbox / Algorithm Simulator Mode**:
     - Enter custom process tables ($AT, BT, Priority$) and watch heroes auto-battle or manually execute them, showing step-by-step Gantt calculations.

---

## 4. Concept Chart Plan (Academic Deliverable)

The **Concept Chart** will be structured into a clean, aesthetic visual infographic / cheat-sheet:

1. **Hero vs Algorithm Comparison Matrix**:
   - Algorithm Type (Preemptive vs Non-Preemptive)
   - Time Complexity / Overhead
   - Pros & Cons (Convoy Effect, Starvation, Fairness, Throughput)
   - Hero Special Ability Correlation
2. **Mathematical Formulas Reference**:
   - $TAT = CT - AT$
   - $WT = TAT - BT$
   - Response Time ($RT = \text{First Run Time} - AT$)
3. **Architecture Diagram**:
   - Ready Queue $\to$ Dispatcher $\to$ CPU Burst $\to$ I/O Wait State $\to$ Terminated.

---

## 5. Proposed Technology & Visual Aesthetic

- **Stack**: Pure HTML5 Canvas + Vanilla JavaScript (ES6 Modules) + Modern CSS (Cyberpunk/Arcade Theme with Neon Glow, Glassmorphism, Google Fonts like Orbitron & Inter).
- **Sound & VFX**: Retro 8-bit sound synth effects, particle explosions on process termination, smooth Gantt chart animation.
- **Portability**: Single self-contained bundle or clean web app ready to run locally in any browser without complicated setup.
