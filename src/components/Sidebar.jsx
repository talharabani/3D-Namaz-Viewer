import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import IslamicIcon from './IslamicIcon';

export default function Sidebar({ isOpen, onClose, currentLang }) {
  const { t } = useTranslation();
  const location = useLocation();

  const navigationItems = [
    // Main Features
    {
      title: t('mainFeatures'),
      items: [
        { key: 'home', to: '/dashboard', label: t('home'), icon: '🏠', description: t('homeDescription') },
        { key: 'prayer-times', to: '/prayer-times', label: t('prayerTimes'), icon: '🕐', description: t('viewDailyPrayerTimes') },
        { key: 'qibla', to: '/qibla', label: t('qibla'), icon: '🧭', description: t('findPrayerDirection') },
        { key: 'namaz', to: '/namaz', label: t('namaz'), icon: '🕌', description: t('stepByStepPrayerGuide') },
      ]
    },
    // Learning & Education
    {
      title: t('learningEducation'),
      items: [
        { key: 'learn', to: '/learn', label: t('learn'), icon: '📚', description: t('stepByStepPrayerGuide') },
        { key: 'quiz', to: '/quiz', label: t('quiz'), icon: '🏆', description: t('testYourKnowledgeOfSalah') },
        { key: 'hadith', to: '/hadith', label: t('hadith'), icon: '📖', description: t('islamicTraditionsAndSayings') },
        { key: 'mistakes', to: '/mistakes', label: t('mistakes'), icon: '⚠️', description: t('commonPrayerMistakes') },
      ]
    },
    // Spiritual Tools
    {
      title: t('spiritualTools'),
      items: [
        { key: 'duas', to: '/duas', label: t('duas'), icon: '🤲', description: t('collectionOfIslamicDuas') },
        { key: 'ai-assistant', to: '/ai-assistant', label: t('aiAssistant'), icon: '🤖', description: t('aiPoweredIslamicAssistant') },
        { key: 'daily-challenge', to: '/daily-challenge', label: t('dailyChallenge'), icon: '🌟', description: t('dailyIslamicChallenges') },
      ]
    },
    // Tracking & Progress
    {
      title: t('trackingProgress'),
      items: [
        { key: 'tracker', to: '/tracker', label: t('tracker'), icon: '📊', description: t('trackYourDailyPrayers') },
        { key: 'progress', to: '/progress', label: t('progress'), icon: '📈', description: t('viewYourLearningProgress') },
      ]
    },
    // Settings
    {
      title: t('settings'),
      items: [
        { key: 'settings', to: '/settings', label: t('settings'), icon: '⚙️', description: t('appSettingsAndPreferences') },
      ]
    }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex-1 flex flex-col min-h-0 pt-16">
          {/* Logo and Title */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 bg-gradient-to-r from-brass to-wood rounded-lg flex items-center justify-center text-white font-bold text-xl">
              🕌
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Namaz Web</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Islamic Prayer App</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            {navigationItems.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.key}>
                      <NavLink
                        to={item.to}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                          isActive(item.to)
                            ? 'bg-brass text-white shadow-sm'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={onClose}
                      >
                        <span className="text-lg mr-3">{item.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{item.label}</div>
                          <div className={`text-xs ${
                            isActive(item.to) 
                              ? 'text-white/80' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              <p>Namaz Web v1.0</p>
              <p className="mt-1">Your Islamic Companion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex-1 flex flex-col min-h-0">
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-brass to-wood rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  🕌
                </div>
                <div className="ml-3">
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">Namaz Web</h1>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
              {navigationItems.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.key}>
                        <NavLink
                          to={item.to}
                          className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                            isActive(item.to)
                              ? 'bg-brass text-white shadow-sm'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                          }`}
                          onClick={onClose}
                        >
                          <span className="text-xl mr-3">{item.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium">{item.label}</div>
                            <div className={`text-xs ${
                              isActive(item.to) 
                                ? 'text-white/80' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {item.description}
                            </div>
                          </div>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
