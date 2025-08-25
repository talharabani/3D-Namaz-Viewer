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
import QuizScreen from './screens/QuizScreen';
import { useTranslation, setLanguage, getCurrentLanguage } from './utils/translations';
import { SettingsProvider } from './contexts/SettingsContext';
import SplashCursor from './components/nurui/splash-cursor';

import ModernHeader from './components/ModernHeader';
import WebsiteFooter from './components/WebsiteFooter';
import LandingPage from './screens/LandingPage';
import AuthModal from './components/AuthModal';
import authService from './utils/authService';

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 text-center">
            <div className="text-4xl mb-4">🕌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please refresh the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
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
  const { t, currentLang, setLanguage } = useTranslation();
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
    <GlobalErrorBoundary>
      <SettingsProvider>
        <Router>
          <div className={`min-h-screen font-body text-text flex flex-col${childrenMode ? ' children' : ''} ${isRTL ? 'rtl' : 'ltr'}`}
            style={{ transition: 'background 0.5s, color 0.5s' }}
            lang={currentLang}
            dir={isRTL ? 'rtl' : 'ltr'}>
            
            {/* Modern Header */}
            <ModernHeader 
              currentLang={currentLang}
              onLanguageChange={() => changeLanguage(currentLang === 'en' ? 'ur' : 'en')}
              isAuthenticated={isAuthenticated}
              userProfile={userProfile}
              onAuthClick={() => setShowAuthModal(true)}
              onLogout={handleLogout}
            />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-0">
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/dashboard" element={<HomeScreen />} />
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

            {/* Website Footer */}
            <WebsiteFooter />

            {/* Mobile Footer Navigation */}
            {isMobile && <FooterNavTabs currentLang={currentLang} />}


            
            {/* Splash Cursor Effect */}
            <SplashCursor />

            {/* Authentication Modal */}
            <AuthModal 
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
              onSuccess={handleAuthSuccess}
            />
          </div>
        </Router>
      </SettingsProvider>
    </GlobalErrorBoundary>
  );
}

export default App
