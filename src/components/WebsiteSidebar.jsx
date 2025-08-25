import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from '../utils/translations';

export default function WebsiteSidebar({ isOpen, onClose, currentLang, isAuthenticated }) {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState('mainFeatures');

  const navigationItems = [
    {
      id: 'mainFeatures',
      title: t('mainFeatures'),
      icon: '🏠',
      items: [
        { key: 'dashboard', to: '/dashboard', label: t('dashboard'), icon: '📊', description: t('dashboardDescription'), badge: 'New' },
        { key: 'prayer-times', to: '/prayer-times', label: t('prayerTimes'), icon: '🕐', description: t('viewDailyPrayerTimes') },
        { key: 'qibla', to: '/qibla', label: t('qibla'), icon: '🧭', description: t('findPrayerDirection') },
        { key: 'namaz', to: '/namaz', label: t('namaz'), icon: '🕌', description: t('stepByStepPrayerGuide') },
      ]
    },
    {
      id: 'learningEducation',
      title: t('learningEducation'),
      icon: '📚',
      items: [
        { key: 'learn', to: '/learn', label: t('learn'), icon: '📖', description: t('stepByStepPrayerGuide') },
        { key: 'quiz', to: '/quiz', label: t('quiz'), icon: '🏆', description: t('testYourKnowledgeOfSalah'), badge: 'Popular' },
        { key: 'hadith', to: '/hadith', label: t('hadith'), icon: '📜', description: t('islamicTraditionsAndSayings') },
        { key: 'mistakes', to: '/mistakes', label: t('mistakes'), icon: '⚠️', description: t('commonPrayerMistakes') },
      ]
    },
    {
      id: 'spiritualTools',
      title: t('spiritualTools'),
      icon: '🤲',
      items: [
        { key: 'duas', to: '/duas', label: t('duas'), icon: '📿', description: t('collectionOfIslamicDuas') },
        { key: 'ai-assistant', to: '/ai-assistant', label: t('aiAssistant'), icon: '🤖', description: t('aiPoweredIslamicAssistant'), badge: 'AI' },
        { key: 'daily-challenge', to: '/daily-challenge', label: t('dailyChallenge'), icon: '🌟', description: t('dailyIslamicChallenges') },
      ]
    },
    {
      id: 'trackingProgress',
      title: t('trackingProgress'),
      icon: '📈',
      items: [
        { key: 'tracker', to: '/tracker', label: t('tracker'), icon: '📊', description: t('trackYourDailyPrayers') },
        { key: 'progress', to: '/progress', label: t('progress'), icon: '📈', description: t('viewYourLearningProgress') },
      ]
    },
    {
      id: 'account',
      title: t('account'),
      icon: '👤',
      items: [
        { key: 'settings', to: '/settings', label: t('settings'), icon: '⚙️', description: t('appSettingsAndPreferences') },
        { key: 'profile', to: '/profile', label: t('profile'), icon: '👤', description: t('manageYourProfile') },
      ]
    }
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const quickActions = [
    { label: 'Next Prayer', icon: '🕌', time: '14:30', color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Today\'s Goal', icon: '🎯', progress: '3/5', color: 'bg-blue-100 text-blue-700' },
    { label: 'Learning Streak', icon: '🔥', days: '7', color: 'bg-orange-100 text-orange-700' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex lg:flex-col lg:w-80 lg:fixed lg:inset-y-0 lg:z-50 bg-white border-r border-gray-200 shadow-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex-1 flex flex-col min-h-0 pt-16">
          {/* User Profile Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  U
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">Welcome back!</h3>
                <p className="text-sm text-gray-600">Continue your spiritual journey</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-b border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <span className="mr-2">📊</span>
              Today's Progress
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {quickActions.map((action, index) => (
                <div key={index} className={`${action.color} rounded-lg p-3 text-center shadow-sm`}>
                  <div className="text-lg mb-1">{action.icon}</div>
                  <div className="text-xs font-medium">{action.label}</div>
                  <div className="text-sm font-bold">
                    {action.time || action.progress || `${action.days} days`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {navigationItems.map((section) => (
              <div key={section.id} className="space-y-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    expandedSection === section.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{section.icon}</span>
                    <span>{section.title}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedSection === section.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Section Items */}
                {expandedSection === section.id && (
                  <div className="ml-6 space-y-1">
                    {section.items.map((item) => (
                      <NavLink
                        key={item.key}
                        to={item.to}
                        className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 relative ${
                          isActive(item.to)
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        onClick={onClose}
                      >
                        <span className={`text-xl mr-3 ${isActive(item.to) ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
                          {item.icon}
                        </span>
                        <div className="flex-1">
                          <div className="font-medium flex items-center">
                            {item.label}
                            {item.badge && (
                              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                isActive(item.to) 
                                  ? 'bg-white/20 text-white' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className={`text-xs ${
                            isActive(item.to) 
                              ? 'text-white/80' 
                              : 'text-gray-500 group-hover:text-gray-600'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <span className="mr-2">⚡</span>
              Quick Actions
            </h4>
            <div className="space-y-2">
              <button className="w-full flex items-center px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-sm">
                <span className="mr-2">🕌</span>
                Start Prayer
              </button>
              <button className="w-full flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm">
                <span className="mr-2">📚</span>
                Learn Something New
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-2">
                  🕌
                </div>
                <span className="text-sm font-bold text-gray-900">Namaz Web</span>
              </div>
              <p className="text-xs text-gray-500">v2.0 - Your Islamic Companion</p>
              <div className="flex items-center justify-center mt-2 space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-xs text-gray-400">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className={`fixed inset-y-0 left-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex-1 flex flex-col min-h-0">
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  🕌
                </div>
                <div className="ml-3">
                  <h1 className="text-lg font-bold text-gray-900">Namaz Web</h1>
                  <p className="text-xs text-gray-600">Islamic Companion</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
              {navigationItems.map((section) => (
                <div key={section.id} className="space-y-1">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      expandedSection === section.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{section.icon}</span>
                      <span>{section.title}</span>
                    </div>
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${
                        expandedSection === section.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {expandedSection === section.id && (
                    <div className="ml-6 space-y-1">
                      {section.items.map((item) => (
                        <NavLink
                          key={item.key}
                          to={item.to}
                          className={`group flex items-center px-4 py-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                            isActive(item.to)
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                          onClick={onClose}
                        >
                          <span className={`text-2xl mr-4 ${isActive(item.to) ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
                            {item.icon}
                          </span>
                          <div className="flex-1">
                            <div className="font-medium flex items-center">
                              {item.label}
                              {item.badge && (
                                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                  isActive(item.to) 
                                    ? 'bg-white/20 text-white' 
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className={`text-xs ${
                              isActive(item.to) 
                                ? 'text-white/80' 
                                : 'text-gray-500 group-hover:text-gray-600'
                            }`}>
                              {item.description}
                            </div>
                          </div>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Quick Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="space-y-2">
                <button className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-medium shadow-sm">
                  <span className="mr-3">🕌</span>
                  Start Prayer
                </button>
                <button className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium shadow-sm">
                  <span className="mr-3">📚</span>
                  Learn Something New
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
