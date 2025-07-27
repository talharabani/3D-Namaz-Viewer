import React from 'react';
import { StatusBar } from 'expo-status-bar';
import QiblaDirectionScreen from './QiblaDirectionScreen';

export default function App() {
  return (
    <>
      <QiblaDirectionScreen />
      <StatusBar style="light" />
    </>
  );
} 