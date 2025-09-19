import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import { useSettings } from '../contexts/SettingsContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

export default function ModernHeader({ 
  currentLang, 
  onLanguageChange, 
  isAuthenticated, 
  userProfile, 
  onAuthClick, 
  onLogout 
}) {
  const { t } = useTranslation();
  const { settings, updateTheme } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchRef = useRef(null);
  const tabsScrollRef = useRef(null);
  const [showScrollControls, setShowScrollControls] = useState(false);

  // Navigation tabs
  const navTabs = [
    { path: '/', label: t('home'), icon: '🏠' },
    { path: '/prayer-times', label: t('prayerTimes'), icon: '🕐' },
    { path: '/namaz', label: t('namaz'), icon: '🕌' },
    { path: '/learn', label: t('learn'), icon: '📚' },
    { path: '/hadith', label: t('hadith'), icon: '📜' },
    { path: '/duas', label: t('duas'), icon: '🤲' },
    { path: '/qibla', label: t('qibla'), icon: '🧭' },
    { path: '/tracker', label: t('tracker'), icon: '📈' },
    { path: '/quiz', label: t('quiz'), icon: '🏆' },
    { path: '/ai-assistant', label: t('aiAssistant'), icon: '🤖' },
    { path: '/progress', label: t('progress'), icon: '📊' },
    { path: '/mistakes', label: t('mistakes'), icon: '⚠️' },
    { path: '/settings', label: t('settings'), icon: '⚙️' }
  ];

  // Enhanced search functionality
  const searchItems = [
    { type: 'dua', label: t('duas'), path: '/duas', icon: '🤲', description: t('searchDuasDesc'), keywords: ['dua', 'prayer', 'supplication', 'دعا', 'مناجات'] },
    { type: 'hadith', label: t('hadith'), path: '/hadith', icon: '📜', description: t('searchHadithDesc'), keywords: ['hadith', 'sunnah', 'prophet', 'حدیث', 'سنت'] },
    { type: 'learn', label: t('learn'), path: '/learn', icon: '📚', description: t('searchLearnDesc'), keywords: ['learn', 'education', 'guide', 'سیکھیں', 'تعلیم'] },
    { type: 'prayer', label: t('namaz'), path: '/namaz', icon: '🕌', description: t('searchPrayerDesc'), keywords: ['namaz', 'salah', 'prayer', 'نماز', 'صلوۃ'] },
    { type: 'qibla', label: t('qibla'), path: '/qibla', icon: '🧭', description: t('searchQiblaDesc'), keywords: ['qibla', 'direction', 'kaaba', 'قبلہ', 'سمت'] },
    { type: 'tracker', label: t('tracker'), path: '/tracker', icon: '📈', description: t('searchTrackerDesc'), keywords: ['track', 'progress', 'record', 'ٹریکر', 'نگرانی'] },
    { type: 'quiz', label: t('quiz'), path: '/quiz', icon: '🏆', description: t('searchQuizDesc'), keywords: ['quiz', 'test', 'knowledge', 'کوئز', 'امتحان'] },
    { type: 'ai', label: t('aiAssistant'), path: '/ai-assistant', icon: '🤖', description: t('searchAIDesc'), keywords: ['ai', 'assistant', 'help', 'اے آئی', 'مدد'] },
    { type: 'times', label: t('prayerTimes'), path: '/prayer-times', icon: '🕐', description: t('searchTimesDesc'), keywords: ['times', 'schedule', 'وقت', 'اوقات'] },
    { type: 'settings', label: t('settings'), path: '/settings', icon: '⚙️', description: t('searchSettingsDesc'), keywords: ['settings', 'preferences', 'ترتیبات', 'اختیارات'] }
  ];

  const filteredSearchResults = searchItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (!event.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detect if scroll controls are needed (small screens)
  const updateScrollControls = () => {
    const el = tabsScrollRef.current;
    if (!el) return;
    setShowScrollControls(el.scrollWidth > el.clientWidth);
  };

  useEffect(() => {
    updateScrollControls();
    window.addEventListener('resize', updateScrollControls);
    return () => window.removeEventListener('resize', updateScrollControls);
  }, [navTabs]);

  const scrollTabs = (dir) => {
    const el = tabsScrollRef.current;
    if (!el) return;
    const amount = Math.min(240, el.clientWidth * 0.8);
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-12 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-sm">
              🕌
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">Namaz Web</h1>
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">Islamic Companion</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-sm font-semibold text-gray-900 dark:text-white">Namaz</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4 md:mx-8 relative" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 pl-8 sm:pl-10 md:pl-12 pr-2 sm:pr-3 md:pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 md:pl-4 flex items-center pointer-events-none">
                <svg className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Clean Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {filteredSearchResults.length > 0 ? (
                  <>
                    <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        {filteredSearchResults.length} {filteredSearchResults.length === 1 ? 'result' : 'results'} found
                      </div>
                    </div>
                {filteredSearchResults.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchResultClick(item.path)}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-white text-xs font-medium">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-gray-900 dark:text-white truncate">{item.label}</div>
                          <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{item.description}</div>
                        </div>
                        <svg className="w-3 h-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
                  </>
                ) : (
                  <div className="px-3 py-4 text-center">
                    <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center mx-auto mb-2">
                      <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">No results found</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative user-menu">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 p-1 sm:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  {userProfile?.picture ? (
                    <img
                      src={userProfile.picture}
                      alt={userProfile.name}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                      {userProfile?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="hidden sm:block text-xs sm:text-sm font-medium">{userProfile?.name || 'User'}</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl py-2 border border-gray-600 z-50">
                    <div className="px-4 py-3 border-b border-gray-600">
                      <p className="text-sm font-medium text-white">{userProfile?.name}</p>
                      <p className="text-xs text-gray-400">{userProfile?.email}</p>
                    </div>
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Settings
                    </NavLink>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
                <button
                  onClick={onAuthClick}
                  className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={onAuthClick}
                  className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative border-t border-gray-700">
          {/* Scroll buttons for small screens */}
          {false && showScrollControls && (
            <>
              <button
                onClick={() => scrollTabs('left')}
                className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/70 hover:bg-gray-800 text-white rounded-full shadow"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={() => scrollTabs('right')}
                className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/70 hover:bg-gray-800 text-white rounded-full shadow"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          <nav
            ref={tabsScrollRef}
            className="hidden md:flex flex-wrap md:flex-nowrap gap-1 overflow-x-auto scrollbar-hide py-2"
          >
            {navTabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  `flex items-center space-x-1.5 md:space-x-2 px-3 md:px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                <span className="text-sm md:text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
