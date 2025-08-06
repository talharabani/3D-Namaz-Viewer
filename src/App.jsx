import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import HadithScreen from './screens/HadithScreen';
import QiblaDirectionScreen from './screens/QiblaDirectionScreen';
import LearnScreen from './screens/LearnScreen';
import PrayerTrackerScreen from './screens/PrayerTrackerScreen';
import PrayerTimesScreen from './screens/PrayerTimesScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProgressDashboardScreen from './screens/ProgressDashboardScreen';
import DailyChallengeScreen from './screens/DailyChallengeScreen';
import FooterNavTabs from './components/FooterNavTabs';
import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import NamazMistakesScreen from './screens/NamazMistakesScreen';
import { offlineService } from './utils/offlineService';
import notificationService from './utils/notificationService';
import DuaScreen from './screens/DuaScreen';
import DuaListScreen from './screens/DuaListScreen';
import NamazScreen from './screens/NamazScreen';
import AIAssistantScreen from './screens/AIAssistantScreen';
import { useTranslation, setLanguage, getCurrentLanguage } from './utils/translations';

// Global Error Boundary Component
class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Global Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-brass text-center">
            <div className="text-4xl mb-4">🕌</div>
            <h1 className="text-2xl font-bold text-brass mb-4">Something went wrong</h1>
            <p className="text-mocha mb-6">
              We encountered an unexpected error. Please refresh the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-brass to-wood text-white px-6 py-3 rounded-xl font-bold hover:from-wood hover:to-brass transition-all duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const { t, currentLang, setLanguage: changeLanguage } = useTranslation();
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
        
        // Don't automatically request notification permission
        // It will be requested when user interacts with notification features
        
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
    <GlobalErrorBoundary>
      <Router>
        <div className={`min-h-screen font-body text-text flex flex-col${dark ? ' dark' : ''}${childrenMode ? ' children' : ''}`}
          style={{ transition: 'background 0.5s, color 0.5s' }}
          lang={currentLang}>
        {/* Floating language toggle button */}
        <button
          className="fixed bottom-32 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-accent to-accent2 text-white shadow-button flex items-center justify-center text-lg font-bold hover:from-accent2 hover:to-accent focus:outline-none focus:ring-2 focus:ring-accent transition"
          onClick={() => changeLanguage(currentLang === 'en' ? 'ur' : 'en')}
          aria-label="Toggle language"
        >
          {currentLang === 'en' ? 'اردو' : 'EN'}
        </button>
        {/* Floating dark mode toggle button */}
        <button
          className="fixed bottom-48 right-6 z-50 w-14 h-14 rounded-full bg-brass text-white shadow-button flex items-center justify-center text-2xl hover:bg-wood focus:outline-none focus:ring-2 focus:ring-wood transition"
          onClick={() => setDark(d => !d)}
          aria-label="Toggle dark mode"
        >
          {dark ? '🌙' : '☀️'}
        </button>
        {/* Floating children mode toggle button */}
        <button
          className="fixed bottom-64 right-6 z-50 w-14 h-14 rounded-full bg-success text-white shadow-button flex items-center justify-center text-2xl hover:bg-brass hover:text-white focus:outline-none focus:ring-2 focus:ring-brass transition"
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
            <Route path="/ai-assistant" element={<AIAssistantScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/daily-challenge" element={<DailyChallengeScreen />} />
          </Routes>
        </main>
        <FooterNavTabs />
        </div>
      </Router>
    </GlobalErrorBoundary>
  );
}

export default App
