<div align="center">

# 🕹️✨ 𝗦𝗖𝗛𝗘𝗗𝗨𝗟𝗘𝗥 𝗔𝗥𝗖𝗔𝗗𝗘 ✨🕹️
### *~ Where Operating System Algorithms Become Cute Cyber Heroes! ~* 💖

[![Live Demo](https://img.shields.io/badge/🎮_PLAY_NOW-Live_on_Vercel-ff007f?style=for-the-badge&logo=vercel&logoColor=white)](https://scheduler-arcade.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js_14-00f0ff?style=for-the-badge&logo=next.js&logoColor=black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_18-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Made with Love](https://img.shields.io/badge/Made_with-💖_&_Coffee-ff69b4?style=for-the-badge)](#)

<br/>

> 🌸 **"Missed your college OS lecture? Don't cry! Come play with our CPU heroes instead!"** (づ｡◕‿‿◕｡)づ  
> An interactive, retro-cyberpunk arcade game & real-time visual Gantt simulator for CPU Scheduling!

**[👉 🕹️ Click Here to Play Live on Vercel! 👈](https://scheduler-arcade.vercel.app/)**

---

</div>

<br/>

## 🍭 Welcome to the Arcade! ✨

In **Scheduler Arcade**, the CPU Core is under attack by waves of incoming **Process Monsters** ($P_1, P_2, P_3\dots$)!  
Each monster has an **Arrival Time ($AT$)**, **Burst Time ($BT$)**, and **Priority ($P$)**.

Your mission? **Switch between 4 legendary CPU Schedulers** to blast them, prevent starvation, and keep the CPU happy and healthy! 🍬

---

## 🎀 Meet Our 4 Cutie Heroes! (っ◔◡◔)っ 💖

<div align="center">

| 🛡️ Frank "The FIFO" | ⚡ Swift "SJF" Flash | 👑 Commander Priority | 🌀 Robin "Round Robin" |
| :---: | :---: | :---: | :---: |
| **FCFS Algorithm** | **SJF / SRTF Algorithm** | **Priority Scheduling** | **Round Robin ($q=2$)** |
| *The Loyal Tank* 🏰 | *The Ninja Speedster* 💨 | *The Royal Tactician* 👑 | *The Time-Slice Acrobat* 🎪 |
| 🍿 *Cinema Queue* | 🍫 *Express Counter* | 🚑 *VIP Ambulance* | 🎮 *Sharing PS5 Timer* |
| *"First come, first served!"* | *"Lowest burst dies first!"* | *"VIPs cut the line!"* | *"Everyone gets a slice!"* |

</div>

<br/>

### 🛡️ 1. Frank "The FIFO" *(FCFS - First-Come, First-Served)*
- **Personality**: Super dependable, patient, and fair! He never lets anyone cut the queue.
- **Cute Analogy**: Like standing in line to buy popcorn at the movies! 🍿
- **Special Power**: **FIFO Hammer** 🔨 — Hits the very first monster that stepped into the line!
- **Ultimate Attack**: **Convoy Buster** 💥 — Blasts the whole queue to solve the annoying *Convoy Effect*!
- **Cute Catchphrase**: *"Order is absolute! No cutting the line, please!"* ٩(◕‿◕｡)۶

---

### ⚡ 2. Swift "SJF" Flash *(Shortest Job First / SRTF)*
- **Personality**: Ultra-fast and loves shortcuts! Hates waiting more than 2 seconds.
- **Cute Analogy**: The express grocery counter with $\le 3$ chocolate bars! 🍫
- **Special Power**: **Short-Burst Snipe** 🎯 — Auto-targets and assassinates whoever has the tiniest Burst Time!
- **Ultimate Attack**: **Zero-Wait Matrix** ❄️ — Freezes the clock and slices all small minions instantly!
- **Cute Catchphrase**: *"Why wait in a long queue when you can be fast like lightning?!"* ⚡

---

### 👑 3. Commander Priority *(Priority Scheduling with Aging)*
- **Personality**: Regal, glamorous, and knows who is important. Wears a shiny crown!
- **Cute Analogy**: An emergency ambulance with sirens blaring, or a VIP Disneyland fast-pass! 🚑
- **Special Power**: **Aging Beam** 🪄 — Sprinkles magic aging points onto low-priority tasks so they don't starve!
- **Ultimate Attack**: **Imperial Preemption Strike** 🛰️ — Orbital laser blast targeting critical boss daemons!
- **Cute Catchphrase**: *"Royal tasks first! Low minions, get in line until you age up!"* 👑✨

---

### 🌀 4. Robin "Round Robin" *(Time-Sharing with Quantum $q$)*
- **Personality**: Playful, energetic, and believes in 100% fair equality for everyone!
- **Cute Analogy**: Sharing 1 PlayStation controller with 4 best friends using a 2-minute timer! 🎮
- **Special Power**: **Quantum Slice** 🍕 — Slices exactly $q$ damage across all enemies in rotation!
- **Ultimate Attack**: **Hyper-Clock Whirlwind** 🌪️ — Spins like a cyclone, hitting every monster on screen equally!
- **Cute Catchphrase**: *"Fair share, no tears, everyone gets a turn!"* 🎈

---

## 🎮 What Makes This Game Super Fun? ✨

- 🚀 **Instant 3-Process Waves**: Waves arrive in parallel lanes right from Wave 1 so you can immediately see the difference between heroes!
- 🎯 **Dotted Target Reticle**: Shows exactly **WHO** the hero is attacking with cute labels (`[MIN BT]`, `[VIP P1]`, `[QUANTUM]`, `[FIFO]`).
- 📊 **Real-time Live Gantt Chart**: Watch actual OS execution blocks generate right underneath your battle in real time!
- 🎶 **Retro 8-Bit Synthesizer**: Pure Web Audio API laser zaps, power-up chimes, and victory fanfares (zero heavy audio files!).
- 🧭 **Interactive Guided Tour**: A cute 5-step walkthrough modal with animations and confetti celebration! 🎉
- 📑 **One-Click PDF / Print Export**: Perfect for showing your college professor to get an instant A+! 💯

---

## 📐 Cute & Simple OS Math Formulas 📝

Don't panic! Here are the simple formulas you need to remember:

```
┌─────────────────────────────────────────────────────────────┐
│  ✨ Turnaround Time (TAT) = Completion (CT) - Arrival (AT)  │
│  ✨ Waiting Time (WT)     = Turnaround (TAT) - Burst (BT)   │
│  ✨ Avg Waiting Time (AWT)= (Sum of all WT) / Total Tasks   │
│  ✨ CPU Utilization (%)   = (Busy Time / Total Time) × 100  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack & Magic Ingredients 🪄

| Category | Technology | Why We Used It |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14 (App Router)** | Ultra-fast performance & seamless Vercel deployment ⚡ |
| **Language** | **TypeScript 5** | Strong typing for process states & math accuracy 🛡️ |
| **Styling** | **Tailwind CSS + Glassmorphism** | Modern neo-glass cards, neon borders & sleek dark mode 🌌 |
| **Animations** | **Framer Motion** | Silky smooth spring pills, tab transitions & modal physics 🎈 |
| **Canvas** | **HTML5 Canvas 2D** | 60 FPS responsive laser particles & process collision engine 👾 |
| **Celebration** | **Canvas Confetti** | Exploding colorful confetti when you win! 🎊 |

---

## 🚀 Run It On Your Laptop in 3 Steps! 💻

1. **Clone the cute repo**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/scheduler-arcade.git
   cd scheduler-arcade
   ```

2. **Install the goodies**:
   ```bash
   npm install
   ```

3. **Start the fun**:
   ```bash
   npm run dev
   ```
   Open **`http://localhost:3000`** and enjoy! 🎈

---

<div align="center">

### 🌟 Leave a Star if this helped you pass your OS exam! 🌟

```
       ⭐   ⭐   ⭐   ⭐   ⭐
      (っ˘з(˘⌣˘ )  Thank you!
```

**Live Game**: [https://scheduler-arcade.vercel.app/](https://scheduler-arcade.vercel.app/)  
Crafted with 💖, Next.js, and Operating Systems Love © 2026

</div>
