import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '../utils/translations';
import ParticleBackground from '../components/ParticleBackground';
import SearchBar from '../components/SearchBar';
import AuthModal from '../components/AuthModal';
import authService from '../utils/authService';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const HomeScreen = () => {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Authentication effect
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setIsAuthenticated(true);
      setUser(currentUser);
    }

    const handleAuthChange = (user, authenticated) => {
      setIsAuthenticated(authenticated);
      setUser(user);
    };

    authService.addListener(handleAuthChange);

    return () => {
      authService.removeListener(handleAuthChange);
    };
  }, []);

  // Authentication functions
  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    authService.logout();
  };

  const menuItems = [
    {
      title: t('prayerTimes'),
      description: t('prayerTimesDesc'),
      icon: '🕐',
      link: '/prayer-times',
      color: 'from-blue-500 to-blue-600',
      hoverGradient: 'from-blue-600 to-blue-700'
    },
    {
      title: t('namaz'),
      description: t('namazDesc'),
      icon: '🕌',
      link: '/namaz',
      color: 'from-green-500 to-green-600',
      hoverGradient: 'from-green-600 to-green-700'
    },
    {
      title: t('learn'),
      description: t('learnDesc'),
      icon: '📚',
      link: '/learn',
      color: 'from-purple-500 to-purple-600',
      hoverGradient: 'from-purple-600 to-purple-700'
    },
    {
      title: t('hadith'),
      description: t('hadithDesc'),
      icon: '📜',
      link: '/hadith',
      color: 'from-orange-500 to-orange-600',
      hoverGradient: 'from-orange-600 to-orange-700'
    },
    {
      title: t('duas'),
      description: t('duasDesc'),
      icon: '🤲',
      link: '/duas',
      color: 'from-teal-500 to-teal-600',
      hoverGradient: 'from-teal-600 to-teal-700'
    },
    {
      title: t('qibla'),
      description: t('qiblaDirectionDesc'),
      icon: '🧭',
      link: '/qibla',
      color: 'from-indigo-500 to-indigo-600',
      hoverGradient: 'from-indigo-600 to-indigo-700'
    },
    {
      title: t('tracker'),
      description: t('prayerTrackerDesc'),
      icon: '📊',
      link: '/tracker',
      color: 'from-pink-500 to-pink-600',
      hoverGradient: 'from-pink-600 to-pink-700'
    },
    {
      title: t('quiz'),
      description: t('quizDesc'),
      icon: '🏆',
      link: '/quiz',
      color: 'from-yellow-500 to-yellow-600',
      hoverGradient: 'from-yellow-600 to-yellow-700'
    },
    {
      title: t('aiAssistant'),
      description: t('aiAssistantDesc'),
      icon: '🤖',
      link: '/ai-assistant',
      color: 'from-cyan-500 to-cyan-600',
      hoverGradient: 'from-cyan-600 to-cyan-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
      </div>

      {/* Search Bar Section - Floating */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SearchBar />
        </motion.div>
      </div>

      {/* Floating Authentication Button */}
      {!isAuthenticated && (
        <motion.div
          className="fixed top-20 right-2 sm:right-4 z-40"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            onClick={() => handleAuthClick('Login')}
            className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm sm:text-lg">🔐</span>
            <span className="font-medium hidden sm:inline">{t('signIn')}</span>
            <span className="font-medium sm:hidden">Sign In</span>
          </motion.button>
        </motion.div>
      )}

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">

          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {/* Beautiful Bismillah Section */}
            <motion.div 
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl mb-12 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Animated decorative elements */}
              <motion.div 
                className="absolute -top-4 -left-4 text-4xl text-emerald-400/30 animate-wave"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >✦</motion.div>
              <motion.div 
                className="absolute -top-4 -right-4 text-4xl text-emerald-400/30 animate-wave"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >✦</motion.div>
              <motion.div 
                className="absolute -bottom-4 -left-4 text-4xl text-emerald-400/30 animate-wave"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >✦</motion.div>
              <motion.div 
                className="absolute -bottom-4 -right-4 text-4xl text-emerald-400/30 animate-wave"
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              >✦</motion.div>
              
              <div className="relative">
                {/* Bismillah in Arabic */}
                <motion.div 
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-arabic text-white mb-4 sm:mb-6 leading-relaxed animate-text-shimmer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  بِسْمِ اللهِ الرّحمن الرّحيم
                </motion.div>
                
                {/* English Translation */}
                <motion.p 
                  className="text-lg sm:text-xl md:text-2xl text-emerald-200 font-light px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  In the name of Allah, the Most Gracious, the Most Merciful
                </motion.p>
              </div>
            </motion.div>

            {/* Current Time Section */}
            <motion.div 
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 shadow-xl inline-block animate-glow mx-2 sm:mx-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.p 
                className="text-lg sm:text-xl text-emerald-100 mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {currentDate}
              </motion.p>
              <motion.p 
                className="text-4xl sm:text-5xl font-bold text-white"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {currentTime}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-4 sm:mb-6 animate-text-shimmer px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Quick Actions
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover all the features to enhance your Islamic journey
          </motion.p>

          {/* Authentication Section */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {!isAuthenticated ? (
              <>
                <motion.button
                  onClick={() => handleAuthClick('login')}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl sm:text-2xl">🔐</span>
                  {t('signIn')}
                </motion.button>
                <motion.button
                  onClick={() => handleAuthClick('signup')}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl sm:text-2xl">📝</span>
                  {t('signUp')}
                </motion.button>
              </>
            ) : (
              <motion.div 
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-bold text-lg">{user?.name || 'User'}</h3>
                    <p className="text-emerald-300 text-sm">{user?.email}</p>
                  </div>
                </div>
                <motion.button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-500/20 border border-red-400/30 text-red-300 font-medium rounded-lg hover:bg-red-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('logout')}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        <motion.div 
          className="feature-grid"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              className="group"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <Link to={item.link}>
                <div className="feature-card group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-20 flex flex-col items-center text-center">
                    <div className={`card-icon bg-gradient-to-br ${item.color} text-white`}>
                      {item.icon}
                    </div>
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">{item.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Islamic Quote Section */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.blockquote 
            className="text-2xl md:text-3xl font-medium text-white italic max-w-4xl mx-auto mb-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            "Indeed, prayer has been decreed upon the believers a decree of specified times."
          </motion.blockquote>
          <motion.p 
            className="text-lg text-emerald-200"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            — Quran 4:103
          </motion.p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Begin your spiritual journey with our comprehensive Islamic companion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/prayer-times"
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl text-base"
            >
              View Prayer Times
            </Link>
            <Link
              to="/learn"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl text-base"
            >
              Learn to Pray
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default HomeScreen;