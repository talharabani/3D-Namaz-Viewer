// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import QiblaDirectionScreen from './QiblaDirectionScreen';
import { GlowCard } from "@/components/nurui/spotlight-card"; // Add this import statement

export default function App() {
  return (
    <div className="flex flex-row items-center justify-center gap-10 custom-cursor py-20">
      <GlowCard /> // Add this line to use the GlowCard component
      <QiblaDirectionScreen />
      <StatusBar style="light" />
    </div>
  );
}