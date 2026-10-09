'use client';

import React, { useState } from 'react';
import { Navbar, NavTab } from '@/components/layout/Navbar';
import { ArcadeGame } from '@/components/game/ArcadeGame';
import { GanttVisualizer } from '@/components/simulator/GanttVisualizer';
import { ConceptChart } from '@/components/chart/ConceptChart';
import { SimpleGuide } from '@/components/guide/SimpleGuide';
import { soundFX } from '@/lib/sound';
import { Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<NavTab>('game');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundFX.enabled = nextState;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      {/* Responsive Top Navbar & Mobile Bottom Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area with Smooth Page Transition */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {activeTab === 'game' && <ArcadeGame />}
            {activeTab === 'simulator' && <GanttVisualizer />}
            {activeTab === 'chart' && <ConceptChart />}
            {activeTab === 'guide' && <SimpleGuide />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modern Clean Footer */}
      <footer className="no-print border-t border-white/[0.05] bg-[#070a11]/80 backdrop-blur-md py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-slate-400">🕹️ Scheduler Arcade</span>
            <span>— Operating Systems Project</span>
          </div>

          <div className="flex items-center gap-5 text-[11px] font-medium">
            <button
              onClick={() => setActiveTab('chart')}
              className="hover:text-cyan-400 transition-colors"
            >
              Concept Chart
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className="hover:text-cyan-400 transition-colors"
            >
              Gantt Simulator
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className="hover:text-cyan-400 transition-colors"
            >
              OS Guide
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
