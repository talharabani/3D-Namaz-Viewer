import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../utils/translations';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 mb-6">
              {t('homeTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('comprehensiveIslamicPrayerCompanion')}
            </p>
            
            {/* Current Time Display */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 mb-12 max-w-md mx-auto border border-gray-700 shadow-2xl">
              <div className="text-amber-400 text-2xl font-bold mb-2">
                {t('currentTime')}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {formatTime(currentTime)}
              </div>
              <div className="text-gray-400 text-lg">
                {formatDate(currentTime)}
              </div>
            </div>

            {/* Bismillah */}
            <div className="text-center mb-12">
              <p className="text-2xl md:text-3xl text-amber-400 font-arabic mb-4">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="text-lg text-gray-300 italic">
                {t('bismillah')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('quickActions')}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover all the features to enhance your Islamic journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${item.gradient}"></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 text-lg leading-relaxed">
                  {item.description}
                </p>
                
                <div className="mt-6 flex items-center text-amber-400 group-hover:text-amber-300 transition-colors duration-300">
                  <span className="text-sm font-medium">Learn More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Islamic Quote Section */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl text-amber-400 mb-6">"</div>
            <blockquote className="text-2xl md:text-3xl text-white font-medium mb-6 max-w-4xl mx-auto leading-relaxed">
              {t('prayerVerse')}
            </blockquote>
            <cite className="text-lg text-amber-400 font-medium">
              {t('quranReference')}
            </cite>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Begin your spiritual journey with our comprehensive Islamic companion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/prayer-times"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Prayer Times
            </Link>
            <Link
              to="/learn"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Learn to Pray
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 