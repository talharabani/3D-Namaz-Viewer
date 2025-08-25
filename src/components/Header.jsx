import React from 'react';
import { useTranslation } from '../utils/translations';
import { useLocation } from 'react-router-dom';

export default function Header({ 
  onMenuClick, 
  onLanguageChange, 
  currentLang, 
  onChildrenModeToggle, 
  childrenMode, 
  onVoiceSearch, 
  isMobile 
}) {
  const { t } = useTranslation();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/': return t('home');
      case '/prayer-times': return t('prayerTimes');
      case '/qibla': return t('qibla');
      case '/learn': return t('learn');
      case '/quiz': return t('quiz');
      case '/tracker': return t('tracker');
      case '/hadith': return t('hadith');
      case '/duas': return t('duas');
      case '/namaz': return t('namaz');
      case '/mistakes': return t('mistakes');
      case '/progress': return t('progress');
      case '/ai-assistant': return t('aiAssistant');
      case '/settings': return t('settings');
      case '/daily-challenge': return t('dailyChallenge');
      default: return t('home');
    }
  };

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu button and Logo */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            {isMobile && (
              <button
                onClick={onMenuClick}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brass"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}

            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-brass to-wood rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  🕌
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Namaz Web
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getPageTitle()}
                </p>
              </div>
            </div>
          </div>

          {/* Center - Page Title (Mobile) */}
          {isMobile && (
            <div className="flex-1 text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getPageTitle()}
              </h2>
            </div>
          )}

          {/* Right side - Controls */}
          <div className="flex items-center space-x-2">
            {/* Voice Search Button */}
            <button
              onClick={onVoiceSearch}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brass transition-colors"
              title={t('voiceSearch')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>

            {/* Children Mode Toggle */}
            <button
              onClick={onChildrenModeToggle}
              className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brass transition-colors ${
                childrenMode 
                  ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={childrenMode ? t('disableChildrenMode') : t('enableChildrenMode')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Language Toggle */}
            <button
              onClick={onLanguageChange}
              className="px-3 py-1.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-all duration-200"
              title={currentLang === 'en' ? 'اردو میں تبدیل کریں' : 'Switch to English'}
            >
              {currentLang === 'en' ? 'اردو' : 'EN'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
