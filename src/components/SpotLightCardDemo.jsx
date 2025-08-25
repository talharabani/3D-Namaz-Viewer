import React from 'react';
import { GlowCard } from './nurui/spotlight-card';

export function SpotLightCardDemo() {
  return (
    <div className="flex flex-row items-center justify-center gap-10 custom-cursor py-20">
      <GlowCard className="p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Prayer Times</h3>
        <p className="text-gray-300">View daily prayer times</p>
      </GlowCard>
      <GlowCard className="p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Prayer Tracker</h3>
        <p className="text-gray-300">Track your daily prayers</p>
      </GlowCard>
      <GlowCard className="p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Learn Namaz</h3>
        <p className="text-gray-300">Step-by-step prayer guide</p>
      </GlowCard>
    </div>
  );
}
