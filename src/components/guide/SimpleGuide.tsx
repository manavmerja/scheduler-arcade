'use client';

import React, { useState } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  ArrowRight, 
  Heart, 
  HelpCircle, 
  Laugh, 
  Zap, 
  Clock, 
  ShieldAlert,
  Cake,
  ShoppingBag,
  Ambulance,
  Play
} from 'lucide-react';
import { soundFX } from '@/lib/sound';

export const SimpleGuide: React.FC = () => {
  const [activeStory, setActiveStory] = useState<'fcfs' | 'sjf' | 'priority' | 'rr'>('fcfs');

  const stories = {
    fcfs: {
      title: 'Frank & The Movie Ticket Queue',
      subtitle: 'FCFS (First Come, First Served)',
      icon: '🍿',
      hero: 'Frank "The FIFO"',
      accentColor: 'border-cyan-500/40 text-cyan-400',
      analogy: 'The Cinema Line & The Popcorn Monster',
      story: `Imagine you and your friends are standing in line to buy tickets for a blockbuster movie. 
      Frank the Security Guard has one golden rule: "Whoever arrived first gets their ticket first!"`,
      theGood: 'It is 100% fair. Nobody cuts the line, and everyone knows exactly when their turn is coming.',
      theBad: `THE CONVOY EFFECT! Suppose the first guy at the ticket counter wants to book 150 tickets, 
      order 50 tubs of popcorn, and pay in pennies. Everyone behind him with just 1 quick ticket has to wait for 45 minutes!`,
      osTerm: 'Non-Preemptive FIFO (First In, First Out). Simple, but high Average Waiting Time when large jobs arrive first.',
    },
    sjf: {
      title: 'Swift & The Express Grocery Checkout',
      subtitle: 'SJF / SRTF (Shortest Job First)',
      icon: '⚡',
      hero: 'Swift "SJF" Flash',
      accentColor: 'border-emerald-500/40 text-emerald-400',
      analogy: 'Supermarket Express Counter (≤ 3 Items)',
      story: `Imagine you're at the supermarket holding just 1 chocolate bar. Behind you is someone with 4 overflowing shopping carts.
      Swift the Ninja says: "Hey! Let the kid with 1 chocolate pay first—it will only take 5 seconds!"`,
      theGood: 'Mathematically proven to give the lowest average waiting time for the whole crowd!',
      theBad: `STARVATION! If 50 new kids with 1 chocolate bar keep entering the store, the uncle with the 4 carts will wait there until tomorrow morning and starve!`,
      osTerm: 'SRTF (Shortest Remaining Time First). Optimal AWT, but vulnerable to starvation of long burst processes.',
    },
    priority: {
      title: 'Commander Priority & The VIP Ambulance',
      subtitle: 'Priority Scheduling with Aging',
      icon: '👑',
      hero: 'Commander Priority',
      accentColor: 'border-amber-500/40 text-amber-400',
      analogy: 'Ambulance Siren & Hospital Emergency Ward',
      story: `At a traffic signal, all cars are waiting. Suddenly, an Ambulance with sirens blaring arrives. 
      Commander Priority commands: "All ordinary cars STOP! High-Priority emergency passes first!"`,
      theGood: 'Critical system tasks (like antivirus alerts or audio playing) never stutter or lag.',
      theBad: `STARVATION OF REGULAR CARS! To fix this, OS uses "AGING": the longer a normal car waits, the more VIP points it gains until it gets to go!`,
      osTerm: 'Priority Preemption + Aging Technique. Critical processes execute first; aging prevents indefinite starvation.',
    },
    rr: {
      title: 'Robin & The 2-Minute PS5 Sharing Rule',
      subtitle: 'Round Robin (Time Quantum q)',
      icon: '🌀',
      hero: 'Robin "Round Robin"',
      accentColor: 'border-pink-500/40 text-pink-400',
      analogy: 'Sharing 1 PlayStation Controller with 4 Friends',
      story: `You and 3 friends want to play on one PS5. To prevent fighting, Robin sets a 2-minute timer ($q = 2$). 
      You play for 2 minutes, then BEEP! You pass the controller to Friend #2, then Friend #3, then back to you!`,
      theGood: 'No one is ever left out or waits forever. Everyone feels like the game is running smoothly at the same time.',
      theBad: `CONTEXT SWITCH OVERHEAD! If the timer is set to 2 seconds, you waste all your game time just passing the controller back and forth!`,
      osTerm: 'Time-Sharing / Preemptive Round Robin. Ideal for modern desktop multitasking operating systems.',
    },
  };

  const cur = stories[activeStory];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl glass-panel text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-2xl">🧠</span>
            <h2 className="text-xl font-bold text-white tracking-wide">
              OS CPU Scheduling — Explained in 2 Minutes!
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Missed the college lecture? No problem. Here is how CPU schedulers actually work using real-life stories!
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-white/10">
          {(['fcfs', 'sjf', 'priority', 'rr'] as const).map((key) => (
            <button
              key={key}
              onClick={() => {
                setActiveStory(key);
                soundFX.playQuantumTick();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                activeStory === key
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Main Story Interactive Card */}
      <div className={`p-6 rounded-2xl glass-panel border ${cur.accentColor} space-y-6 relative overflow-hidden transition-all duration-300`}>
        {/* Title */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-2.5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg">
              {cur.icon}
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">{cur.title}</h3>
              <p className="text-xs text-slate-400 font-mono">{cur.subtitle} • {cur.hero}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-cyan-300 text-xs font-medium border border-white/10">
            {cur.analogy}
          </span>
        </div>

        {/* The Story Box */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            The Story:
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed">{cur.story}</p>
        </div>

        {/* The Good vs The Bad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span>👍</span> Why It Is Awesome (The Good):
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{cur.theGood}</p>
          </div>

          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-1.5">
            <div className="text-xs font-bold text-red-400 flex items-center gap-1.5">
              <span>⚠️</span> The Big Problem (The Catch):
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{cur.theBad}</p>
          </div>
        </div>

        {/* Academic Connection */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-cyan-300">OS Exam Concept: </span>
            <span className="text-slate-300">{cur.osTerm}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
