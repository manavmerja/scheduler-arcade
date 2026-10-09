# 🕹️ Scheduler Arcade

> **An Interactive Operating Systems CPU Scheduling Arcade & Live Visual Engine**  
> Built with Next.js 14, React 18, TypeScript, Tailwind CSS, and Framer Motion.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## 🌟 Overview

**Scheduler Arcade** is an educational yet fast-paced action web application where fundamental **Operating System CPU Scheduling Algorithms** come alive as playable heroes defending the CPU Core against process waves.

### ✨ Key Features:
- 🎮 **Playable Arcade Arena**: Control 4 legendary Scheduler Heroes, swap them dynamically on the fly to counter incoming process waves, and trigger screen-clearing ultimates.
- 📊 **Real-Time OS Gantt Simulator**: Customize Arrival Times ($AT$), Burst Times ($BT$), and Priorities ($P$) to generate live Gantt charts and automated metrics ($AWT, TAT$, CPU Utilization, Throughput).
- 📑 **Academic Concept Chart**: Side-by-side algorithmic comparison matrix, mathematical formulas, and a built-in **Print / Export PDF** layout for university assignments.
- 🧠 **"OS for 10-Year-Olds" Guide**: Crystal-clear real-life analogies (Cinema lines, Supermarket express counters, VIP sirens, PS5 sharing timers).
- 🧭 **Interactive "How to Play" Guided Tour**: Step-by-step onboarding walkthrough with smooth physics animations and confetti.
- 📱 **Mobile-First & Responsive**: Full touch controls, responsive bottom thumb navigation, and keyboard hotkeys (`1-4`).

---

## 🛡️ The 4 Scheduler Heroes & OS Concept Mapping

| Hero | OS Algorithm | Category | Special Passive | Active Skill | Ultimate Power | Real-Life Analogy |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **🛡️ Frank "The FIFO"** | **FCFS** *(First-Come, First-Served)* | Non-Preemptive | **Queue Discipline**: +25% bonus combo damage when eliminating tasks strictly in FIFO order. | **FIFO Hammer**: Strikes head of the arrival queue. | **Convoy Buster**: Blasts accumulated waiting time to break the Convoy Effect. | The regular Cinema Ticket Line. |
| **⚡ Swift "SJF" Flash** | **SJF / SRTF** *(Shortest Job First)* | Preemptive | **Optimal Latency**: +30% attack speed when executing short-burst jobs ($BT \le 3$). | **Short-Burst Snipe**: Teleports to lowest remaining burst time. | **Zero-Wait Matrix**: Freezes time and slices all short minions. | Supermarket Express Checkout Counter. |
| **👑 Commander Priority** | **Priority Scheduling** | Preemptive | **VIP Clearance**: High-priority kills restore CPU shields and reset cooldowns. | **Aging Beam**: Applies Aging to waiting tasks to prevent starvation. | **Imperial Preemption Strike**: Orbital laser obliterating high threats. | Ambulance Siren / VIP Hospital Ward. |
| **🌀 Robin "Round Robin"** | **Round Robin (RR)** | Preemptive ($q$) | **Fair-Share Cadence**: Equal-tempo target switching grants energy shields. | **Quantum Slice**: Deals fixed time-sliced damage evenly across all foes. | **Time Slice Whirlwind**: Instant micro-slices across all targets on screen. | Sharing 1 PS5 with 4 friends using a timer. |

---

## 📐 Mathematical Formulations

- **Turnaround Time ($TAT$)**:
  $$TAT = \text{Completion Time } (CT) - \text{Arrival Time } (AT)$$
- **Waiting Time ($WT$)**:
  $$WT = \text{Turnaround Time } (TAT) - \text{Burst Time } (BT)$$
- **Average Waiting Time ($AWT$)**:
  $$AWT = \frac{\sum_{i=1}^{n} WT_i}{n}$$
- **Average Turnaround Time ($ATAT$)**:
  $$ATAT = \frac{\sum_{i=1}^{n} TAT_i}{n}$$
- **CPU Utilization ($\%$)**:
  $$\text{Utilization} = \left(\frac{\text{Total Busy Time}}{\text{Total Execution Time}}\right) \times 100$$

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router)
- **UI & Styling**: Tailwind CSS, Neo-Glassmorphism, Lucide React Icons
- **Motion & VFX**: Framer Motion, Canvas Confetti
- **Audio**: Web Audio API Sound Synthesizer (zero external assets required)
- **Engine**: Pure TypeScript CPU Scheduling Algorithms & HTML5 Canvas Rendering Engine

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- npm or yarn

### Installation & Run

1. Clone the repository:
```bash
git clone https://github.com/your-username/scheduler-arcade.git
cd scheduler-arcade
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 License
MIT License © 2026. Built with ❤️ for Operating Systems Project.
