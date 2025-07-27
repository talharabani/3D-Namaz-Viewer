import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import HadithScreen from './screens/HadithScreen';
import QiblaDirectionScreen from './screens/QiblaDirectionScreen';
import LearnScreen from './screens/LearnScreen';
import PrayerTrackerScreen from './screens/PrayerTrackerScreen';
import PrayerTimesScreen from './screens/PrayerTimesScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProgressDashboardScreen from './screens/ProgressDashboardScreen';
import FooterNavTabs from './components/FooterNavTabs';
import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import NamazMistakesScreen from './screens/NamazMistakesScreen';
import { offlineService } from './utils/offlineService';
import { notificationService } from './utils/notificationService';
import DuaScreen from './screens/DuaScreen';
import DuaListScreen from './screens/DuaListScreen';
import NamazScreen from './screens/NamazScreen';

function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [childrenMode, setChildrenMode] = useState(() => {
    const saved = localStorage.getItem('childrenMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(dark));
  }, [dark]);
  useEffect(() => {
    localStorage.setItem('childrenMode', JSON.stringify(childrenMode));
  }, [childrenMode]);

  // Initialize services
  useEffect(() => {
    const initServices = async () => {
      try {
        // Initialize offline service
        await offlineService.init();
        
        // Request notification permission
        await notificationService.requestPermission();
        
        console.log('Services initialized successfully');
      } catch (error) {
        console.error('Error initializing services:', error);
      }
    };

    initServices();
  }, []);

  const recognitionRef = useRef(null);

  function handleVoiceSearch() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
    }
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      alert('Voice search: ' + transcript);
      // TODO: Route to relevant screen or show answer
    };
    recognitionRef.current.onerror = (event) => {
      alert('Voice search error: ' + event.error);
    };
    recognitionRef.current.start();
  }

  return (
    <Router>
      <div className={`min-h-screen font-body text-text flex flex-col${dark ? ' dark' : ''}${childrenMode ? ' children' : ''}`}
        style={{ transition: 'background 0.5s, color 0.5s' }}>
        {/* Floating dark mode toggle button */}
        <button
          className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-brass text-white shadow-button flex items-center justify-center text-2xl hover:bg-wood focus:outline-none focus:ring-2 focus:ring-wood transition"
          onClick={() => setDark(d => !d)}
          aria-label="Toggle dark mode"
        >
          {dark ? '🌙' : '☀️'}
        </button>
        {/* Floating children mode toggle button (optional, keep if needed) */}
        <button
          className="fixed bottom-40 right-6 z-50 w-14 h-14 rounded-full bg-emerald-400 text-mocha shadow-button flex items-center justify-center text-2xl hover:bg-brass hover:text-white focus:outline-none focus:ring-2 focus:ring-brass transition"
          onClick={() => setChildrenMode(c => !c)}
          aria-label="Toggle children mode"
        >
          {childrenMode ? '🧒' : '👦'}
        </button>
        {/* Floating voice search button */}
        <button
          className="fixed bottom-8 right-6 z-50 w-14 h-14 rounded-full bg-wood text-white shadow-button flex items-center justify-center text-2xl hover:bg-brass focus:outline-none focus:ring-2 focus:ring-brass transition"
          onClick={handleVoiceSearch}
          aria-label="Voice search"
        >
          <span role="img" aria-label="microphone">🎤</span>
        </button>
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/namaz" element={<NamazScreen />} />
            <Route path="/hadith" element={<HadithScreen />} />
            <Route path="/duas" element={<DuaScreen />} />
            <Route path="/duas/:category" element={<DuaListScreen />} />
            <Route path="/qibla" element={<QiblaDirectionScreen />} />
            <Route path="/learn" element={<LearnScreen />} />
            <Route path="/tracker" element={<PrayerTrackerScreen />} />
            <Route path="/prayer-times" element={<PrayerTimesScreen />} />
            <Route path="/mistakes" element={<NamazMistakesScreen />} />
            <Route path="/progress" element={<ProgressDashboardScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </main>
        <FooterNavTabs />
      </div>
    </Router>
  );
}

export default App
