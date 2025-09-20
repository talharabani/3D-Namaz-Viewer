import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '../utils/translations';

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

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
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

export default function HomeScreen() {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const menuItems = [
    {
      title: t('prayerTimes'),
      description: t('viewDailyPrayerTimes'),
      icon: '🕐',
      path: '/prayer-times',
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'from-blue-600 to-blue-700'
    },
    {
      title: t('namaz'),
      description: t('stepByStepPrayerGuide'),
      icon: '🕌',
      path: '/namaz',
      gradient: 'from-emerald-500 to-emerald-600',
      hoverGradient: 'from-emerald-600 to-emerald-700'
    },
    {
      title: t('tracker'),
      description: t('trackYourDailyPrayers'),
      icon: '📈',
      path: '/tracker',
      gradient: 'from-purple-500 to-purple-600',
      hoverGradient: 'from-purple-600 to-purple-700'
    },
    {
      title: t('learn'),
      description: t('stepByStepPrayerGuide'),
      icon: '📚',
      path: '/learn',
      gradient: 'from-orange-500 to-orange-600',
      hoverGradient: 'from-orange-600 to-orange-700'
    },
    {
      title: t('quiz'),
      description: t('testYourKnowledgeOfSalah'),
      icon: '🏆',
      path: '/quiz',
      gradient: 'from-yellow-500 to-yellow-600',
      hoverGradient: 'from-yellow-600 to-yellow-700'
    },
    {
      title: t('qibla'),
      description: t('findPrayerDirection'),
      icon: '🧭',
      path: '/qibla',
      gradient: 'from-indigo-500 to-indigo-600',
      hoverGradient: 'from-indigo-600 to-indigo-700'
    },
    {
      title: t('duas'),
      description: t('collectionOfIslamicDuas'),
      icon: '🤲',
      path: '/duas',
      gradient: 'from-pink-500 to-pink-600',
      hoverGradient: 'from-pink-600 to-pink-700'
    },
    {
      title: t('hadith'),
      description: t('islamicTraditionsAndSayings'),
      icon: '📜',
      path: '/hadith',
      gradient: 'from-teal-500 to-teal-600',
      hoverGradient: 'from-teal-600 to-teal-700'
    },
    {
      title: t('aiAssistant'),
      description: t('getHelpWithIslamicQuestions'),
      icon: '🤖',
      path: '/ai-assistant',
      gradient: 'from-cyan-500 to-cyan-600',
      hoverGradient: 'from-cyan-600 to-cyan-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {/* Beautiful Bismillah Section */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl mb-12">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 text-4xl text-emerald-400/30">✦</div>
              <div className="absolute -top-4 -right-4 text-4xl text-emerald-400/30">✦</div>
              <div className="absolute -bottom-4 -left-4 text-4xl text-emerald-400/30">✦</div>
              <div className="absolute -bottom-4 -right-4 text-4xl text-emerald-400/30">✦</div>
              
              {/* Main Bismillah */}
              <motion.div 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-arabic text-white mb-6 leading-relaxed"
                variants={pulseAnimation}
                animate="animate"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </motion.div>
              
              <div className="text-xl md:text-2xl text-gray-300 mb-6 italic">
                {t('bismillah')}
              </div>
              
              {/* Secondary Arabic Text */}
              <div className="text-2xl sm:text-3xl md:text-4xl font-arabic text-emerald-400 mb-4">
                الصلاة نور المؤمن
              </div>
              <div className="text-lg text-gray-300">
                "Prayer is the light of the believer"
              </div>
            </div>
            
            {/* Current Time Display */}
            <motion.div 
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-12 max-w-md mx-auto shadow-2xl"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              <div className="text-emerald-400 text-2xl font-bold mb-2">
                {t('currentTime')}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {formatTime(currentTime)}
              </div>
              <div className="text-gray-300 text-lg">
                {formatDate(currentTime)}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-6">
            {t('quickActions')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover all the features to enhance your Islamic journey
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 lg:p-8 hover:bg-white/20 transition-all duration-500 hover:shadow-2xl block"
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">{item.title}</h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors">{item.description}</p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-400/50 rounded-3xl transition-colors duration-500"></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Islamic Quote Section */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            <div className="text-6xl text-emerald-400 mb-6">"</div>
            <blockquote className="text-2xl md:text-3xl text-white font-medium mb-6 max-w-4xl mx-auto leading-relaxed">
              {t('prayerVerse')}
            </blockquote>
            <cite className="text-lg text-emerald-400 font-medium">
              {t('quranReference')}
            </cite>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Begin your spiritual journey with our comprehensive Islamic companion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/prayer-times"
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl text-base"
              >
                {t('viewPrayerTimes')}
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/learn"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-xl hover:from-teal-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl text-base"
              >
                {t('learnToPray')}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
