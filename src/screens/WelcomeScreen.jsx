import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import authService from '../utils/authService';
import ParticleBackground from '../components/ParticleBackground';
import Logo from '../components/Logo';

export default function WelcomeScreen({ onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    
    // Show content after a brief delay
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    onClose();
    navigate('/');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getGreetingEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅';
    if (hour < 18) return '☀️';
    return '🌙';
  };

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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl text-center"
        >
          {/* Main Welcome Card */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <motion.div 
              className="absolute -top-6 -left-6 text-6xl text-emerald-400/20 animate-wave"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >✦</motion.div>
            <motion.div 
              className="absolute -top-6 -right-6 text-6xl text-emerald-400/20 animate-wave"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >✦</motion.div>
            <motion.div 
              className="absolute -bottom-6 -left-6 text-6xl text-emerald-400/20 animate-wave"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >✦</motion.div>
            <motion.div 
              className="absolute -bottom-6 -right-6 text-6xl text-emerald-400/20 animate-wave"
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >✦</motion.div>

            <div className="relative">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <Logo size="xl" variant="full" className="mx-auto" />
              </motion.div>

              {/* Welcome Message */}
              <AnimatePresence>
                {showContent && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="space-y-6"
                  >
                    {/* Greeting */}
                    <div>
                      <motion.h1 
                        className="text-6xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-4"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        {getGreetingEmoji()} {getGreeting()}!
                      </motion.h1>
                      
                      <motion.h2 
                        className="text-4xl font-bold text-white mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                      >
                        Welcome to Namaz Web
                      </motion.h2>
                      
                      <motion.p 
                        className="text-emerald-200 text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                      >
                        {user?.name ? `Hello, ${user.name}!` : 'Hello there!'}
                      </motion.p>
                    </div>

                    {/* Features Preview */}
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    >
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="text-4xl mb-4">🤲</div>
                        <h3 className="text-white font-semibold mb-2">Prayer Times</h3>
                        <p className="text-emerald-200 text-sm">Accurate prayer times for your location</p>
                      </div>
                      
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="text-4xl mb-4">📚</div>
                        <h3 className="text-white font-semibold mb-2">Learn Namaz</h3>
                        <p className="text-emerald-200 text-sm">Step-by-step prayer guidance</p>
                      </div>
                      
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="text-4xl mb-4">🧭</div>
                        <h3 className="text-white font-semibold mb-2">Qibla Direction</h3>
                        <p className="text-emerald-200 text-sm">Find the direction of Kaaba</p>
                      </div>
                    </motion.div>

                    {/* Continue Button */}
                    <motion.button
                      onClick={handleContinue}
                      className="mt-12 px-12 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xl rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue to App →
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Close Button */}
          <motion.button
            onClick={handleContinue}
            className="mt-8 text-emerald-300 hover:text-white text-lg transition-colors flex items-center justify-center mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.0 }}
          >
            <span className="mr-2">✕</span>
            Skip Welcome
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
