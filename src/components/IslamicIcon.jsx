import React from 'react';
import home from '../assets/icons/home.png';
import audio from '../assets/icons/audio.png';
import hadith from '../assets/icons/hadith.png';
import qibla from '../assets/icons/qibla.png';
import learn from '../assets/icons/learn.png';
import mistakes from '../assets/icons/mistakes.png';
import time from '../assets/icons/time.png';
import tracker from '../assets/icons/tracker.png';
import settings from '../assets/icons/settings.png';
import dua from '../assets/icons/dua.png';

const icons = {
  home,
  audio,
  hadith,
  qibla,
  learn,
  mistakes,
  time,
  tracker,
  settings,
  dua, // Added dua icon
};

/**
 * IslamicIcon component
 * @param {string} name - One of: 'home', 'audio', 'hadith', 'qibla', 'learn', 'mistakes', 'time', 'tracker', 'settings', 'dua'
 * @param {string} [className] - Additional classes
 * @param {object} [props] - Other props
 */
export default function IslamicIcon({ name, className = '', ...props }) {
  const Icon = icons[name];
  if (!Icon) return null;
  return <img src={Icon} alt={name + ' icon'} className={`islamic-icon ${className}`} {...props} />;
} 
