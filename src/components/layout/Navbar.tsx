'use client';

import React from 'react';
import { Gamepad2, Activity, FileText, Lightbulb, Volume2, VolumeX, Cpu } from 'lucide-react';
import { soundFX } from '@/lib/sound';
import { motion } from 'framer-motion';

export type NavTab = 'game' | 'simulator' | 'chart' | 'guide';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  soundEnabled,
  onToggleSound,
}) => {
  const tabs = [
    { id: 'game' as NavTab, label: 'Arcade Arena', icon: Gamepad2 },
    { id: 'simulator' as NavTab, label: 'Gantt Simulator', icon: Activity },
    { id: 'chart' as NavTab, label: 'Concept Chart', icon: FileText },
    { id: 'guide' as NavTab, label: 'OS Guide', icon: Lightbulb },
  ];

  return (
    <>
      {/* Sleek Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#090d16]/70 backdrop-blur-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => onTabChange('game')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-fuchsia-500 p-[1px] shadow-md shadow-cyan-500/10 group-hover:shadow-cyan-500/30 transition-all duration-300">
              <div className="w-full h-full bg-[#090d16] rounded-xl flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-fuchsia-300 text-base tracking-wider">
                SCHEDULER ARCADE
              </span>
            </div>
          </div>

          {/* Desktop Nav Tabs with Smooth Floating Sliding Pill */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-white/[0.03] rounded-2xl border border-white/[0.08] backdrop-blur-md">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    soundFX.playQuantumTick();
                  }}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors duration-200 ${
                    isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-fuchsia-500/15 border border-cyan-500/30 shadow-sm shadow-cyan-500/10"
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onToggleSound();
                if (!soundEnabled) soundFX.playQuantumTick();
              }}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              className={`p-2.5 rounded-xl border transition-all duration-200 ${
                soundEnabled
                  ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 shadow-sm shadow-cyan-500/10'
                  : 'bg-white/[0.02] border-white/[0.06] text-slate-500 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Smooth & Clean) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090d16]/85 backdrop-blur-2xl border-t border-white/[0.08] px-3 py-2 flex items-center justify-around shadow-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                soundFX.playQuantumTick();
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3.5 rounded-xl transition-all ${
                isActive ? 'text-cyan-300' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMobileTabIndicator"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.45 }}
                  className="absolute inset-0 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
                />
              )}
              <Icon className="w-4 h-4 mb-0.5 relative z-10" />
              <span className="text-[10px] font-medium tracking-tight relative z-10">
                {tab.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
