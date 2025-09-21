import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import HadithScreen from './screens/HadithScreen';
import QiblaDirectionScreen from './screens/QiblaDirectionScreen';
import LearnScreen from './screens/LearnScreen';
import PrayerTrackerScreen from './screens/PrayerTrackerScreen';
import PrayerTimesScreen from './screens/PrayerTimesScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProgressDashboardScreen from './screens/ProgressDashboardScreen';
import DailyChallengeScreen from './screens/DailyChallengeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import NamazMistakesScreen from './screens/NamazMistakesScreen';
import { offlineService } from './utils/offlineService';
import notificationService from './utils/notificationService';
import DuaScreen from './screens/DuaScreen';
import DuaListScreen from './screens/DuaListScreen';
import ScrollToTop from './components/ScrollToTop';
import NamazScreen from './screens/NamazScreen';
import AIAssistantScreen from './screens/AIAssistantScreen';
import QuizScreen from './screens/QuizScreen';
import { useTranslation, setLanguage, getCurrentLanguage } from './utils/translations';
import { SettingsProvider } from './contexts/SettingsContext';
import SplashCursor from './components/nurui/splash-cursor.jsx';

import Navbar from './components/Navbar';
import WebsiteFooter from './components/WebsiteFooter';
import LandingPage from './screens/LandingPage';
import AuthModal from './components/AuthModal';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import authService from './utils/authService';


function AppContent() {
  const { t, currentLang, setLanguage } = useTranslation();
  const location = useLocation();
  const [isRTL, setIsRTL] = useState(currentLang === 'ur');
  
  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    setIsRTL(newLang === 'ur');
  };

  // Update isRTL when currentLang changes
  useEffect(() => {
    setIsRTL(currentLang === 'ur');
  }, [currentLang]);
  
  const [childrenMode, setChildrenMode] = useState(() => {
    const saved = localStorage.getItem('childrenMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('childrenMode', JSON.stringify(childrenMode));
  }, [childrenMode]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize services and authentication
  useEffect(() => {
    const initServices = async () => {
      try {
        await offlineService.init();
        console.log('Services initialized successfully');
      } catch (error) {
        console.error('Error initializing services:', error);
      }
    };

    initServices();

    // Initialize authentication
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setIsAuthenticated(true);
      setUserProfile(currentUser);
    }

    // Listen for auth changes
    const handleAuthChange = (user, authenticated) => {
      setIsAuthenticated(authenticated);
      setUserProfile(user);
    };

    authService.addListener(handleAuthChange);

    return () => {
      authService.removeListener(handleAuthChange);
    };
  }, []);





  const handleAuthSuccess = (user) => {
    console.log('Authentication successful:', user);
    // User is automatically updated via the auth listener
  };

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <div className={`min-h-screen font-sans text-gray-900 dark:text-gray-100 flex flex-col text-sm${childrenMode ? ' children' : ''} ${isRTL ? 'rtl' : 'ltr'}`}
      style={{ transition: 'background 0.5s, color 0.5s' }}
      lang={currentLang}
      dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Professional Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-h-0 ${isMobile ? 'pt-20 pb-0' : 'pt-16 pb-0'}`}>
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/dashboard" element={<HomeScreen />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/namaz" element={<NamazScreen />} />
            <Route path="/hadith" element={<HadithScreen />} />
            <Route path="/duas" element={<DuaScreen />} />
            <Route path="/duas/:category" element={<DuaListScreen />} />
            <Route path="/qibla" element={<QiblaDirectionScreen />} />
            <Route path="/learn" element={<LearnScreen />} />
            <Route path="/quiz" element={<QuizScreen />} />
            <Route path="/tracker" element={<PrayerTrackerScreen />} />
            <Route path="/prayer-times" element={<PrayerTimesScreen />} />
            <Route path="/mistakes" element={<NamazMistakesScreen />} />
            <Route path="/progress" element={<ProgressDashboardScreen />} />
            <Route path="/ai-assistant" element={<AIAssistantScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/daily-challenge" element={<DailyChallengeScreen />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <WebsiteFooter />
      

      {/* Splash Cursor Effect */}
      <SplashCursor />

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <SettingsProvider>
          <Router>
            <AppContent />
          </Router>
        </SettingsProvider>
        <ScrollToTop />
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App
